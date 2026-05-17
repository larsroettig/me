"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import NeonBadge from "@/components/ui/NeonBadge";

const skills = [
  {
    category: "Languages",
    variant: "cyan" as const,
    items: ["TypeScript", "Python", "Rust", "JavaScript"],
  },
  {
    category: "Frontend",
    variant: "magenta" as const,
    items: ["Next.js", "React", "Tailwind CSS", "Vite"],
  },
  {
    category: "AI / ML",
    variant: "cyan" as const,
    items: ["Claude API", "LangChain", "OpenAI SDK", "LlamaIndex"],
  },
  {
    category: "Cloud & Infra",
    variant: "magenta" as const,
    items: ["Vercel", "AWS", "Docker", "Kubernetes"],
  },
  {
    category: "Tools",
    variant: "cyan" as const,
    items: ["Git", "Nx", "Turborepo", "Playwright"],
  },
];

export default function SkillsSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: "#0a0a0f" }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="TECH_STACK"
          subtitle="Technologies I work with every day"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map(({ category, variant, items }) => (
            <div
              key={category}
              className="p-5 rounded-sm transition-all duration-300 group"
              style={{
                backgroundColor: "#0f0f1a",
                border: "1px solid #1a1a2e",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  variant === "cyan" ? "#00f5ff40" : "#ff00ff40";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  variant === "cyan"
                    ? "0 0 20px #00f5ff10"
                    : "0 0 20px #ff00ff10";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#1a1a2e";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <h3
                className="text-xs font-mono tracking-widest uppercase mb-4"
                style={{
                  color: variant === "cyan" ? "#00f5ff" : "#ff00ff",
                }}
              >
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <NeonBadge key={item} label={item} variant={variant} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
