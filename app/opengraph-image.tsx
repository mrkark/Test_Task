import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Обжарка «Кварта» · Свежеобжаренное зерно в Минске";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#F9F6F0",
          color: "#1A0F0A",
          fontFamily: "sans-serif",
          border: "16px solid #1A0F0A",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              fontSize: "36px",
              fontWeight: 900,
              letterSpacing: "-0.05em",
              color: "#1A0F0A",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            ● КВАРТА / ОБЖАРКА ЗЕРНА
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              backgroundColor: "#C45525",
              color: "#F9F6F0",
              padding: "8px 16px",
            }}
          >
            Минск · ул. Короля, 9
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: "1000px",
            }}
          >
            Свежеобжаренное зерно на 1–3 день после ростера.
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#78685C",
              maxWidth: "850px",
            }}
          >
            Жарим по четвергам батчами по 5 кг. Доставка по Минску в пятницу.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "20px",
            fontWeight: 600,
            borderTop: "2px solid #D6C7B2",
            paddingTop: "30px",
            color: "#1A0F0A",
          }}
        >
          <div>Эфиопия Иргачеффе · Колумбия Уила · Бразилия Серрадо · Дрипы</div>
          <div>Подписка от 54 BYN / мес</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
