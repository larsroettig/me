"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: "rgba(10, 10, 15, 0.85)",
        borderBottom: "1px solid #1a1a2e",
      }}
    >
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Lars Roettig — Home">
          <Logo
            size={34}
            style={{
              color: "#00f5ff",
              filter: "drop-shadow(0 0 6px #00f5ff) drop-shadow(0 0 12px #00f5ff60)",
            }}
          />
        </Link>
        <ul className="flex gap-8">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm tracking-wider transition-all duration-200 relative group"
                  style={{
                    color: isActive ? "#00f5ff" : "#7878a0",
                    textShadow: isActive ? "var(--glow-cyan-sm)" : "none",
                  }}
                >
                  {label}
                  <span
                    className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                    style={{
                      background: "#00f5ff",
                      boxShadow: "var(--glow-cyan-sm)",
                    }}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
