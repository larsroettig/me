"use client";

import type React from "react";
import Link from "next/link";
import GlitchText from "@/components/ui/GlitchText";

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-6 text-center">
      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#00f5ff 1px, transparent 1px), linear-gradient(90deg, #00f5ff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-3xl">
        <p
          className="text-xs tracking-[0.4em] uppercase mb-6 font-mono"
          style={{ color: "#7878a0" }}
        >
          // hello world
        </p>

        <GlitchText
          as="h1"
          className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
          style={{ color: "#e0e0f0" } as React.CSSProperties}
        >
          Lars Roettig
        </GlitchText>

        <p
          className="text-lg md:text-2xl font-mono mb-3 tracking-wide"
          style={{ color: "#00f5ff", textShadow: "var(--glow-cyan-sm)" }}
        >
          Senior Technical Architect @ Adobe
        </p>

        <p
          className="text-sm md:text-base font-mono mb-10"
          style={{ color: "#7878a0" }}
        >
          Architect · Builder · Open Source Contributor
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/blog"
            className="px-8 py-3 text-sm font-mono tracking-widest uppercase transition-all duration-300"
            style={{
              backgroundColor: "#00f5ff",
              color: "#0a0a0f",
              boxShadow: "var(--glow-cyan)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.boxShadow = "var(--glow-cyan), 0 0 60px #00f5ff60";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.boxShadow = "var(--glow-cyan)";
            }}
          >
            View Blog
          </Link>
          <a
            href="#about"
            className="px-8 py-3 text-sm font-mono tracking-widest uppercase transition-all duration-300"
            style={{
              border: "1px solid #ff00ff",
              color: "#ff00ff",
              boxShadow: "var(--glow-magenta-sm)",
            }}
          >
            About Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "#7878a0" }}
      >
        <span className="text-xs tracking-widest font-mono">SCROLL</span>
        <div
          className="w-px h-8"
          style={{
            background: "linear-gradient(to bottom, #7878a0, transparent)",
          }}
        />
      </div>
    </section>
  );
}
