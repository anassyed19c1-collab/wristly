import { notFound } from "next/navigation";
import WatchIllustration from "@/components/WatchIllustration";
import { getById } from "@/lib/mock-data";
import { formatPrice } from "@/lib/format";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getById(id);
  if (!product) notFound();

  const variant = product.category === "Smart" ? "digital" : "round";
  const specs = [
    { label: "Movement", value: product.movement },
    { label: "Case Size", value: product.caseSize },
    { label: "Strap", value: product.strapType },
    { label: "Water Resistance", value: product.waterResist },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="mx-auto w-full max-w-sm rounded-lg border border-hairline bg-surface p-10">
          <WatchIllustration variant={variant} className="w-full" />
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
            {product.category}
          </p>
          <h1 className="mt-2 font-display text-4xl text-foreground">
            {product.name}
          </h1>
          <p className="mt-4 font-mono text-xl text-brass">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 text-foreground-muted leading-relaxed">
            {product.description}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-y-4 border-t border-hairline pt-6">
            {specs.map((s) => (
              <div key={s.label}>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-foreground-muted">
                  {s.label}
                </dt>
                <dd className="mt-1 text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>

          <button className="mt-10 w-full rounded-md bg-brass py-3.5 font-mono text-xs uppercase tracking-widest text-background transition-opacity hover:opacity-90 md:w-auto md:px-10">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
