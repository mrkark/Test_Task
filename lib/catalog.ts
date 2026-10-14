/** Событие, которым кнопки «Заказать» сообщают форме, что выбрать в поле «Что интересует». */
export const INTEREST_EVENT = "kvarta:interest";

export const INTEREST_IDS = [
  "subscription",
  "ethiopia",
  "colombia",
  "brazil",
  "drip",
  "question",
] as const;

export type InterestId = (typeof INTEREST_IDS)[number];

export const INTERESTS: { id: InterestId; label: string }[] = [
  { id: "subscription", label: "Подписка" },
  { id: "ethiopia", label: "Эфиопия" },
  { id: "colombia", label: "Колумбия" },
  { id: "brazil", label: "Бразилия" },
  { id: "drip", label: "Дрип-пакеты" },
  { id: "question", label: "Вопрос" },
];

/** Полные названия для Telegram и хранилища, чтобы менеджеру не приходилось расшифровывать id. */
export const INTEREST_LABELS: Record<InterestId, string> = {
  subscription: "Подписка (2 × 250 г в месяц, 54 BYN)",
  ethiopia: "Эфиопия Иргачеффе, 250 г",
  colombia: "Колумбия Уила, 250 г",
  brazil: "Бразилия Серрадо, 250 г",
  drip: "Дрип-пакеты, ассорти, 10 штук",
  question: "Вопрос",
};

export type Product = {
  id: Exclude<InterestId, "subscription" | "question">;
  name: string;
  notes: string;
  /** пары «подпись — значение» для моно-спецификации */
  specs: [label: string, value: string][];
  price: number;
};

/*
  ДОПУЩЕНИЕ: в ТЗ у лотов нет обработки и высоты. Здесь типичные значения для региона,
  чтобы спек-лист выглядел как у настоящей обжарки. Перед запуском заменить данными клиента.
  Из ТЗ взято: названия, вкус, граммовка, цены, «светлая обжарка», «под эспрессо».
*/
export const PRODUCTS: Product[] = [
  {
    id: "ethiopia",
    name: "Эфиопия Иргачеффе",
    notes: "цветочный, бергамот",
    specs: [
      ["Обжарка", "светлая"],
      ["Обработка", "мытая"],
      ["Высота", "1800–2200 м"],
      ["Вес", "250 г"],
    ],
    price: 32,
  },
  {
    id: "colombia",
    name: "Колумбия Уила",
    notes: "карамель, красное яблоко",
    specs: [
      ["Обработка", "мытая"],
      ["Высота", "1500–1900 м"],
      ["Вес", "250 г"],
    ],
    price: 29,
  },
  {
    id: "brazil",
    name: "Бразилия Серрадо",
    notes: "орех, шоколад",
    specs: [
      ["Подходит", "под эспрессо"],
      ["Обработка", "натуральная"],
      ["Высота", "900–1200 м"],
      ["Вес", "250 г"],
    ],
    price: 26,
  },
  {
    id: "drip",
    name: "Дрип-пакеты, ассорти",
    notes: "кофе в дрип-пакетах, чтобы заварить на работе или в поездке",
    specs: [
      ["Формат", "дрип-пакет"],
      ["В наборе", "10 штук"],
      ["Состав", "ассорти"],
    ],
    price: 18,
  },
];

export const SUBSCRIPTION = {
  price: 54,
  packs: 2,
  grams: 250,
};
