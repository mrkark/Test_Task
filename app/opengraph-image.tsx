import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Обжарка «Кварта» · Свежий кофе в Минске";
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
          backgroundColor: "#F6F4EE",
          color: "#1C1917",
          fontFamily: "sans-serif",
          border: "16px solid #1C1917",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              fontSize: "36px",
              fontWeight: 900,
              letterSpacing: "-0.05em",
              color: "#1C1917",
            }}
          >
            КВАРТА
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              backgroundColor: "#B84A28",
              color: "#F6F4EE",
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
            Кофе на 1–3 день после обжарки. Прямо у вас дома.
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#78716C",
              maxWidth: "850px",
            }}
          >
            Обжариваем партиями по 5 кг по четвергам. Развозим по Минску по пятницам.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "20px",
            fontWeight: 600,
            borderTop: "2px solid #DDD7CD",
            paddingTop: "30px",
            color: "#1C1917",
          }}
        >
          <div>Эфиопия · Колумбия · Бразилия · Дрипы</div>
          <div>Подписка от 54 BYN / мес</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
