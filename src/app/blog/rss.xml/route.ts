import { blogCategories, sortedPosts } from "@/data/blog";
import { site } from "@/data/site";

export const dynamic = "force-static";

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Feed RSS del blog: lo usan lectores de noticias y algunos buscadores y asistentes de IA. */
export function GET() {
  const items = sortedPosts
    .map((p) => {
      const url = `${site.url}/blog/${p.slug}`;
      return `    <item>
      <title>${escape(p.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${escape(p.description)}</description>
      <category>${escape(blogCategories[p.category].label)}</category>
      <pubDate>${new Date(`${p.published}T09:00:00Z`).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog de ${site.name}</title>
    <link>${site.url}/blog</link>
    <atom:link href="${site.url}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Guías de marketing para negocios de Nerja, la Axarquía y Málaga, y de diseño de bodas.</description>
    <language>es-ES</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
