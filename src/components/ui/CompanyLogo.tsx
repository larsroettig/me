interface CompanyLogoProps {
  company: "adobe" | "techdivision";
  size?: number;
}

export default function CompanyLogo({ company, size = 32 }: CompanyLogoProps) {
  if (company === "adobe") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 240 234"
        fill="none"
        aria-label="Adobe"
        role="img"
      >
        <path d="M144.4 0H240v234L144.4 0Z" fill="#EB1000" />
        <path d="M95.6 0H0v234L95.6 0Z" fill="#EB1000" />
        <path
          d="M120 87.3l49.2 117.3H136l-14.7-35.4H93.3L120 87.3Z"
          fill="#fff"
        />
      </svg>
    );
  }

  // TechDivision — monogram badge
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: "#1a1a2e",
        border: "1px solid #7878a0",
        borderRadius: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.35,
        fontFamily: "JetBrains Mono, monospace",
        color: "#7878a0",
        fontWeight: 700,
      }}
    >
      TD
    </div>
  );
}
