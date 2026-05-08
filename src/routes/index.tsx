import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Danasef — Luxury Modest Wear | Premium Niqabs, Abayas, Hijabs" },
      { name: "description", content: "Danasef Atelier — luxury niqabs, abayas, hijabs and fragrances for the modern Pakistani Muslim woman. Shop the new collection." },
      { property: "og:title", content: "Danasef — Luxury Modest Wear" },
      { property: "og:description", content: "Premium modest fashion, crafted with intention." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCTS_QUERY, { first: 12, query: null });
      return (res?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--ink)] text-primary-foreground">
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(60% 80% at 80% 20%, var(--azure), transparent), radial-gradient(50% 70% at 10% 90%, var(--deep), transparent)" }} />
        <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--mist)]/80">Atelier · Pakistan</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-4xl">
            Modesty,<br /><em className="text-[var(--mist)]">redefined in silk and silence.</em>
          </h1>
          <p className="mt-8 max-w-xl text-sm md:text-base text-primary-foreground/70 leading-relaxed">
            Danasef crafts heirloom-grade niqabs, abayas, and hijabs for women who carry their faith with quiet confidence.
          </p>
          <div className="mt-10 flex gap-4">
            <Link to="/collection" className="px-8 py-4 bg-[var(--mist)] text-[var(--ink)] text-xs uppercase tracking-[0.2em] hover:bg-white transition-colors">
              Discover the Collection
            </Link>
            <Link to="/about" className="px-8 py-4 border border-[var(--mist)]/40 text-[10px] uppercase tracking-[0.2em] hover:border-[var(--mist)] transition-colors self-center">
              Our Heritage
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">New Arrivals</p>
            <h2 className="font-display text-3xl md:text-5xl mt-2">The Curation</h2>
          </div>
          <Link to="/collection" className="text-xs uppercase tracking-widest underline underline-offset-4 hidden md:inline">View all</Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-secondary/60 animate-pulse" />
            ))}
          </div>
        ) : data && data.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
            {data.map((p) => <ProductCard key={p.node.id} product={p} />)}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No products found.</p>
        )}
      </section>

      {/* Pillars */}
      <section className="border-y border-border/60 bg-[var(--mist)]/30">
        <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-3 gap-10 text-center">
          {[
            { t: "Crafted in Pakistan", d: "Every piece tailored by master artisans in Karachi." },
            { t: "Heirloom Fabrics", d: "Premium jersey cotton, chiffon, and Nida silks." },
            { t: "Modest by Design", d: "Engineered for the woman who chooses grace." },
          ].map((x) => (
            <div key={x.t}>
              <h3 className="font-display text-xl">{x.t}</h3>
              <p className="text-xs text-muted-foreground mt-2 tracking-wide">{x.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
