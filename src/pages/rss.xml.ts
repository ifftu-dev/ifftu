import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

const posts = [
  {
    slug: 'why-we-fight',
    title: 'WHY WE FIGHT',
    date: '2025-02-15',
    description:
      "The internet promised liberation. It delivered surveillance capitalism. Here's why we started IFFTU and what we intend to do about it.",
  },

];

export function GET(context: APIContext) {
  return rss({
    title: 'IFFTU — I Fight For The Users',
    description:
      'Updates, manifestos, and transparency reports from the IFFTU collective. Open source. Transparent. For humanity.',
    site: context.site ?? 'https://ifftu.dev',
    items: posts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.date),
      description: post.description,
      link: `/blog/${post.slug}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
