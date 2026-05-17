"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="py-8 mt-24"
      style={{
        borderTop: "1px solid #1a1a2e",
        backgroundColor: "#0a0a0f",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 space-y-4">
        {/* Copyright notice */}
        <p
          className="text-xs font-mono leading-relaxed text-center sm:text-left"
          style={{ color: "#7878a0" }}
        >
          All content on this site — articles, code samples, and writing — is the intellectual
          property of Lars Roettig. Unauthorized reproduction or distribution will be reported to
          Google via DMCA takedown and pursued with legal action.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="text-sm font-mono" style={{ color: "#7878a0" }}>
              © {new Date().getFullYear()} Lars Roettig — All rights reserved
            </p>
            <div className="flex gap-3 text-xs font-mono">
              <Link
                href="/imprint"
                style={{ color: "#7878a0" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "#00f5ff";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "#7878a0";
                }}
              >
                Imprint
              </Link>
              <span style={{ color: "#7878a0" }}>·</span>
              <Link
                href="/privacy"
                style={{ color: "#7878a0" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "#00f5ff";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "#7878a0";
                }}
              >
                Privacy
              </Link>
            </div>
          </div>

          <div className="flex gap-6">
            <a
              href="https://github.com/larsroettig"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono transition-colors duration-200"
              style={{ color: "#7878a0" }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#00f5ff";
                (e.target as HTMLElement).style.textShadow = "var(--glow-cyan-sm)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "#7878a0";
                (e.target as HTMLElement).style.textShadow = "none";
              }}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/larsroettig"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono transition-colors duration-200"
              style={{ color: "#7878a0" }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#00f5ff";
                (e.target as HTMLElement).style.textShadow = "var(--glow-cyan-sm)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "#7878a0";
                (e.target as HTMLElement).style.textShadow = "none";
              }}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
