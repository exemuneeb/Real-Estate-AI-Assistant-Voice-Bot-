import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/shop/$productId"
      params={{ productId: product.id }}
      className="group block"
    >
      <div className="relative overflow-hidden bg-card aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1280}
          className="w-full h-full object-cover product-hover"
        />
        {product.tag && (
          <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.25em] px-3 py-1 bg-background/80 backdrop-blur text-gold border border-gold/40">
            {product.tag}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-background via-background/90 to-transparent p-5">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-gold border-b border-gold pb-1">
            View piece
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {product.category}
          </p>
          <h3 className="mt-1 display text-xl tracking-wider">{product.name}</h3>
        </div>
        <p className="text-sm text-foreground font-medium whitespace-nowrap">
          € {product.price}
        </p>
      </div>
    </Link>
  );
}
