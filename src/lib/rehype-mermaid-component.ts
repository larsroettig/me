import { visit } from "unist-util-visit";
import type { Root, Element, Text } from "hast";

// Transforms ```mermaid code blocks into <div data-mermaid-diagram="..."> so
// rehype-pretty-code doesn't syntax-highlight them and we can render them
// client-side with the MermaidDiagram component.
export function rehypeMermaidComponent() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "pre" || !parent || typeof index !== "number") return;

      const codeEl = node.children[0];
      if (
        !codeEl ||
        codeEl.type !== "element" ||
        (codeEl as Element).tagName !== "code"
      )
        return;

      const code = codeEl as Element;
      const classes = code.properties?.className;
      if (!Array.isArray(classes) || !classes.includes("language-mermaid"))
        return;

      const text = code.children
        .filter((c): c is Text => c.type === "text")
        .map((c) => c.value)
        .join("");

      parent.children[index] = {
        type: "element",
        tagName: "div",
        properties: { "data-mermaid-diagram": encodeURIComponent(text) },
        children: [],
      } as Element;
    });
  };
}
