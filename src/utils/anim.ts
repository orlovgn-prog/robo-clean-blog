export const ANIM_KEYS = [
  'robot-roll',
  'roi-chart',
  'route-map',
  'humans-robots',
  'scan-pulse',
  'robot-mop',
  'robot-vacuum',
  'warehouse-bot',
  'office-scene',
  'data-dashboard',
  'battery-charge',
  'floor-sparkle',
  'lidar-scan',
  'cloud-connect',
  'gear-service',
  'cost-scale',
  'partnership',
  'building-zones',
  'robot-squad',
  'timeline',
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

  if (/партнёр|альянс|сделка|сотрудничеств/.test(t)) return 'partnership';
  if (/пылесос|vacuum/.test(t)) return 'robot-vacuum';
  if (/мойк|скруббер|щётк|моющ/.test(t)) return 'robot-mop';
  if (/lidar|лидар|slam|сенсор/.test(t)) return 'lidar-scan';
  if (/облак|iot|cloud|платформ|bms/.test(t)) return 'cloud-connect';
  if (/парк|флот|масштаб/.test(t)) return 'robot-squad';
  if (/батаре|зарядк|аккумулятор|dock/.test(t)) return 'battery-charge';
  if (/обслуж|ремонт|запчаст|сервис/.test(t)) return 'gear-service';
  if (/безопасн|сертифик|стандарт|регулятор/.test(t)) return 'building-zones';
  if (/прогноз|будущ|тренд|этап/.test(t)) return 'timeline';
  if (/склад|логистик|warehouse/.test(t)) return 'warehouse-bot';
  if (/план|этаж|зон/.test(t)) return 'building-zones';

  if (rubric === 'Экономика' || /\broi\b|окупаем|цена|бюджет|raas|tco/.test(t)) return 'cost-scale';
  if (rubric === 'Рынок' || /рынок|инвест/.test(t)) return 'humans-robots';
  if (rubric === 'Интервью') return 'humans-robots';
  if (rubric === 'Гайды' || /навигац|маршрут|датчик/.test(t)) return 'route-map';
  if (rubric === 'Обзоры' || /дезинф|скан|модель|обзор/.test(t)) return 'scan-pulse';
  return 'robot-roll';
}
