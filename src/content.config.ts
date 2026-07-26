import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Коллекция статей блога.
// Чтобы добавить новую статью — создайте файл в src/content/articles/название.md
// и заполните поля ниже во frontmatter (--- в начале файла).
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Дата публикации в формате ГГГГ-ММ-ДД
    pubDate: z.coerce.date(),
    // Одна из категорий: 'Офисы' | 'Склады' | 'Бизнес-центры' | 'Технологии'
    category: z.enum(['Офисы', 'Склады', 'Бизнес-центры', 'Технологии']),
    // Необязательные теги
    tags: z.array(z.string()).default([]),
    // Автор — по умолчанию ИИ-редакция
    author: z.string().default('ИИ-редакция'),
    // Примерное время чтения в минутах (можно не указывать)
    readingTime: z.number().optional(),
    // Своя обложка (путь в /public). Если не задано — берётся обложка категории.
    cover: z.string().optional(),

    // --- Рубрика и таксономия (ТЗ: медиа об автоматизации клининга) ---
    // Рубрика раздела. Если не задана — выводится из category.
    rubric: z
      .enum(['Новости', 'Кейсы', 'Обзоры', 'Экономика', 'Гайды', 'Интервью', 'Рынок'])
      .optional(),
    // Типы объектов: 'склад' | 'ТЦ' | 'БЦ' | 'аэропорт' | 'вокзал' | 'логистика'
    objectTypes: z.array(z.string()).default([]),
    // Вендоры/производители (Avidbots, Gausium, SoftBank, Tennant, ...)
    vendors: z.array(z.string()).default([]),
    // Типы роботов (поломоечный, подметальный, дезинфектор, мойщик окон, ...)
    robotType: z.array(z.string()).default([]),

    // --- Анимированная иллюстрация ---
    // Ключ шаблона анимации из src/components/anim/registry.
    // Если не задан — подбирается автоматически по рубрике/тегам.
    animation: z.string().optional(),
    // Путь к Lottie-JSON (если анимация в формате Lottie); приоритетнее шаблона.
    lottie: z.string().optional(),

    // --- Источник (для автособранных новостей — атрибуция) ---
    source: z
      .object({
        name: z.string(),
        url: z.string().url(),
        publishedAt: z.coerce.date().optional(),
      })
      .optional(),
    // Происхождение: редакционная статья или автособранная новость.
    origin: z.enum(['editorial', 'auto']).default('editorial'),

    // Черновик не показывается в списках
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
