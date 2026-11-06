import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogAuthor, blogCategories, blogPosts, formatDate, getPost, postUpdated, sortedPosts } from "@/data/blog";
import { pageMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema, faqSchema, JsonLd } from "@/lib/schema";
import { vars } from "@/lib/style";
import { Arrow } from "@/components/ui/Arrow";
import { CTA } from "@/components/ui/CTA";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const base = pageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
  return {
    ...base,
    authors: [{ name: blogAuthor }],
    keywords: post.keywords,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.published,
      modifiedTime: postUpdated(post),
      authors: [blogAuthor],
      section: blogCategories[post.category].label,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Content } = await post.load();
  const path = `/blog/${post.slug}`;
  const updated = postUpdated(post);
  const category = blogCategories[post.category];
  // Otro artículo para seguir leyendo: primero de la misma categoría
  const related =
    sortedPosts.find((p) => p.slug !== post.slug && p.category === post.category) ??
    sortedPosts.find((p) => p.slug !== post.slug);

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.description,
          path,
          published: post.published,
          updated,
          keywords: post.keywords,
          section: category.label,
        })}
      />
      <JsonLd data={faqSchema(post.faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", path: "/blog" },
          { name: post.title, path },
        ])}
      />

      <article>
        <header className="container-cala pb-6 pt-10 lg:pt-16">
          <nav aria-label="Migas de pan" className="label hero-rise flex items-center gap-2 border-b border-line pb-4 text-mute">
            <Link href="/blog" className="hover:text-agua-ink">
              Blog
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-agua-ink">{category.label}</span>
          </nav>
          <div className="mt-10 grid lg:mt-14 lg:grid-cols-12 lg:gap-8">
            <h1
              className="display hero-slide text-[clamp(2.75rem,7vw,6rem)] lg:col-span-10"
              style={vars({ "--d": 100 })}
            >
              {post.title}
            </h1>
          </div>
          <dl
            className="hero-rise mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-4 text-sm lg:mt-14"
            style={vars({ "--d": 250 })}
          >
            <div>
              <dt className="label text-mute">Por</dt>
              <dd className="mt-1">{blogAuthor}</dd>
            </div>
            <div>
              <dt className="label text-mute">Publicado</dt>
              <dd className="mt-1">
                <time dateTime={post.published}>{formatDate(post.published)}</time>
              </dd>
            </div>
            {updated !== post.published ? (
              <div>
                <dt className="label text-mute">Actualizado</dt>
                <dd className="mt-1">
                  <time dateTime={updated}>{formatDate(updated)}</time>
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="label text-mute">Lectura</dt>
              <dd className="mt-1">{post.readingMinutes} min</dd>
            </div>
          </dl>
        </header>

        <div className="container-cala grid lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 pb-16 lg:col-span-8 lg:col-start-3 xl:col-span-7 xl:col-start-3">
            <Content />

            <section aria-labelledby="preguntas" className="mt-20 border-t border-ink pt-8">
              <h2 id="preguntas" className="display-wide text-[clamp(1.9rem,3.4vw,2.6rem)] leading-[1.05]">
                Preguntas frecuentes
              </h2>
              <div className="mt-8 border-t border-line">
                {post.faq.map((f) => (
                  <details key={f.q} className="group/faq border-b border-line">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
                      <h3 className="font-sans">{f.q}</h3>
                      <span
                        aria-hidden="true"
                        className="mt-1 grid size-7 shrink-0 place-items-center rounded-full border border-ink/20 transition-transform group-open/faq:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="pb-6 pr-12 text-lg leading-relaxed text-ink/80">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>

      {related ? (
        <nav aria-label="Seguir leyendo" className="container-cala pb-24">
          <Link href={`/blog/${related.slug}`} className="group/next flex items-end justify-between gap-6 border-t border-ink pt-6">
            <span>
              <span className="label block text-mute">Seguir leyendo</span>
              <span className="display-wide mt-3 block text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.05] transition-colors group-hover/next:text-agua-deep">
                {related.title}
              </span>
            </span>
            <span className="mb-2 grid size-14 shrink-0 place-items-center rounded-full border border-ink/20 transition-colors group-hover/next:border-agua group-hover/next:bg-agua">
              <Arrow />
            </span>
          </Link>
        </nav>
      ) : null}

      <CTA title={post.cta.title} text={post.cta.text} action={post.cta} />
    </>
  );
}
