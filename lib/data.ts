import { CoffeeItem } from "./types";

export const COFFEE_CATALOG: CoffeeItem[] = [
  {
    id: "ethiopia-yirgacheffe",
    name: "Эфиопия Иргачеффе",
    region: "Иргачеффе, 1900–2200 м",
    processing: "Мытая",
    roastLevel: "Светлая под фильтр",
    flavorNotes: ["Жасмин", "Бергамот", "Черный чай", "Лайм"],
    weight: "250 г",
    price: 32,
    badge: "Свежий урожай",
    isPopular: true,
  },
  {
    id: "colombia-huila",
    name: "Колумбия Уила",
    region: "Уила, Сан-Агустин, 1600–1800 м",
    processing: "Мытая",
    roastLevel: "Средняя универсальная",
    flavorNotes: ["Карамель", "Красное яблоко", "Тростниковый сахар"],
    weight: "250 г",
    price: 29,
  },
  {
    id: "brazil-cerrado",
    name: "Бразилия Серрадо",
    region: "Серрадо Минейро, 1100 м",
    processing: "Натуральная",
    roastLevel: "Под эспрессо и турку",
    flavorNotes: ["Грецкий орех", "Молочный шоколад", "Какао"],
    weight: "250 г",
    price: 26,
  },
  {
    id: "drip-assorted",
    name: "Дрип-пакеты, ассорти",
    region: "Микс всех 3 моносортов мастерской",
    processing: "Индивидуальный азотный фильтр-пакет",
    roastLevel: "Идеально в чашке за 2 минуты",
    flavorNotes: ["10 готовых порций", "Кофе в дороге и в офисе"],
    weight: "10 шт по 11 г",
    price: 18,
    badge: "Хит для офиса",
  },
];

export const SUBSCRIPTION_PLAN = {
  name: "Кофейная подписка",
  price: 54,
  unit: "BYN / месяц",
  details: "2 пачки по 250 г раз в месяц. Доставка по Минску — бесплатно.",
  perks: [
    "Две разные пачки свежайшей обжарки каждый месяц",
    "Бесплатная курьерская доставка в первую пятницу месяца",
    "Возможность приостановить или изменить помол в любой момент",
    "Свежесть гарантирована: доставка на 1–3 день после обжарочного четверга",
  ],
};

export const WORKSHOP_INFO = {
  city: "Минск",
  address: "ул. Короля, 9",
  schedule: {
    weekdays: "пн–пт 8:00–20:00",
    weekends: "сб–вс 10:00–18:00",
  },
  roastingDay: "Четверг",
  deliveryDay: "Пятница",
  freeDeliveryThreshold: 50, // BYN
  phone: "+375 (29) 000-00-00",
  instagram: "@kvarta.coffee",
  telegram: "@kvarta_roastery",
};
