import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

const CATEGORIES = ["All", "Outerwear", "Knitwear", "Shirts", "Trousers", "Footwear"] as const;

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — MAISON Menswear" },
      { name: "description", content: "Browse the MAISON collection: outerwear, knitwear, shirts, trousers, and footwear." },
      { property: "og:title", content: "Shop — MAISON" },
      { property: "og:description", content: "Premium menswear, every piece built to last." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [cat, setCat] = useState<typeof CATEGORIES[number]>("All");
  const filtered = useMemo(
    () => (cat === "All" ? products : products.filter((p) => p.category === cat)),
    [cat],
  );

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <div className="border-b border-border pb-10 mb-10">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-4">The Collection</p>
        <h1 className="display text-6xl md:text-7xl tracking-wide">Shop all.</h1>
      </div>

      <div className="flex flex-wrap gap-2 md:gap-4 mb-12">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`text-xs uppercase tracking-[0.25em] px-4 py-2 border transition ${
              cat === c
                ? "border-gold text-gold"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
