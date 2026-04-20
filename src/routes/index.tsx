import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAISON — Modern Menswear, Crafted in Stockholm" },
      { name: "description", content: "Timeless silhouettes for the modern man. Italian wool, full-grain leather, and a lifetime of wear." },
      { property: "og:title", content: "MAISON — Modern Menswear" },
      { property: "og:description", content: "Premium menswear, made with intention." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = products.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[88vh] grid md:grid-cols-2 overflow-hidden">
        <div className="flex items-center px-6 lg:px-16 py-20 order-2 md:order-1 animate-fade-up">
          <div className="max-w-md">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-6">
              Autumn / Winter Collection
            </p>
            <h1 className="display text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-wide">
              Quiet<br />
              <span className="text-gold italic font-light">power.</span><br />
              Worn well.
            </h1>
            <p className="mt-8 text-base text-muted-foreground leading-relaxed">
              Pieces designed once and built to outlast trends.
              Italian wool, full-grain leather, and silhouettes that age into something better.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gold text-primary-foreground text-xs uppercase tracking-[0.25em] font-semibold hover:scale-105 transition"
              >
                Shop the collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 border border-border text-xs uppercase tracking-[0.25em] hover:border-gold hover:text-gold transition"
              >
                Our story
              </Link>
            </div>
          </div>
        </div>
        <div className="relative order-1 md:order-2 min-h-[60vh] md:min-h-full">
          <img
            src={hero}
            alt="Man in MAISON wool overcoat"
            width={1080}
            height={1920}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent md:from-background/60" />
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-border/60 py-6 overflow-hidden bg-card/30">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex items-center gap-16 px-8 display text-2xl tracking-[0.3em] text-muted-foreground">
              <span>FREE EU SHIPPING OVER €150</span>
              <span className="text-gold">✦</span>
              <span>MADE IN PORTUGAL & ITALY</span>
              <span className="text-gold">✦</span>
              <span>2-YEAR CRAFTSMANSHIP GUARANTEE</span>
              <span className="text-gold">✦</span>
              <span>30-DAY RETURNS</span>
              <span className="text-gold">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-4">Featured</p>
            <h2 className="display text-5xl md:text-6xl tracking-wide">The essentials.</h2>
          </div>
          <Link to="/shop" className="hidden md:inline-flex text-xs uppercase tracking-[0.25em] underline-gold">
            View all →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* CTA / CONCIERGE */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="bg-card border border-border p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 gradient-gold opacity-[0.04]" />
          <div className="relative">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-4">Personal Stylist</p>
            <h2 className="display text-4xl md:text-6xl max-w-2xl mx-auto leading-tight">
              Not sure where to start?<br />
              <span className="text-gold italic font-light">Ask Lior.</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-lg mx-auto">
              Our AI stylist concierge will build you a capsule wardrobe in two minutes —
              based on your budget, your style, your life.
            </p>
            <p className="mt-10 text-xs uppercase tracking-[0.3em] text-gold animate-pulse">
              ↘ Tap the gold button, bottom right
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
