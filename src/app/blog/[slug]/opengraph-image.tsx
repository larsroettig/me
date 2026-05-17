import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/mdx";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0a0a0f",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          fontFamily: "monospace",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Scanline overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
            pointerEvents: "none",
          }}
        />

        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top accent bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              height: "2px",
              flex: 1,
              background:
                "linear-gradient(90deg, #00f5ff 0%, #ff00ff 50%, transparent 100%)",
            }}
          />
          <span
            style={{
              color: "#7878a0",
              fontSize: "13px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            ARTICLE
          </span>
          <div
            style={{
              height: "2px",
              flex: 1,
              background:
                "linear-gradient(90deg, transparent 0%, #ff00ff 50%, #00f5ff 100%)",
            }}
          />
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Terminal meta row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "14px",
              color: "#7878a0",
              borderLeft: "3px solid #00f5ff",
              paddingLeft: "16px",
            }}
          >
            <span style={{ color: "#00f5ff" }}>$</span>
            <span>cat</span>
            <span style={{ color: "#e0e0f0" }}>{post.publishedAt}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: post.title.length > 50 ? "48px" : "60px",
              fontWeight: 700,
              color: "#00f5ff",
              lineHeight: 1.15,
              maxWidth: "900px",
              textShadow: "0 0 4px #00f5ff, 0 0 20px #00f5ff60",
            }}
          >
            {post.title}
          </div>

          {/* Excerpt */}
          <div
            style={{
              fontSize: "22px",
              color: "#a0a0c0",
              maxWidth: "850px",
              lineHeight: 1.5,
              fontStyle: "italic",
              borderLeft: "1px solid #2a2a4e",
              paddingLeft: "20px",
            }}
          >
            {post.excerpt}
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {post.tags.map((tag, i) => (
                <span
                  key={tag}
                  style={{
                    padding: "4px 12px",
                    fontSize: "13px",
                    background: "#12121e",
                    border: `1px solid ${i % 2 === 0 ? "#00f5ff" : "#ff00ff"}`,
                    color: i % 2 === 0 ? "#00f5ff" : "#ff00ff",
                    borderRadius: "2px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "1px",
              flex: 1,
              background:
                "linear-gradient(90deg, transparent 0%, #1a1a2e 30%, #00f5ff40 70%, transparent 100%)",
              marginRight: "32px",
            }}
          />
          <span
            style={{
              color: "#7878a0",
              fontSize: "16px",
              letterSpacing: "0.1em",
            }}
          >
            larsroettig.me
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
