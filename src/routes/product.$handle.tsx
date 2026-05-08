import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2, Plus, Minus } from "lucide-react";

type ProductNode = {
  id: string; title: string; description: string; descriptionHtml?: string; handle: string; productType?: string; tags?: string[];
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  variants: { edges: Array<{ node: { id: string; title: string; availableForSale: boolean; price: { amount: string; currencyCode: string }; selectedOptions: Array<{ name: string; value: string }> } }> };
  options: Array<{ name: string; values: string[] }>;
};

export const Route = createFileRoute("/product/$handle")({
  loader: async ({ params }) => {
    const res = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle: params.handle });
    const product = res?.data?.product as ProductNode | null;
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Product" }] };
    const img = p.images.edges[0]?.node?.url;
    const desc = (p.description || "").slice(0, 155);
    return {
      meta: [
        { title: `${p.title} | Danasef` },
        { name: "description", content: desc },
        { property: "og:title", content: p.title },
        { property: "og:description", content: desc },
        ...(img ? [{ property: "og:image", content: img }, { name: "twitter:image", content: img }] : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
  errorComponent: ({ error }) => (
    <div className="p-20 text-center"><p>{error.message}</p><Link to="/collection" className="underline">Back to collection</Link></div>
  ),
  notFoundComponent: () => (
    <div className="p-20 text-center"><h1 className="font-display text-3xl">Not in the atelier</h1><Link to="/collection" className="underline mt-4 inline-block">Browse collection</Link></div>
  ),
});

function generateFAQs(p: ProductNode) {
  const title = p.title;
  const type = (p.productType || "modest wear").toLowerCase();
  return [
    { q: `What makes the ${title} different from standard ${type}?`, a: `Each Danasef ${type} is cut from premium Pakistani-sourced fabric and finished by master tailors in our Karachi atelier. We prioritise drape, breathability, and fit over volume production.` },
    { q: `What fabric is the ${title} made from?`, a: `This piece uses premium jersey cotton (or specified fabric) selected for softness, breathability, and shape retention — ideal for Pakistan's climate and all-day modest wear.` },
    { q: `Does the ${title} ship across Pakistan?`, a: `Yes. We ship nationwide via trusted couriers with cash on delivery available in all major cities including Karachi, Lahore, Islamabad, and Rawalpindi.` },
    { q: `How long does delivery take?`, a: `Standard delivery is 2-4 working days within Pakistan. Same-city dispatch happens within 24 hours of order confirmation.` },
    { q: `Can I exchange or return the ${title}?`, a: `Unworn pieces in original packaging may be exchanged within 7 days. For hygiene reasons, niqabs and intimate modest wear are non-returnable once unsealed.` },
    { q: `How should I care for this piece?`, a: `Hand wash cold or machine wash gentle in a laundry bag. Air dry in shade. Do not bleach. Iron on low. Following these steps keeps colour and shape intact season after season.` },
    { q: `What size should I order?`, a: `Most Danasef modest wear is one-size with adjustable fit. For tailored pieces like abayas, refer to the size chart on this page or message us on WhatsApp for a personal fitting consultation.` },
    { q: `Is this ${type} suitable for daily wear, occasions, or both?`, a: `${title} is designed to transition seamlessly from everyday wear — school, work, Quran class — to occasions. The fabric and finish are intentional for both.` },
    { q: `Do you offer cash on delivery?`, a: `Yes. Cash on delivery is available across Pakistan. We also accept bank transfer, JazzCash, and EasyPaisa for prepaid orders.` },
    { q: `How can I contact Danasef for queries about the ${title}?`, a: `Reach our atelier team on WhatsApp or email. We respond within a few hours during business days and are happy to assist with sizing, styling, or bulk orders.` },
  ];
}

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: ProductNode };
  const p = product;
  const variants = p.variants.edges;
  const [variantId, setVariantId] = useState(variants[0]?.node.id ?? "");
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const selected = variants.find((v) => v.node.id === variantId)?.node ?? variants[0]?.node;
  const price = selected?.price ?? p.priceRange.minVariantPrice;
  const images = p.images.edges;
  const faqs = generateFAQs(p);

  const handleAdd = async () => {
    if (!selected) return;
    await addItem({
      product: { node: p },
      variantId: selected.id,
      variantTitle: selected.title,
      price: selected.price,
      quantity: qty,
      selectedOptions: selected.selectedOptions ?? [],
    });
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: p.title,
    description: p.description,
    image: images.map((i) => i.node.url),
    sku: selected?.id,
    brand: { "@type": "Brand", name: "Danasef" },
    offers: {
      "@type": "Offer",
      url: typeof window !== "undefined" ? window.location.href : "",
      priceCurrency: price.currencyCode,
      price: price.amount,
      availability: selected?.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <article className="mx-auto max-w-7xl px-6 py-12">
      <nav className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-8">
        <Link to="/">Maison</Link> · <Link to="/collection">Collection</Link> · <span>{p.title}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="aspect-[4/5] bg-secondary/40 overflow-hidden">
            {images[activeImg] && (
              <img src={images[activeImg].node.url} alt={images[activeImg].node.altText ?? p.title} className="w-full h-full object-cover" />
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {images.map((img, i) => (
                <button
                  key={img.node.url}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square overflow-hidden bg-secondary/40 border ${i === activeImg ? "border-[var(--ink)]" : "border-transparent"}`}
                >
                  <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="lg:pl-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{p.productType || "Danasef"}</p>
          <h1 className="font-display text-3xl md:text-5xl mt-3 leading-tight">{p.title}</h1>
          <p className="mt-4 text-2xl font-display">{formatPrice(price.amount, price.currencyCode)}</p>

          {/* Variants */}
          {variants.length > 1 && (
            <div className="mt-8">
              <p className="text-xs uppercase tracking-widest mb-3">Choose</p>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.node.id}
                    onClick={() => setVariantId(v.node.id)}
                    disabled={!v.node.availableForSale}
                    className={`px-4 py-2 text-xs border transition-colors ${variantId === v.node.id ? "border-[var(--ink)] bg-[var(--ink)] text-primary-foreground" : "border-border hover:border-[var(--ink)]"} disabled:opacity-40`}
                  >{v.node.title}</button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-3"><Minus className="h-3 w-3" /></button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-3"><Plus className="h-3 w-3" /></button>
            </div>
            <Button
              onClick={handleAdd}
              disabled={isLoading || !selected?.availableForSale}
              className="flex-1 rounded-none h-12 bg-[var(--ink)] hover:bg-[var(--deep)] text-primary-foreground text-xs uppercase tracking-[0.2em]"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : selected?.availableForSale ? "Add to Bag" : "Sold Out"}
            </Button>
          </div>

          {/* Description */}
          {p.descriptionHtml ? (
            <div className="prose prose-sm mt-10 max-w-none text-foreground/80" dangerouslySetInnerHTML={{ __html: p.descriptionHtml }} />
          ) : (
            <p className="mt-10 text-sm leading-relaxed text-foreground/80 whitespace-pre-line">{p.description}</p>
          )}

          {/* Pillars */}
          <ul className="mt-10 grid grid-cols-2 gap-4 text-xs text-muted-foreground border-t border-border/60 pt-8">
            <li>· Crafted in Karachi</li>
            <li>· Premium fabric</li>
            <li>· Ships across Pakistan</li>
            <li>· Cash on delivery</li>
          </ul>
        </div>
      </div>

      {/* FAQ */}
      <section className="mt-24 max-w-3xl mx-auto">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground text-center">Questions</p>
        <h2 className="font-display text-3xl md:text-4xl text-center mt-2 mb-10">Everything to know</h2>
        <Accordion type="single" collapsible>
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`q${i}`}>
              <AccordionTrigger className="text-left text-sm">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </article>
  );
}
