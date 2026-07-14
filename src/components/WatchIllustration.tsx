/**
 * Stylized line-art watch illustration used as placeholder product imagery.
 * Swap for real product photography (imageUrl field) once available —
 * this keeps the catalog visually consistent until then.
 */
export default function WatchIllustration({
  variant = "round",
  className = "",
}: {
  variant?: "round" | "square" | "digital";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
    >
      <line x1="100" y1="8" x2="100" y2="34" stroke="var(--border-hair)" strokeWidth="10" strokeLinecap="round" />
      <line x1="100" y1="166" x2="100" y2="192" stroke="var(--border-hair)" strokeWidth="10" strokeLinecap="round" />

      {variant === "square" ? (
        <rect x="45" y="45" width="110" height="110" rx="14" stroke="var(--accent-brass)" strokeWidth="1.5" fill="var(--surface-raised)" />
      ) : (
        <circle cx="100" cy="100" r="58" stroke="var(--accent-brass)" strokeWidth="1.5" fill="var(--surface-raised)" />
      )}

      {variant !== "digital" ? (
        <>
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const r1 = 48;
            const r2 = i % 3 === 0 ? 42 : 45;
            return (
              <line
                key={i}
                x1={100 + r1 * Math.sin(angle)}
                y1={100 - r1 * Math.cos(angle)}
                x2={100 + r2 * Math.sin(angle)}
                y2={100 - r2 * Math.cos(angle)}
                stroke="var(--foreground-muted)"
                strokeWidth={i % 3 === 0 ? 1.4 : 0.8}
              />
            );
          })}
          <line x1="100" y1="100" x2="100" y2="66" stroke="var(--accent-copper)" strokeWidth="2" strokeLinecap="round" />
          <line x1="100" y1="100" x2="122" y2="100" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="100" cy="100" r="3" fill="var(--accent-copper)" />
        </>
      ) : (
        <text x="100" y="106" textAnchor="middle" fontFamily="monospace" fontSize="15" fill="var(--foreground)">
          10:24
        </text>
      )}
    </svg>
  );
}
