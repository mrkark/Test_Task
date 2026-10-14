import { NextRequest, NextResponse } from "next/server";
import { leadSchema, formatBelarusPhone } from "@/lib/validations";
import { saveLead } from "@/lib/leads-store";
import { sendTelegramNotification } from "@/lib/telegram";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Zod Validation
    const validationResult = leadSchema.safeParse(body);
    if (!validationResult.success) {
      const formattedErrors = validationResult.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return NextResponse.json(
        {
          success: false,
          error: "Пожалуйста, проверьте правильность заполнения полей",
          details: formattedErrors,
        },
        { status: 400 }
      );
    }

    const validData = validationResult.data;

    // 2. Format phone to standard readable representation for database & notifications
    const formattedPhone = formatBelarusPhone(validData.phone);
    const leadPayload = {
      ...validData,
      phone: formattedPhone,
    };

    // 3. Save lead with 10-minute deduplication check
    const { record, isDuplicate } = await saveLead(leadPayload);

    if (isDuplicate) {
      // Don't create duplicate lead and don't spam Telegram
      return NextResponse.json(
        {
          success: true,
          duplicate: true,
          message:
            "Мы уже получили вашу заявку ранее. Менеджер свяжется с вами в ближайшее время!",
        },
        { status: 200 }
      );
    }

    // 4. Duplicate notification to Telegram bot (if configured)
    await sendTelegramNotification(record);

    return NextResponse.json(
      {
        success: true,
        message: "Спасибо за заявку! Мы перезвоним вам, чтобы подтвердить детали.",
        leadId: record.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API Lead] Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Произошла техническая ошибка при отправке заявки. Пожалуйста, позвоните нам напрямую.",
      },
      { status: 500 }
    );
  }
}
