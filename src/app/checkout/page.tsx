"use client";

import { useState } from "react";
import { products } from "@/lib/mock-data";
import { formatPrice } from "@/lib/format";

// TODO: replace with real cart state (context/store) once the cart is built.
// Mocking 2 cart line items from the catalog for now.
const cartItems = [
  { product: products[0], quantity: 1 },
  { product: products[3], quantity: 2 },
];

const initialAddress = {
  name: "",
  phone: "",
  address: "",
  city: "",
};

export default function CheckoutPage() {
  const [form, setForm] = useState(initialAddress);
  const [orderId, setOrderId] = useState<string | null>(null);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const total = subtotal;

  function handleChange(field: keyof typeof initialAddress, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handlePlaceOrder() {
    // TODO: POST /api/orders with { address: form, items: cartItems } once
    // the backend exists. For now we just fake a confirmation locally.
    setOrderId(`wr-${Math.floor(100000 + Math.random() * 900000)}`);
  }

  if (orderId) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-brass">
          Order Confirmed
        </p>
        <h1 className="mt-4 font-display text-4xl text-foreground">Order placed.</h1>
        <p className="mt-4 text-foreground-muted">
          Your order number is{" "}
          <span className="font-mono text-foreground">{orderId}</span>. We&apos;ll send
          a confirmation email once shipping details are ready.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-3xl text-foreground">Checkout</h1>

      <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-2">
        <section>
          <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
            Shipping Address
          </p>

          <form className="mt-6 flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-foreground-muted">
                Full Name
              </span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="rounded-md border border-hairline bg-surface px-4 py-3 text-foreground outline-none transition-colors focus:border-brass"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-foreground-muted">
                Phone
              </span>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="rounded-md border border-hairline bg-surface px-4 py-3 text-foreground outline-none transition-colors focus:border-brass"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-foreground-muted">
                Address
              </span>
              <input
                type="text"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="rounded-md border border-hairline bg-surface px-4 py-3 text-foreground outline-none transition-colors focus:border-brass"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-foreground-muted">
                City
              </span>
              <input
                type="text"
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="rounded-md border border-hairline bg-surface px-4 py-3 text-foreground outline-none transition-colors focus:border-brass"
              />
            </label>
          </form>
        </section>

        <section>
          <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
            Order Summary
          </p>

          <div className="mt-6 divide-y divide-hairline border-t border-hairline">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="text-foreground">{item.product.name}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-foreground-muted">
                    Qty {item.quantity}
                  </p>
                </div>
                <p className="font-mono text-sm text-foreground whitespace-nowrap">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
            <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
              Subtotal
            </p>
            <p className="font-mono text-sm text-foreground">{formatPrice(subtotal)}</p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
              Total
            </p>
            <p className="font-mono text-lg text-brass">{formatPrice(total)}</p>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-8 w-full rounded-md bg-brass py-3.5 font-mono text-xs uppercase tracking-widest text-background transition-opacity hover:opacity-90"
          >
            Place Order
          </button>
        </section>
      </div>
    </div>
  );
}
