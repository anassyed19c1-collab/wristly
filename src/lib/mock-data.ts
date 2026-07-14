export type Product = {
  id: string;
  name: string;
  description: string;
  price: number; // in PKR
  category: "Men" | "Women" | "Smart";
  strapType: string;
  caseSize: string;
  movement: string;
  waterResist: string;
  imageUrl: string;
  featured: boolean;
};

// Temporary in-memory catalog. Once RDS is connected, this will be replaced
// by Prisma queries in the API routes (see src/app/api/products/route.ts).
export const products: Product[] = [
  {
    id: "wr-001",
    name: "The Meridian",
    description:
      "A field-inspired automatic with a sunburst navy dial and a full-grain leather strap. Built for daily wear, aged to look better with it.",
    price: 24500,
    category: "Men",
    strapType: "Leather",
    caseSize: "40mm",
    movement: "Automatic",
    waterResist: "50m",
    imageUrl: "/watches/meridian.jpg",
    featured: true,
  },
  {
    id: "wr-002",
    name: "The Solstice",
    description:
      "A slim quartz dress watch with a champagne dial and a mesh steel band — quiet enough for the office, sharp enough for after.",
    price: 18900,
    category: "Women",
    strapType: "Steel Mesh",
    caseSize: "34mm",
    movement: "Quartz",
    waterResist: "30m",
    imageUrl: "/watches/solstice.jpg",
    featured: true,
  },
  {
    id: "wr-003",
    name: "The Compass Pro",
    description:
      "Our smart line: heart-rate, sleep tracking, and a 10-day battery, wrapped in a case that doesn't look like a gadget.",
    price: 32000,
    category: "Smart",
    strapType: "Silicone",
    caseSize: "42mm",
    movement: "Digital",
    waterResist: "100m",
    imageUrl: "/watches/compass-pro.jpg",
    featured: true,
  },
  {
    id: "wr-004",
    name: "The Harbor",
    description: "A weekend diver with a unidirectional bezel and lume that actually lasts till morning.",
    price: 27500,
    category: "Men",
    strapType: "Steel",
    caseSize: "41mm",
    movement: "Automatic",
    waterResist: "200m",
    imageUrl: "/watches/harbor.jpg",
    featured: false,
  },
  {
    id: "wr-005",
    name: "The Lumen",
    description: "A minimalist women's dress watch with a domed sapphire crystal and a slim 6mm case.",
    price: 21000,
    category: "Women",
    strapType: "Leather",
    caseSize: "32mm",
    movement: "Quartz",
    waterResist: "30m",
    imageUrl: "/watches/lumen.jpg",
    featured: false,
  },
  {
    id: "wr-006",
    name: "The Pulse",
    description: "Everyday smartwatch with always-on display and a strap you can swap in ten seconds flat.",
    price: 19500,
    category: "Smart",
    strapType: "Silicone",
    caseSize: "40mm",
    movement: "Digital",
    waterResist: "50m",
    imageUrl: "/watches/pulse.jpg",
    featured: false,
  },
];

export function getFeatured() {
  return products.filter((p) => p.featured);
}

export function getByCategory(category?: string) {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}

export function getById(id: string) {
  return products.find((p) => p.id === id);
}
