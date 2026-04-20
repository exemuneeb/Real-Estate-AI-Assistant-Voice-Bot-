import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="display text-3xl tracking-[0.25em]">MA<span className="text-gold">I</span>SON</div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            Modern menswear, made with intention. Timeless silhouettes built from
            the world's finest materials.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-gold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" className="hover:text-foreground">All</Link></li>
            <li><Link to="/shop" className="hover:text-foreground">Outerwear</Link></li>
            <li><Link to="/shop" className="hover:text-foreground">Knitwear</Link></li>
            <li><Link to="/shop" className="hover:text-foreground">Footwear</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-gold mb-4">Maison</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><a href="#" className="hover:text-foreground">Shipping</a></li>
            <li><a href="#" className="hover:text-foreground">Returns</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground tracking-widest">
        © {new Date().getFullYear()} MAISON — CRAFTED IN STOCKHOLM
      </div>
    </footer>
  );
}
