interface NeonBadgeProps {
  label: string;
  variant?: "cyan" | "magenta";
}

export default function NeonBadge({ label, variant = "cyan" }: NeonBadgeProps) {
  const isCyan = variant === "cyan";
  return (
    <span
      className="inline-block px-2 py-0.5 text-xs font-mono rounded-sm"
      style={{
        backgroundColor: "#12121e",
        border: `1px solid ${isCyan ? "#00f5ff" : "#ff00ff"}`,
        color: isCyan ? "#00f5ff" : "#ff00ff",
        boxShadow: isCyan
          ? "var(--glow-cyan-sm)"
          : "var(--glow-magenta-sm)",
      }}
    >
      {label}
    </span>
  );
}
