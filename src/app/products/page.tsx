import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getByCategory } from "@/lib/mock-data";

const CATEGORIES = ["Men", "Women", "Smart"] as const;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const items = getByCategory(category);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-3xl text-foreground">
        {category ? `${category}'s Watches` : "All Watches"}
      </h1>

      <div className="mt-6 flex gap-3 font-mono text-xs uppercase tracking-widest">
        <Link
          href="/products"
          className={`rounded-full border px-4 py-1.5 transition-colors ${
            !category
              ? "border-brass text-brass"
              : "border-hairline text-foreground-muted hover:border-brass"
          }`}
        >
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            href={`/products?category=${c}`}
            className={`rounded-full border px-4 py-1.5 transition-colors ${
              category === c
                ? "border-brass text-brass"
                : "border-hairline text-foreground-muted hover:border-brass"
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {items.length === 0 && (
        <p className="mt-10 text-foreground-muted">
          Nothing here yet — check back soon.
        </p>
      )}
    </div>
  );
}
