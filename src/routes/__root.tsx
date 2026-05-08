import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { useCartSync } from "@/hooks/useCartSync";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl">404</h1>
        <p className="mt-3 text-sm text-muted-foreground tracking-wide">This page has wandered from the atelier.</p>
        <Link to="/" className="mt-6 inline-block text-xs uppercase tracking-[0.2em] underline underline-offset-4">Return to Maison</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">Something interrupted us</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 px-6 py-2 bg-[var(--ink)] text-primary-foreground text-xs uppercase tracking-widest"
        >Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Danasef — Luxury Modest Wear | Niqabs, Abayas & Hijabs Pakistan" },
      { name: "description", content: "Danasef crafts luxury modest fashion for the modern Muslim woman. Premium niqabs, abayas, hijabs and fragrances. Shipped across Pakistan." },
      { name: "theme-color", content: "#1B262C" },
      { property: "og:site_name", content: "Danasef" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Danasef — Luxury Modest Wear | Niqabs, Abayas & Hijabs Pakistan" },
      { property: "og:description", content: "Danasef crafts luxury modest fashion for the modern Muslim woman. Premium niqabs, abayas, hijabs and fragrances. Shipped across Pakistan." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Danasef — Luxury Modest Wear | Niqabs, Abayas & Hijabs Pakistan" },
      { name: "twitter:description", content: "Danasef crafts luxury modest fashion for the modern Muslim woman. Premium niqabs, abayas, hijabs and fragrances. Shipped across Pakistan." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/0b9628c2-bd65-44ec-a1b4-4a1b80352ea4" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/0b9628c2-bd65-44ec-a1b4-4a1b80352ea4" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell />
    </QueryClientProvider>
  );
}

function AppShell() {
  useCartSync();
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1"><Outlet /></main>
      <footer className="border-t border-border/60 mt-24">
        <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-display text-xl tracking-[0.3em] uppercase">Danasef</h3>
            <p className="mt-3 text-muted-foreground text-xs leading-relaxed">Luxury modest wear, crafted in Pakistan for women who carry their faith with grace.</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-3">Maison</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link to="/collection">Collection</Link></li>
              <li><Link to="/about">Heritage</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-3">Care</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>Shipping across Pakistan</li>
              <li>WhatsApp support</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/60 py-4 text-center text-[10px] tracking-[0.2em] uppercase text-muted-foreground">© {new Date().getFullYear()} Danasef Atelier</div>
      </footer>
    </div>
  );
}
