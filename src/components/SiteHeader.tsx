import { Link } from '@tanstack/react-router';
import { CartDrawer } from './CartDrawer';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur-md bg-background/85">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Maison</Link>
          <Link to="/collection" className="hover:text-foreground transition-colors">Collection</Link>
          <Link to="/about" className="hover:text-foreground transition-colors">Heritage</Link>
        </nav>
        <Link to="/" className="font-display text-2xl tracking-[0.3em] uppercase">Danasef</Link>
        <div className="flex items-center gap-2">
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
