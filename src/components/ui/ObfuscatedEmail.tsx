"use client";

import { useEffect, useState } from "react";

interface ObfuscatedEmailProps {
  encoded: string;
  className?: string;
}

export default function ObfuscatedEmail({ encoded, className }: ObfuscatedEmailProps) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    try {
      setEmail(atob(encoded));
    } catch {
      setEmail(null);
    }
  }, [encoded]);

  if (!email) {
    return (
      <span className={className} style={{ color: "#ff00ff" }}>
        see imprint
      </span>
    );
  }

  return (
    <a href={`mailto:${email}`} className={className} style={{ color: "#ff00ff" }}>
      {email}
    </a>
  );
}
