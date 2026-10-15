import type { BotApi, Markup } from "./bot";

/** Тонкая обёртка над Bot API. Ошибки пробрасывает: решать, что с ними делать, должен вызывающий. */
export function telegramApi(token: string): BotApi {
  async function call(method: string, body: Record<string, unknown>) {
    const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Telegram ${method}: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
  }

  return {
    sendMessage: (chatId: string, text: string, markup?: Markup) =>
      call("sendMessage", {
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: markup,
      }),
    editMessageText: async (chatId: string, messageId: number, text: string, markup?: Markup) => {
      try {
        await call("editMessageText", {
          chat_id: chatId,
          message_id: messageId,
          text,
          parse_mode: "HTML",
          reply_markup: markup,
        });
      } catch (err) {
        // «message is not modified» при повторном нажатии той же кнопки — не ошибка
        if (!(err instanceof Error && err.message.includes("not modified"))) throw err;
      }
    },
    answerCallbackQuery: (id: string, text?: string) => call("answerCallbackQuery", { callback_query_id: id, text }),
  };
}
