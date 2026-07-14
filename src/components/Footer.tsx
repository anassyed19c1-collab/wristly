export default function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="font-display text-lg text-foreground">Wristly</p>
          <p className="mt-1 font-mono text-xs text-foreground-muted">
            Built to be wound, not scrolled past.
          </p>
        </div>
        <p className="font-mono text-xs text-foreground-muted">
          © {new Date().getFullYear()} Wristly. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
