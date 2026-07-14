import Link from "next/link";
import type { Product } from "@/lib/mock-data";
import { formatPrice } from "@/lib/format";
import WatchIllustration from "./WatchIllustration";

export default function ProductCard({ product }: { product: Product }) {
  const variant = product.category === "Smart" ? "digital" : "round";

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block rounded-lg border border-hairline bg-surface p-5 transition-colors hover:border-brass"
    >
      <div className="aspect-square w-full overflow-hidden rounded-md bg-background/40 p-6 transition-transform group-hover:scale-[1.02]">
        <WatchIllustration variant={variant} className="h-full w-full" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-lg text-foreground">{product.name}</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-foreground-muted">
            {product.strapType} · {product.caseSize}
          </p>
        </div>
        <p className="font-mono text-sm text-brass whitespace-nowrap">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
