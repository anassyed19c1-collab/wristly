import { formatPrice } from "@/lib/format";

// TODO: replace with real session once auth is added
const mockUser = {
  name: "Amara Sultan",
  email: "amara.sultan@example.com",
};

// Shaped like the Order/OrderItem models in prisma/schema.prisma
// (id, status, totalAmount, createdAt, items[])
const mockOrders = [
  {
    id: "ord-10231",
    createdAt: "2026-06-02T10:00:00.000Z",
    status: "DELIVERED",
    totalAmount: 43400,
    itemCount: 2,
  },
  {
    id: "ord-10198",
    createdAt: "2026-05-14T10:00:00.000Z",
    status: "SHIPPED",
    totalAmount: 24500,
    itemCount: 1,
  },
  {
    id: "ord-10122",
    createdAt: "2026-04-01T10:00:00.000Z",
    status: "DELIVERED",
    totalAmount: 27500,
    itemCount: 1,
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-3xl text-foreground">Account</h1>

      <section className="mt-8 rounded-lg border border-hairline bg-surface p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
              Profile
            </p>
            <p className="mt-3 font-display text-2xl text-foreground">{mockUser.name}</p>
            <p className="mt-1 text-foreground-muted">{mockUser.email}</p>
          </div>
          <button className="shrink-0 rounded-md border border-hairline px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-brass">
            Edit
          </button>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-foreground">Order History</h2>

        <div className="mt-6 divide-y divide-hairline border-t border-hairline">
          {mockOrders.map((order) => (
            <dl key={order.id} className="grid grid-cols-2 gap-4 py-5 sm:grid-cols-4">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-foreground-muted">
                  Order
                </dt>
                <dd className="mt-1 font-mono text-sm text-foreground">{order.id}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-foreground-muted">
                  Date
                </dt>
                <dd className="mt-1 text-foreground">{formatDate(order.createdAt)}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-foreground-muted">
                  Status
                </dt>
                <dd className="mt-1 text-foreground">{order.status}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-foreground-muted">
                  Total
                </dt>
                <dd className="mt-1 font-mono text-sm text-brass">{formatPrice(order.totalAmount)}</dd>
                <dd className="mt-1 text-xs text-foreground-muted">
                  {order.itemCount} {order.itemCount === 1 ? "item" : "items"}
                </dd>
              </div>
            </dl>
          ))}
        </div>
      </section>
    </div>
  );
}
