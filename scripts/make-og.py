"""Рисует public/og.png (1200x630) для превью ссылки в мессенджерах.
Плоские цвета из дизайн-системы «Обжарка», без градиентов: пять зёрен по стадиям обжарки.
Запуск: python3 scripts/make-og.py. Шрифты DejaVu (есть кириллица); Oswald/Literata на сервере не нужны."""
import math, os
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
LEAF, CHAFF, SOFT, AMBER = "#3D4C26", "#F3EBD3", "#E4D9B8", "#F0B766"
F = "/usr/share/fonts/truetype/dejavu/"
sans_b = lambda n: ImageFont.truetype(F + "DejaVuSans-Bold.ttf", n)
serif_i = lambda n: ImageFont.truetype(F + "DejaVuSerif-Italic.ttf", n)
sans = lambda n: ImageFont.truetype(F + "DejaVuSans.ttf", n)

def mix(hex_a, hex_b, t):
    a = [int(hex_a[i:i + 2], 16) for i in (1, 3, 5)]
    b = [int(hex_b[i:i + 2], 16) for i in (1, 3, 5)]
    return tuple(round(x + (y - x) * t) for x, y in zip(a, b))

def bezier(p0, p1, p2, p3, n=40):
    pts = []
    for i in range(n + 1):
        t = i / n
        u = 1 - t
        pts.append((u**3*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t**3*p3[0],
                    u**3*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t**3*p3[1]))
    return pts

def bean(color, scale, angle):
    """Зерно 200x280 (те же формы, что в components/Bean.tsx), рисуем в 4x и уменьшаем."""
    k = 4
    layer = Image.new("RGBA", (200 * k, 280 * k), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    S = lambda pts: [(x * k, y * k) for x, y in pts]
    body = mix(color, "#000000", 0)
    shade = mix(color, "#000000", .22)
    crease = mix(color, "#000000", .62)
    hi = mix(color, "#FFFFFF", .35)
    d.ellipse([22 * k, 22 * k, 178 * k, 258 * k], fill=body)
    cr = bezier((100, 22), (62, 100), (138, 180), (100, 258))
    arc = [(100 + 78 * math.cos(math.radians(t)), 140 + 118 * math.sin(math.radians(t))) for t in range(90, -91, -3)]
    d.polygon(S(cr + arc), fill=shade)
    hl = [(66 + 12 * math.cos(a) * math.cos(math.radians(16)) - 32 * math.sin(a) * math.sin(math.radians(16)),
           92 + 12 * math.cos(a) * math.sin(math.radians(16)) + 32 * math.sin(a) * math.cos(math.radians(16)))
          for a in [i * math.pi / 20 for i in range(40)]]
    d.polygon(S(hl), fill=hi)
    d.line(S(cr), fill=crease, width=8 * k, joint="curve")
    for x, y in (cr[0], cr[-1]):
        d.ellipse([(x - 4) * k, (y - 4) * k, (x + 4) * k, (y + 4) * k], fill=crease)
    layer = layer.resize((round(200 * scale), round(280 * scale)), Image.LANCZOS)
    return layer.rotate(angle, expand=True, resample=Image.BICUBIC)

img = Image.new("RGB", (W, H), LEAF)
d = ImageDraw.Draw(img)

d.text((56, 40), "КВАРТА", font=sans_b(132), fill=CHAFF)
d.text((60, 190), "ремесленная обжарка кофе", font=serif_i(30), fill=SOFT)
d.text((56, 262), "Зерно у вас на кухне", font=sans_b(52), fill=CHAFF)
d.text((56, 326), "на 1–3 день после обжарки", font=sans_b(52), fill=AMBER)

stages = [("Зелёное", "#74854B"), ("Сушка", "#D3BD68"), ("Светлая", "#B9854A"), ("Средняя", "#7A4727"), ("Тёмная", "#34190F")]
step = (W - 2 * 56) / len(stages)
for i, (name, color) in enumerate(stages):
    cx = 56 + step * i + step / 2
    b = bean(color, 0.5, -14)
    img.paste(b, (round(cx - b.width / 2), 400 - b.height // 2 + 70), b)
    d.text((cx, 582), name, font=sans(24), fill=SOFT, anchor="mm")
d.line([(56, 560), (W - 56, 560)], fill=SOFT, width=1)

os.makedirs("public", exist_ok=True)
img.save("public/og.png", optimize=True)
print("ok", os.path.getsize("public/og.png"), "bytes")
