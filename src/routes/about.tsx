import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Heritage — The Danasef Story" },
      { name: "description", content: "The story of Danasef — a Pakistani atelier devoted to luxury modest fashion for the modern Muslim woman." },
      { property: "og:title", content: "Heritage — Danasef" },
      { property: "og:description", content: "The story behind the atelier." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Heritage</p>
      <h1 className="font-display text-5xl md:text-6xl mt-3 leading-tight">A modern atelier for an ancient grace.</h1>
      <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/80">
        <p>Danasef was founded on a single conviction: that modest wear should be uncompromising — in fabric, in fit, in feeling. We are a Pakistani house designing for women who refuse to choose between faith and form.</p>
        <p>From our atelier in Karachi, every niqab, abaya, and hijab is patterned, sewn, and finished by hands that have spent decades perfecting this craft. We source the finest jersey cottons, the softest Nida silks, the most breathable chiffons — and treat each as if it were heirloom.</p>
        <p>This is not fast fashion. This is the slow, considered work of dressing a woman in clothes that know who she is.</p>
      </div>
      <Link to="/collection" className="inline-block mt-12 px-8 py-4 bg-[var(--ink)] text-primary-foreground text-xs uppercase tracking-[0.2em]">Discover the Collection</Link>
    </article>
  );
}
