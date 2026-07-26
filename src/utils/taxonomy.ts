// Рубрики блога-медиа (основная навигация по разделам) + slug для URL и иконки.
export interface Rubric {
  name: string;
  slug: string;
  desc: string;
  icon: string; // path-содержимое для <svg viewBox="0 0 40 40" stroke=currentColor>
}

export const RUBRICS: Rubric[] = [
  { name: 'Новости', slug: 'novosti', desc: 'Что происходит в индустрии робо-клининга',
    icon: '<rect x="7" y="9" width="26" height="24" rx="2"/><path d="M12 15h12M12 21h16M12 27h10"/>' },
  { name: 'Кейсы', slug: 'keysy', desc: 'Реальные внедрения и результаты',
    icon: '<path d="M8 14h24v18H8z"/><path d="M15 14v-4h10v4M8 22h24"/>' },
  { name: 'Обзоры', slug: 'obzory', desc: 'Модели роботов и производители',
    icon: '<circle cx="20" cy="20" r="13"/><path d="M20 12v8l6 4"/>' },
  { name: 'Экономика', slug: 'ekonomika', desc: 'ROI, окупаемость, стоимость смены',
    icon: '<path d="M8 30V18M18 30V12M28 30V22"/><path d="M6 30h28"/>' },
  { name: 'Гайды', slug: 'gaydy', desc: 'Как выбирать, внедрять, обслуживать',
    icon: '<path d="M10 8h20v24H10z"/><path d="M15 15h10M15 20h10M15 25h6"/>' },
  { name: 'Интервью', slug: 'intervyu', desc: 'Разговоры с операторами и вендорами',
    icon: '<path d="M8 10h18v14H14l-6 5z"/><path d="M30 16h2v14l-6-5h-4"/>' },
  { name: 'Рынок', slug: 'rynok', desc: 'Инвестиции, тренды, регуляторика',
    icon: '<path d="M7 27l7-8 5 4 8-11"/><path d="M27 12h5v5"/>' },
];

const bySlug = new Map(RUBRICS.map((r) => [r.slug, r]));
const byName = new Map(RUBRICS.map((r) => [r.name, r]));

export const rubricBySlug = (slug: string) => bySlug.get(slug);
export const slugOfRubric = (name?: string) => (name ? byName.get(name)?.slug : undefined);

// Рубрика статьи с запасным вариантом по старой категории.
export function rubricOf(data: { rubric?: string; category?: string }): string {
  if (data.rubric) return data.rubric;
  if (data.category === 'Технологии') return 'Обзоры';
  return 'Новости';
}
