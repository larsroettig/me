import NeonBadge from "@/components/ui/NeonBadge";
import SectionHeading from "@/components/ui/SectionHeading";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="ABOUT_ME" />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Terminal-style text block */}
          <div
            className="rounded-sm p-6 font-mono text-sm"
            style={{
              backgroundColor: "#0f0f1a",
              border: "1px solid #1a1a2e",
            }}
          >
            <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid #1a1a2e" }}>
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ff00ff" }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#00f5ff" }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#7878a0" }} />
              <span className="ml-2 text-xs" style={{ color: "#7878a0" }}>lars@adobe ~ %</span>
            </div>

            <div className="space-y-3" style={{ color: "#c0c0d8" }}>
              <p>
                <span style={{ color: "#00f5ff" }}>{">"}</span>{" "}
                I&apos;m an AI Engineer at{" "}
                <NeonBadge label="Adobe" variant="magenta" />{" "}
                building intelligent systems that power creative workflows at scale.
              </p>
              <p>
                <span style={{ color: "#00f5ff" }}>{">"}</span>{" "}
                I specialize in{" "}
                <NeonBadge label="AI Agents" />{" "}
                ,{" "}
                <NeonBadge label="LLM Integration" />{" "}
                , and{" "}
                <NeonBadge label="Architecture" variant="magenta" />{" "}
                — turning complex AI capabilities into reliable production systems.
              </p>
              <p>
                <span style={{ color: "#00f5ff" }}>{">"}</span>{" "}
                When I&apos;m not shipping code at Adobe, I write about software architecture,
                AI engineering patterns, and building things that last.
              </p>
              <p className="mt-4" style={{ color: "#7878a0" }}>
                <span style={{ color: "#ff00ff" }}>$</span> cat interests.txt
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {["AI Agents", "Next.js", "TypeScript", "Open Source", "Architecture"].map((tag) => (
                  <NeonBadge key={tag} label={tag} variant="cyan" />
                ))}
              </div>
            </div>
          </div>

          {/* Decorative side panel */}
          <div className="hidden md:flex flex-col gap-4">
            {[
              { label: "ROLE", value: "AI Engineer" },
              { label: "COMPANY", value: "Adobe" },
              { label: "FOCUS", value: "AI Systems & Architecture" },
              { label: "STATUS", value: "Building in prod" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="px-4 py-3 rounded-sm font-mono"
                style={{
                  backgroundColor: "#12121e",
                  border: "1px solid #1a1a2e",
                }}
              >
                <span className="text-xs tracking-widest" style={{ color: "#7878a0" }}>
                  {label}
                </span>
                <p className="mt-1 text-sm" style={{ color: "#00f5ff" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
