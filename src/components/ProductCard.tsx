import { Link } from '@tanstack/react-router';
import { type ShopifyProduct, formatPrice } from '@/lib/shopify';

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const p = product.node;
  const img = p.images.edges[0]?.node;
  const img2 = p.images.edges[1]?.node;
  const price = p.priceRange.minVariantPrice;

  return (
    <Link to="/product/$handle" params={{ handle: p.handle }} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary/40">
        {img && (
          <img
            src={img.url}
            alt={img.altText ?? p.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0"
          />
        )}
        {img2 ? (
          <img
            src={img2.url}
            alt={img2.altText ?? p.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[1200ms] group-hover:scale-100"
          />
        ) : (
          img && <img src={img.url} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[1200ms] group-hover:scale-110" />
        )}
      </div>
      <div className="pt-4 pb-2 space-y-1">
        <h3 className="text-sm font-medium leading-tight line-clamp-2 group-hover:text-[var(--deep)] transition-colors">{p.title}</h3>
        <p className="text-xs text-muted-foreground tracking-wide">{formatPrice(price.amount, price.currencyCode)}</p>
      </div>
    </Link>
  );
}
