import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <DialMark />
          <span className="font-display text-xl tracking-wide text-foreground">
            Wristly
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-foreground-muted">
          <Link href="/products?category=Men" className="hover:text-brass transition-colors">
            Men
          </Link>
          <Link href="/products?category=Women" className="hover:text-brass transition-colors">
            Women
          </Link>
          <Link href="/products?category=Smart" className="hover:text-brass transition-colors">
            Smart
          </Link>
          <Link href="/products" className="hover:text-brass transition-colors">
            All Watches
          </Link>
        </nav>

        <div className="flex items-center gap-5 text-foreground">
          <Link href="/account" aria-label="Account" className="hover:text-brass transition-colors">
            <User size={18} strokeWidth={1.5} />
          </Link>
          <Link href="/cart" aria-label="Cart" className="hover:text-brass transition-colors">
            <ShoppingBag size={18} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </header>
  );
}

/** Signature mark: a minimal watch dial with a slowly sweeping second hand. */
function DialMark() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      className="shrink-0"
      aria-hidden="true"
    >
      <circle cx="13" cy="13" r="11.5" stroke="var(--accent-brass)" strokeWidth="1.2" />
      <circle cx="13" cy="13" r="0.9" fill="var(--accent-brass)" />
      {[0, 90, 180, 270].map((deg) => (
        <line
          key={deg}
          x1="13"
          y1="3.2"
          x2="13"
          y2="4.6"
          stroke="var(--accent-brass)"
          strokeWidth="1"
          transform={`rotate(${deg} 13 13)`}
        />
      ))}
      <line
        x1="13"
        y1="13"
        x2="13"
        y2="5"
        stroke="var(--accent-copper)"
        strokeWidth="1"
        strokeLinecap="round"
        style={{ transformOrigin: "13px 13px", animation: "spin 8s linear infinite" }}
      />
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          line[style] { animation: none !important; }
        }
      `}</style>
    </svg>
  );
}
