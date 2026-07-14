import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import LiveWatch from "@/components/LiveWatch";
import { getFeatured } from "@/lib/mock-data";

export default function Home() {
  const featured = getFeatured();

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-hairline">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
              Est. Wristly Watch Co.
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] text-foreground md:text-6xl">
              Time, made to be <em className="not-italic text-brass">kept</em>.
            </h1>
            <p className="mt-6 max-w-md text-foreground-muted">
              We build a small, considered line of watches — sold directly,
              without a mall in between. Automatic movements, real leather,
              no planned obsolescence.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                href="/products"
                className="rounded-md bg-brass px-6 py-3 font-mono text-xs uppercase tracking-widest text-background transition-opacity hover:opacity-90"
              >
                Shop the Collection
              </Link>
              <Link
                href="/products?category=Smart"
                className="rounded-md border border-hairline px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-brass"
              >
                Explore Smart
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-xs">
            <LiveWatch className="w-full" />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl text-foreground">Featured</h2>
          <Link
            href="/products"
            className="font-mono text-xs uppercase tracking-widest text-foreground-muted hover:text-brass"
          >
            View all →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
