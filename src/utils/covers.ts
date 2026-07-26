// Сопоставление категории со стандартной обложкой (SVG в /public/covers).
// Если в статье задано поле `cover` во frontmatter — используется оно,
// иначе берётся обложка категории.
const byCategory: Record<string, string> = {
  'Офисы': '/covers/ofisy.svg',
  'Склады': '/covers/sklady.svg',
  'Бизнес-центры': '/covers/biznes-centry.svg',
  'Технологии': '/covers/tehnologii.svg',
};

export function coverFor(category: string, cover?: string): string {
  return cover ?? byCategory[category] ?? '/covers/ofisy.svg';
}
