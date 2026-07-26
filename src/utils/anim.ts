// Подбор анимированного шаблона иллюстрации по рубрике/категории/тегам.
// Используется и на странице статьи, и в карточке (одинаковый ключ).
export const ANIM_KEYS = [
  'robot-roll', // робот едет по объекту — новости, кейсы, склад
  'roi-chart', // рост столбиков + тренд — экономика, ROI
  'route-map', // схема маршрута уборки — гайды, технологии, навигация
  'humans-robots', // «люди + роботы» — рынок, сервис, интервью
  'scan-pulse', // сканирование/дезинфекция — обзоры, дезинфекторы
] as const;

export type AnimKey = (typeof ANIM_KEYS)[number];

interface Pickable {
  animation?: string;
  rubric?: string;
  category?: string;
  tags?: string[];
}

export function pickAnimation({ animation, rubric, category, tags = [] }: Pickable): AnimKey {
  if (animation && (ANIM_KEYS as readonly string[]).includes(animation)) {
    return animation as AnimKey;
  }
  const t = tags.join(' ').toLowerCase();

  if (rubric === 'Экономика' || /\broi\b|окупаем|цена|цены|бюджет|эконом|raas|tco/.test(t)) {
    return 'roi-chart';
  }
  if (rubric === 'Рынок' || rubric === 'Интервью' || /рынок|инвест|сервис|кадр|тренд/.test(t)) {
    return 'humans-robots';
  }
  if (rubric === 'Гайды' || category === 'Технологии' || /навигац|lidar|slam|маршрут|обслуж|датчик/.test(t)) {
    return 'route-map';
  }
  if (rubric === 'Обзоры' || /дезинф|скан|модель|обзор|окна|фасад/.test(t)) {
    return 'scan-pulse';
  }
  // Новости / Кейсы / склад / БЦ / офис — робот едет по объекту
  return 'robot-roll';
}
