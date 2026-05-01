<<<<<<< HEAD
import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { ArrowRight } from "lucide-react";
=======
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "@/assets/hero-villa.jpg";
import { properties } from "@/data/properties";
import { PropertyCard } from "@/components/PropertyCard";
>>>>>>> 1c6e130a11c2642a1fdda806922bcd446f8f4eb2

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
<<<<<<< HEAD
      { title: "MAISON — Modern Menswear, Crafted in Stockholm" },
      { name: "description", content: "Timeless silhouettes for the modern man. Italian wool, full-grain leather, and a lifetime of wear." },
      { property: "og:title", content: "MAISON — Modern Menswear" },
      { property: "og:description", content: "Premium menswear, made with intention." },
=======
      { title: "Maison Estates — Curated luxury homes worldwide" },
      {
        name: "description",
        content:
          "From city penthouses to beachfront villas, discover homes worth living in. Talk to Aria, your AI concierge.",
      },
      { property: "og:title", content: "Maison Estates — Curated luxury homes" },
      { property: "og:description", content: "Speak with Aria, our AI concierge, and find your next home." },
>>>>>>> 1c6e130a11c2642a1fdda806922bcd446f8f4eb2
    ],
  }),
  component: HomePage,
});

function HomePage() {
<<<<<<< HEAD
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
=======
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const featured = properties.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section className="relative">
        <div className="relative h-[88vh] min-h-[600px] w-full overflow-hidden">
          <img
            src={heroImg}
            alt="Modern villa at golden hour with infinity pool"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/0 to-background/80" />
          <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-32">
            <div className="max-w-2xl animate-fade-up">
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/70">
                Est. 1998 — Worldwide
              </p>
              <h1 className="mt-5 font-serif text-5xl leading-[1.05] text-foreground md:text-7xl">
                Homes that feel <em className="text-primary">like a beginning.</em>
              </h1>
              <p className="mt-6 max-w-xl text-base text-foreground/80 md:text-lg">
                Quietly curated properties in extraordinary places — from Dubai dunes to Tuscan
                hills. Speak with Aria, our voice concierge, anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative -mt-20 px-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const params = new URLSearchParams();
              if (location) params.set("loc", location);
              if (type) params.set("type", type);
              if (maxPrice) params.set("max", maxPrice);
              void navigate({ to: "/listings", search: Object.fromEntries(params) as never });
            }}
            className="mx-auto grid max-w-5xl grid-cols-1 gap-3 rounded-2xl bg-background p-3 shadow-elegant md:grid-cols-[1.4fr_1fr_1fr_auto]"
          >
            <Field label="Location">
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Dubai, Tuscany, New York…"
                className="w-full bg-transparent text-sm outline-none"
              />
            </Field>
            <Field label="Property type">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
              >
                <option value="">Any</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Penthouse</option>
                <option>Townhouse</option>
                <option>Chalet</option>
              </select>
            </Field>
            <Field label="Max price">
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
              >
                <option value="">Any</option>
                <option value="500000">$500K</option>
                <option value="1000000">$1M</option>
                <option value="2500000">$2.5M</option>
                <option value="5000000">$5M</option>
                <option value="10000000">$10M+</option>
              </select>
            </Field>
            <button
              type="submit"
              className="rounded-xl bg-primary px-6 text-sm font-medium uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
            >
              Search
            </button>
          </form>
>>>>>>> 1c6e130a11c2642a1fdda806922bcd446f8f4eb2
        </div>
      </section>

      {/* FEATURED */}
<<<<<<< HEAD
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
=======
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Featured</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">This week's favourites</h2>
          </div>
          <Link to="/listings" className="hidden text-sm text-primary underline-offset-4 hover:underline md:inline-block">
            View all listings →
          </Link>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
>>>>>>> 1c6e130a11c2642a1fdda806922bcd446f8f4eb2
          ))}
        </div>
      </section>

<<<<<<< HEAD
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
=======
      {/* AI CONCIERGE BANNER */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-warm p-12 md:p-20">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Voice concierge</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
                Just ask Aria. <em>Out loud.</em>
              </h2>
              <p className="mt-5 max-w-md text-muted-foreground">
                "Show me a beachfront villa under five million." Aria listens, answers, and walks
                you through every property — like a thoughtful agent who never sleeps.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-foreground/80">
                <li>· Natural voice conversations in any browser</li>
                <li>· Remembers context across the whole chat</li>
                <li>· Books viewings and connects you to a human agent</li>
              </ul>
            </div>
            <div className="relative flex justify-center">
              <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elegant">
                <span className="absolute inset-0 rounded-full bg-primary opacity-20 animate-pulse-ring" />
                <span className="absolute inset-4 rounded-full bg-primary opacity-30 animate-pulse-ring" style={{ animationDelay: "0.4s" }} />
                <svg className="relative h-20 w-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="9" y="3" width="6" height="12" rx="3" />
                  <path d="M5 11a7 7 0 0 0 14 0" strokeLinecap="round" />
                  <path d="M12 18v3" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-32 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Promise</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
          A home is not a transaction. It's a chapter — and we treat it that way.
        </h2>
        <Link
          to="/contact"
          className="mt-10 inline-block rounded-full bg-primary px-8 py-3 text-xs font-medium uppercase tracking-wider text-primary-foreground"
        >
          Speak with an agent
        </Link>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 rounded-xl bg-secondary/40 px-4 py-3">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
>>>>>>> 1c6e130a11c2642a1fdda806922bcd446f8f4eb2
