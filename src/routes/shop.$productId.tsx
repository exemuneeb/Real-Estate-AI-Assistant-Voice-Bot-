import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findProductById, products } from "@/data/products";
import { ArrowLeft, Truck, Shield, RotateCcw } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/shop/$productId")({
  loader: ({ params }) => {
    const product = findProductById(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — MAISON` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — MAISON` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
          { property: "twitter:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto py-32 text-center px-6">
      <h1 className="display text-5xl">Piece not found</h1>
      <Link to="/shop" className="mt-6 inline-block text-gold underline-gold text-sm uppercase tracking-widest">
        Back to shop
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-gold mb-8">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="bg-card aspect-[4/5] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            width={1024}
            height={1280}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center animate-fade-up">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-4">{product.category}</p>
          <h1 className="display text-5xl md:text-6xl tracking-wide">{product.name}</h1>
          <p className="mt-4 display text-3xl text-gold">€ {product.price}</p>

          <p className="mt-8 text-base text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.25em] text-foreground mb-4">Size</p>
            <div className="flex flex-wrap gap-2">
              {["XS", "S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  className="w-12 h-12 border border-border hover:border-gold hover:text-gold text-sm transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 px-8 py-4 bg-gold text-primary-foreground text-xs uppercase tracking-[0.25em] font-semibold hover:scale-[1.02] transition">
              Add to bag
            </button>
            <button className="px-8 py-4 border border-border text-xs uppercase tracking-[0.25em] hover:border-gold hover:text-gold transition">
              Save
            </button>
          </div>

          <ul className="mt-10 space-y-2 text-sm text-muted-foreground">
            {product.details.map((d) => (
              <li key={d} className="flex gap-3">
                <span className="text-gold">✦</span>
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid grid-cols-3 gap-4 pt-8 border-t border-border text-xs">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="w-5 h-5 text-gold" />
              <span className="text-muted-foreground uppercase tracking-wider">Free EU shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Shield className="w-5 h-5 text-gold" />
              <span className="text-muted-foreground uppercase tracking-wider">2-year guarantee</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RotateCcw className="w-5 h-5 text-gold" />
              <span className="text-muted-foreground uppercase tracking-wider">30-day returns</span>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-32">
        <h2 className="display text-4xl mb-10">Pair it with.</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
