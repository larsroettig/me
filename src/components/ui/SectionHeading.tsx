interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <h2
        className="text-2xl md:text-3xl font-bold tracking-widest uppercase mb-3"
        style={{ color: "#00f5ff", textShadow: "var(--glow-cyan-sm)" }}
      >
        {title}
      </h2>
      <div
        className="h-px w-24"
        style={{
          background: "linear-gradient(90deg, #00f5ff, transparent)",
          boxShadow: "var(--glow-cyan-sm)",
        }}
      />
      {subtitle && (
        <p className="mt-3 text-sm" style={{ color: "#7878a0" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
