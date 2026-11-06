import Link from "next/link";
import { blogCategories, formatDate, sortedPosts } from "@/data/blog";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";
import { revealDelay } from "@/lib/style";
import { Arrow } from "@/components/ui/Arrow";
import { CTA } from "@/components/ui/CTA";
import { PageHero } from "@/components/sections/PageHero";

export const metadata = {
  ...pageMetadata({
    title: "Blog de marketing para negocios y bodas en Málaga",
    description:
      "Guías claras sobre marketing, webs, redes y diseño de bodas para negocios de Nerja, la Axarquía y Málaga. Con precios reales y sin rodeos.",
    path: "/blog",
  }),
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Blog", path: "/blog" }])} />
      <PageHero
        label="Blog"
        title={
          <>
            Lo que nos preguntan, <span className="accent text-agua-deep">contado claro.</span>
          </>
        }
        intro="Guías prácticas sobre marketing para negocios de la Axarquía y diseño de bodas. Con precios reales."
      />

      <section aria-label="Artículos" className="pb-24 lg:pb-36">
        <div className="container-cala">
          <ul className="border-t border-ink">
            {sortedPosts.map((post, i) => (
              <li key={post.slug} data-reveal style={revealDelay(i * 80)} className="border-b border-line">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group/post grid gap-4 py-8 md:grid-cols-12 md:gap-8 lg:py-10"
                >
                  <p className="label flex flex-wrap gap-x-3 gap-y-1 text-mute md:col-span-3 md:flex-col">
                    <span className="text-agua-ink">{blogCategories[post.category].label}</span>
                    <time dateTime={post.published}>{formatDate(post.published)}</time>
                  </p>
                  <div className="md:col-span-8">
                    <h2 className="display-wide text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.05] transition-colors group-hover/post:text-agua-deep">
                      {post.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mute">{post.description}</p>
                    <p className="label mt-5 text-mute">{post.readingMinutes} min de lectura</p>
                  </div>
                  <span className="hidden size-12 place-items-center self-center justify-self-end rounded-full border border-ink/20 transition-colors group-hover/post:border-agua group-hover/post:bg-agua md:grid">
                    <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA />
    </>
  );
}
