import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return rss({
    title: 'IFFTU — I Fight For The Users',
    description:
      'Updates, manifestos, and transparency reports from the IFFTU collective. Open source. Transparent. For humanity.',
    site: context.site ?? 'https://ifftu.dev',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.excerpt,
      link: `/blog/${post.id}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
