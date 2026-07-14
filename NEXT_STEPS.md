# Wristly — Where things stand

## ✅ Done so far
- Next.js (TypeScript, App Router, Tailwind v4) scaffolded
- Brand design system in `src/app/globals.css` (charcoal + brass/copper, Fraunces/Inter/JetBrains Mono)
- `Navbar`, `Footer`, `ProductCard`, `WatchIllustration` components
- Pages: Home (`/`), Products listing with category filter (`/products`), Product detail (`/products/[id]`)
- Catalog is currently **mock data** (`src/lib/mock-data.ts`) — no DB wired up yet
- Prisma schema drafted (`prisma/schema.prisma`): `Product`, `User`, `Order`, `OrderItem`

## ⏭️ Next (in order)
1. `npm install` locally, then `npx prisma generate` (couldn't run in this sandbox — no network access to Prisma's binary CDN, works fine locally)
2. Set up a local MySQL (or Docker) for dev, point `.env.local` → `DATABASE_URL`
3. `npx prisma db push` to create tables, write a seed script to load the mock data into the DB
4. Build API routes (`src/app/api/products/route.ts` etc.) using Prisma instead of `mock-data.ts`
5. Auth: signup/login pages + session handling
6. Cart (client-side state) + Checkout page (simulated order placement)
7. Order history page (`/account/orders`)
8. Simple admin panel (`/admin`) — add/edit/delete products, view orders
9. Favicon + OG image (branded, replace default Next.js icon — did this for Project 2 too)

## 🚀 AWS phase (later, once app is feature-complete)
- Terraform: VPC, ALB, ASG, EC2, RDS (Multi-AZ), Security Groups, IAM, KMS, ACM
- Packer: bake an AMI with Node.js + this app pre-installed
- GitHub Actions: build → Packer → rolling ASG update
- CloudWatch alarms for auto-scaling
- Route 53 (pending decision — real domain or default ALB URL)
