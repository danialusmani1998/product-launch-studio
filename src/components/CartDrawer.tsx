import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingBag, Minus, Plus, Trash2, Loader2 } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/shopify';

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const total = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode || 'PKR';

  useEffect(() => { if (open) syncCart(); }, [open, syncCart]);

  const checkout = () => {
    const url = getCheckoutUrl();
    if (url) { window.open(url, '_blank'); setOpen(false); }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-accent text-accent-foreground">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Your Atelier Bag</SheetTitle>
          <SheetDescription>{totalItems === 0 ? 'Empty — discover our collection.' : `${totalItems} piece${totalItems !== 1 ? 's' : ''} curated`}</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {items.map((item) => {
            const img = item.product.node.images?.edges?.[0]?.node;
            return (
              <div key={item.variantId} className="flex gap-3 border-b pb-3">
                <div className="w-20 h-24 bg-secondary overflow-hidden rounded-sm flex-shrink-0">
                  {img && <img src={img.url} alt={img.altText ?? item.product.node.title} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium leading-tight">{item.product.node.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.selectedOptions.map((o) => o.value).join(' / ')}</p>
                  <p className="text-sm font-medium mt-1">{formatPrice(item.price.amount, item.price.currencyCode)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}><Minus className="h-3 w-3" /></Button>
                      <span className="w-6 text-center text-xs">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}><Plus className="h-3 w-3" /></Button>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(item.variantId)}><Trash2 className="h-3 w-3" /></Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {items.length > 0 && (
          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between font-display text-xl">
              <span>Total</span><span>{formatPrice(total, currency)}</span>
            </div>
            <Button onClick={checkout} disabled={isLoading || isSyncing} className="w-full bg-[var(--ink)] hover:bg-[var(--deep)] text-primary-foreground rounded-none h-12 tracking-widest text-xs uppercase">
              {(isLoading || isSyncing) ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Secure Checkout'}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
