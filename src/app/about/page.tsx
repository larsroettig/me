import type { Metadata } from "next";
import NeonBadge from "@/components/ui/NeonBadge";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description: "Senior Technical Architect at Adobe. Building AI systems, agents, and architecture. Based in Bavaria, Germany.",
};

const experience = [
  {
    title: "Senior Technical Architect",
    company: "Adobe",
    period: "Feb 2025 – present",
    description:
      "Architect focusing on AI systems, agents, and architecture. Building intelligent capabilities that connect LLMs to creative workflows at scale.",
    current: true,
  },
  {
    title: "Adobe Commerce Technical Architect",
    company: "Adobe",
    period: "Aug 2022 – Feb 2025",
    description:
      "Technical Architect for Adobe Commerce. Front-end architecture, JavaScript, and platform engineering across large-scale commerce deployments.",
    current: false,
  },
  {
    title: "Senior Software Engineer / Architect",
    company: "TechDivision GmbH",
    period: "2016 – 2022",
    description:
      "Senior engineer and later architect at a digital agency focused on e-commerce. Led teams across large Magento projects. Maintainer on the Magento PWA Core Team. Served as remote team lead for a US client for 12 months in 2019–2020.",
    current: false,
  },
];

const skills = [
  {
    category: "Languages",
    variant: "cyan" as const,
    items: ["TypeScript", "Python", "Rust"],
  },
  {
    category: "AI / ML",
    variant: "magenta" as const,
    items: ["LangChain", "Claude API", "LlamaIndex", "RAG"],
  },
  {
    category: "Frontend",
    variant: "cyan" as const,
    items: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    category: "Cloud & Tools",
    variant: "magenta" as const,
    items: ["Vercel", "AWS", "Docker", "Tauri"],
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-16">
        <p className="text-xs tracking-[0.4em] uppercase mb-4 font-mono" style={{ color: "#7878a0" }}>
          // who I am
        </p>
        <h1
          className="text-4xl md:text-6xl font-bold mb-4"
          style={{ color: "#00f5ff", textShadow: "var(--glow-cyan-sm)" }}
        >
          Lars Roettig
        </h1>
        <p className="text-xl font-mono mb-2" style={{ color: "#e0e0f0" }}>
          Senior Technical Architect @ Adobe
        </p>
        <p className="text-sm font-mono" style={{ color: "#7878a0" }}>
          Bavaria, Germany
        </p>
      </div>

      {/* Bio */}
      <section className="mb-16">
        <SectionHeading title="BIO" />
        <div
          className="p-6 rounded-sm font-mono text-sm leading-relaxed space-y-4"
          style={{
            backgroundColor: "#0f0f1a",
            border: "1px solid #1a1a2e",
            color: "#c0c0d8",
          }}
        >
          <p>
            <span style={{ color: "#00f5ff" }}>{">"}</span>{" "}
            I&apos;m a Senior Technical Architect at Adobe, working on AI systems and the
            infrastructure that connects large language models to real creative workflows.
            Most of my time goes into agent architecture, LLM integration patterns, and
            figuring out what actually holds up in production versus what only works in demos.
          </p>
          <p>
            <span style={{ color: "#00f5ff" }}>{">"}</span>{" "}
            Before moving into AI engineering, I spent eight years as a software engineer and
            architect in e-commerce, mostly working on large Magento and React projects.
            That background in high-throughput systems has been useful — the same thinking
            about reliability, data consistency, and failure modes applies when the component
            doing the work is a language model.
          </p>
          <p>
            <span style={{ color: "#00f5ff" }}>{">"}</span>{" "}
            I also build things outside of work. {" "}
            <a
              href="https://github.com/larsroettig/thoughtforge"
              style={{ color: "#ff00ff" }}
            >
              ThoughtForge
            </a>{" "}
            is a local-first AI planning assistant I built with Tauri and Rust.
            I write here about what I&apos;m learning: RAG, agent patterns, vector search,
            and the practical side of building with LLMs.
          </p>
          <p>
            <span style={{ color: "#00f5ff" }}>{">"}</span>{" "}
            I live in the south of Bavaria. When I&apos;m not in front of a screen I&apos;m usually
            cycling or hiking somewhere without cell service.
          </p>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-16">
        <SectionHeading title="EXPERIENCE" />
        <div className="space-y-4">
          {experience.map((role) => (
            <div
              key={`${role.company}-${role.period}`}
              className="p-6 rounded-sm"
              style={{
                backgroundColor: "#0f0f1a",
                border: `1px solid ${role.current ? "#00f5ff40" : "#1a1a2e"}`,
                boxShadow: role.current ? "0 0 20px #00f5ff08" : "none",
              }}
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <h3
                    className="font-bold text-base font-mono"
                    style={{ color: role.current ? "#00f5ff" : "#e0e0f0" }}
                  >
                    {role.title}
                  </h3>
                  <p className="text-sm font-mono mt-0.5" style={{ color: "#7878a0" }}>
                    {role.company}
                  </p>
                </div>
                <span
                  className="text-xs font-mono tracking-wider px-2 py-1 rounded-sm"
                  style={{
                    color: role.current ? "#00f5ff" : "#7878a0",
                    backgroundColor: role.current ? "#00f5ff10" : "#12121e",
                    border: `1px solid ${role.current ? "#00f5ff40" : "#1a1a2e"}`,
                  }}
                >
                  {role.period}
                </span>
              </div>
              <p className="text-sm leading-relaxed font-mono" style={{ color: "#c0c0d8" }}>
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-16">
        <SectionHeading title="SKILLS" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map(({ category, variant, items }) => (
            <div
              key={category}
              className="p-5 rounded-sm"
              style={{
                backgroundColor: "#0f0f1a",
                border: "1px solid #1a1a2e",
              }}
            >
              <h3
                className="text-xs font-mono tracking-widest uppercase mb-3"
                style={{ color: variant === "cyan" ? "#00f5ff" : "#ff00ff" }}
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
      </section>

      {/* Links */}
      <section>
        <SectionHeading title="FIND_ME" />
        <div className="flex flex-wrap gap-4 font-mono text-sm">
          {[
            { label: "GitHub", href: "https://github.com/larsroettig" },
            { label: "LinkedIn", href: "https://linkedin.com/in/larsroettig" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-sm transition-all duration-200"
              style={{
                border: "1px solid #00f5ff",
                color: "#00f5ff",
                boxShadow: "var(--glow-cyan-sm)",
              }}
            >
              {label} ↗
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
