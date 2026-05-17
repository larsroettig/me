"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import GlitchText from "@/components/ui/GlitchText";

export default function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 px-6">
      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#00f5ff 1px, transparent 1px), linear-gradient(90deg, #00f5ff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text column */}
        <div>
          <p
            className="text-xs tracking-[0.4em] uppercase mb-6 font-mono"
            style={{ color: "#7878a0" }}
          >
            // hello world
          </p>

          <GlitchText
            as="h1"
            className="text-5xl md:text-6xl font-bold mb-4 tracking-tight"
            style={{ color: "#e0e0f0" } as React.CSSProperties}
          >
            Lars Roettig
          </GlitchText>

          <p
            className="text-lg md:text-xl font-mono mb-3 tracking-wide"
            style={{ color: "#00f5ff", textShadow: "var(--glow-cyan-sm)" }}
          >
            Senior Technical Architect @ Adobe
          </p>

          <p
            className="text-sm font-mono mb-10"
            style={{ color: "#7878a0" }}
          >
            Architect · Builder · Open Source Contributor
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/blog"
              className="px-8 py-3 text-sm font-mono tracking-widest uppercase transition-all duration-300 text-center"
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
            <Link
              href="/about"
              className="px-8 py-3 text-sm font-mono tracking-widest uppercase transition-all duration-300 text-center"
              style={{
                border: "1px solid #ff00ff",
                color: "#ff00ff",
                boxShadow: "var(--glow-magenta-sm)",
              }}
            >
              About Me
            </Link>
          </div>
        </div>

        {/* Photo column */}
        <div className="flex justify-center md:justify-end">
          <div
            className="relative"
            style={{
              border: "2px solid #00f5ff",
              boxShadow: "var(--glow-cyan), inset 0 0 30px #00f5ff08",
              borderRadius: "2px",
            }}
          >
            <Image
              src="/lars-hero.jpg"
              alt="Lars Roettig"
              width={420}
              height={420}
              className="block"
              style={{ display: "block" }}
              priority
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-16"
              style={{
                background: "linear-gradient(to top, #0a0a0f80, transparent)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
