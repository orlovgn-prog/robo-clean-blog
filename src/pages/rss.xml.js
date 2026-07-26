import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = (await getCollection('articles', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'RoboClean — автоматизация клининга',
    description:
      'Новости индустрии, кейсы внедрений, обзоры роботов и экономика автоматизации уборки коммерческих объектов.',
    site: context.site,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.pubDate,
      link: `/articles/${a.id}/`,
      categories: [a.data.rubric, ...(a.data.tags ?? [])].filter(Boolean),
    })),
    customData: `<language>ru-ru</language>`,
  });
}
