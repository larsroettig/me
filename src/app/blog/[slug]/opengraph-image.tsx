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
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 46 46"
              width={28}
              height={28}
            >
              <path
                fill="#00f5ff"
                d="M30.866 28.796l1.862-3.704-2.875-5.761h5.763l3.686-7.364 2.115-4.233L45.115.386H13.008l3.685 7.348h17.378l-2.115 4.233H18.82l3.686 7.364 2.875 5.761 1.57 3.116-2.862 5.747-2.14-4.262-4.877-9.745-.304-.617-3.698-7.364-2.115-4.233L7.27.386H0l3.686 7.348 2.064 4.233h-.012l3.685 7.364 8.854 17.696 2.153 4.276 2.128 4.351.025-.059 3.622-7.334 4.661-9.465z"
              />
            </svg>
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
      </div>
    ),
    { ...size }
  );
}
