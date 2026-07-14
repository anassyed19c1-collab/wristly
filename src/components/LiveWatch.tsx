"use client";

import { useEffect, useState } from "react";

/**
 * Live analog dial — same visual language as WatchIllustration's "round"
 * variant, but the hands are computed from the real current time and
 * re-rendered every second. Respects prefers-reduced-motion by dropping
 * to a once-a-minute update with no tick/transition animation.
 */
export default function LiveWatch({ className = "" }: { className?: string }) {
  const [now, setNow] = useState(() => new Date());
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const intervalMs = reducedMotion ? 60_000 : 1000;
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [reducedMotion]);

  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourAngle = hours * 30 + minutes / 2;
  const minuteAngle = minutes * 6 + seconds / 10;
  const secondAngle = seconds * 6;

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <line x1="100" y1="8" x2="100" y2="34" stroke="var(--border-hair)" strokeWidth="10" strokeLinecap="round" />
      <line x1="100" y1="166" x2="100" y2="192" stroke="var(--border-hair)" strokeWidth="10" strokeLinecap="round" />

      <circle
        key={reducedMotion ? "static" : seconds}
        cx="100"
        cy="100"
        r="58"
        stroke="var(--accent-brass)"
        strokeWidth="1.5"
        fill="var(--surface-raised)"
        className={reducedMotion ? "" : "live-watch-pulse"}
        style={{ transformOrigin: "100px 100px" }}
      />

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

      <line
        x1="100"
        y1="100"
        x2="100"
        y2="66"
        stroke="var(--foreground)"
        strokeWidth="3"
        strokeLinecap="round"
        style={{
          transform: `rotate(${hourAngle}deg)`,
          transformOrigin: "100px 100px",
          transition: reducedMotion ? "none" : "transform 0.4s ease-out",
        }}
      />
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="52"
        stroke="var(--foreground)"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          transform: `rotate(${minuteAngle}deg)`,
          transformOrigin: "100px 100px",
          transition: reducedMotion ? "none" : "transform 0.4s ease-out",
        }}
      />
      <line
        x1="100"
        y1="112"
        x2="100"
        y2="46"
        stroke="var(--accent-copper)"
        strokeWidth="1"
        strokeLinecap="round"
        style={{
          transform: `rotate(${secondAngle}deg)`,
          transformOrigin: "100px 100px",
          transition: reducedMotion ? "none" : "transform 0.25s cubic-bezier(0.4, 2.3, 0.6, 1)",
        }}
      />
      <circle cx="100" cy="100" r="3" fill="var(--accent-copper)" />

      <style>{`
        @keyframes live-watch-tick {
          0% { transform: scale(1); }
          15% { transform: scale(1.012); }
          100% { transform: scale(1); }
        }
        .live-watch-pulse {
          animation: live-watch-tick 0.3s ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .live-watch-pulse { animation: none !important; }
        }
      `}</style>
    </svg>
  );
}
