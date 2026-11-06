import { ImageResponse } from "next/og";
import { blogCategories, blogPosts, getPost } from "@/data/blog";

export const alt = "Artículo del blog de Cala Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug)!;
  const weddings = post.category === "bodas";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: weddings ? "#faf6ef" : "#f8f7f2",
          color: weddings ? "#24201b" : "#171717",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: 220,
            height: 220,
            background: weddings ? "#ece4d6" : "#42dcc6",
            borderTopLeftRadius: 220,
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 3 }}>
          <span>{weddings ? "CALA WEDDINGS · BLOG" : "CALA STUDIO · BLOG"}</span>
          <span style={{ color: weddings ? "#675f55" : "#62615c" }}>{blogCategories[post.category].label.toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", fontSize: 68, lineHeight: 1.05, letterSpacing: -2, fontWeight: 700, maxWidth: 900 }}>
          {post.title}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: weddings ? "#2b6f66" : "#138f82" }}>thecalastudio.com</div>
      </div>
    ),
    size,
  );
}
