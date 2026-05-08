import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "The Collection — Niqabs, Abayas & Hijabs | Danasef" },
      { name: "description", content: "Browse the full Danasef collection of luxury modest wear: niqabs, abayas, hijabs, and accessories crafted in Pakistan." },
      { property: "og:title", content: "Danasef Collection" },
      { property: "og:description", content: "The full atelier — niqabs, abayas, hijabs." },
    ],
  }),
  component: CollectionPage,
});

function CollectionPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["products", "all"],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCTS_QUERY, { first: 120, query: null });
      return (res?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <header className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Atelier</p>
        <h1 className="font-display text-4xl md:text-6xl mt-2">The Collection</h1>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">A complete archive of Danasef's modest wear — every niqab, abaya, hijab and fragrance crafted with intention.</p>
      </header>
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {Array.from({ length: 12 }).map((_, i) => <div key={i} className="aspect-[3/4] bg-secondary/60 animate-pulse" />)}
        </div>
      ) : data && data.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {data.map((p) => <ProductCard key={p.node.id} product={p} />)}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-sm">No products found.</p>
      )}
    </section>
  );
}
