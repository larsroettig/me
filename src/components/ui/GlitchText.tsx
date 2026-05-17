import type { CSSProperties } from "react";

type Tag = "h1" | "h2" | "h3" | "span" | "p";

interface GlitchTextProps {
  children: string;
  as?: Tag;
  className?: string;
  style?: CSSProperties;
}

export default function GlitchText({
  children,
  as: Tag = "span",
  className = "",
  style,
}: GlitchTextProps) {
  return (
    <Tag className={`glitch ${className}`} data-text={children} style={style}>
      {children}
    </Tag>
  );
}
