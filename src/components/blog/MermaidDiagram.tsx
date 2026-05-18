"use client";

import { useEffect, useId, useRef } from "react";

interface MermaidDiagramProps {
  diagram: string;
}

export default function MermaidDiagram({ diagram }: MermaidDiagramProps) {
  const id = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    import("mermaid").then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          primaryColor: "#0d0d1a",
          primaryTextColor: "#e0e0ff",
          primaryBorderColor: "#00f5ff",
          lineColor: "#7878a0",
          secondaryColor: "#1a1a2e",
          tertiaryColor: "#0f0f23",
          background: "#0d0d1a",
          mainBkg: "#1a1a2e",
          nodeBorder: "#00f5ff",
          clusterBkg: "#0f0f23",
          titleColor: "#00f5ff",
          edgeLabelBackground: "#1a1a2e",
          fontFamily: "JetBrains Mono, monospace",
        },
      });
      mermaid.render(`mermaid-${id}`, diagram).then(({ svg }) => {
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
        }
      });
    });
    return () => {
      cancelled = true;
    };
  }, [diagram, id]);

  return (
    <div
      ref={ref}
      className="my-6 overflow-x-auto rounded"
      style={{
        background: "#0d0d1a",
        border: "1px solid #1a2a3a",
        padding: "1.5rem",
        minHeight: "4rem",
      }}
    />
  );
}
