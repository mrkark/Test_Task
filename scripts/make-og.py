"""Рисует public/og.png (1200x630) для превью ссылки в мессенджерах.
Плоские цвета из дизайн-системы, без градиентов. Запуск: python3 scripts/make-og.py
Шрифты: DejaVu (есть кириллица). Для финальной версии можно подставить Alegreya/Manrope."""
from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630
PAPER, SURFACE, INK, MUTED, ACCENT, LINE = "#F6F4EE", "#EDE8DF", "#1C1917", "#6A635E", "#B84A28", "#DDD7CD"
FONTS = "/usr/share/fonts/truetype/dejavu/"
serif_b = ImageFont.truetype(FONTS + "DejaVuSerif-Bold.ttf", 132)
serif = ImageFont.truetype(FONTS + "DejaVuSerif.ttf", 50)
serif_i = ImageFont.truetype(FONTS + "DejaVuSerif-Italic.ttf", 50)
mono = ImageFont.truetype(FONTS + "DejaVuSansMono.ttf", 24)
mono_s = ImageFont.truetype(FONTS + "DejaVuSansMono.ttf", 20)

img = Image.new("RGB", (W, H), PAPER)
d = ImageDraw.Draw(img)

# верхняя тёмная полоса как в шапке сайта
d.rectangle([0, 0, W, 56], fill=INK)
d.text((56, 16), "МИНСК · УЛ. КОРОЛЯ, 9", font=mono_s, fill=PAPER)
d.text((W - 56, 16), "ОБЖАРКА ПО ЧЕТВЕРГАМ", font=mono_s, fill=PAPER, anchor="ra")

# логотип
d.text((56, 100), "КВАРТА", font=serif_b, fill=INK)
d.text((60, 250), "РЕМЕСЛЕННАЯ ОБЖАРКА КОФЕ", font=mono, fill=MUTED)

# слоган
x = 56
d.text((x, 316), "Зерно у вас на кухне на ", font=serif, fill=INK)
x += d.textlength("Зерно у вас на кухне на ", font=serif)
d.text((x, 316), "1–3 день", font=serif_i, fill=ACCENT)
d.text((56, 381), "после обжарки", font=serif, fill=INK)

# линейка дней 0..14
left, right, y = 56, W - 56, 520
step = (right - left) / 15
d.line([left, y - 38, right, y - 38], fill=LINE, width=1)
for i in range(15):
    x0 = left + i * step
    hot = i in (0, 1, 2, 3)
    d.line([x0, y, x0, y + (28 if hot else 16)], fill=INK if hot else MUTED, width=2 if hot else 1)
    d.text((x0 + 6, y + 34), str(i), font=mono_s, fill=INK if hot else MUTED)
# скобка 1–3
b1, b3 = left + 1 * step, left + 3 * step
d.line([b1, y - 14, b1, y - 26, b3, y - 26, b3, y - 14], fill=ACCENT, width=3)
d.text((b1, y - 66), "ЗЕРНО У ВАС", font=mono_s, fill=ACCENT)

d.text((56, 590), "Жарим по 5 кг по четвергам. Развозим по Минску по пятницам.", font=mono_s, fill=MUTED)

os.makedirs("public", exist_ok=True)
img.save("public/og.png", optimize=True)
print("ok", os.path.getsize("public/og.png"), "bytes")
