"use client";

import Image from "next/image";

export default function AuthorBio() {
  return (
    <div
      className="mt-16 flex items-start gap-4 rounded-sm p-6"
      style={{
        backgroundColor: "#0f0f1a",
        border: "1px solid #1a1a2e",
      }}
    >
      <Image
        src="/lars-hero.jpg"
        alt="Lars Roettig"
        width={64}
        height={64}
        className="rounded-full shrink-0"
        style={{ border: "1px solid #00f5ff40", objectFit: "cover" }}
      />
      <div>
        <p className="font-bold text-sm mb-1" style={{ color: "#e0e0f0" }}>
          Lars Roettig
        </p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "#7878a0" }}>
          Senior Technical Architect writing about AI, engineering, and building things that last.
        </p>
        <a
          href="https://www.linkedin.com/in/larsroettig/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs transition-colors duration-200"
          style={{ color: "#00f5ff" }}
        >
          LinkedIn →
        </a>
      </div>
    </div>
  );
}
