import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="display text-2xl tracking-[0.25em] text-foreground">
          MA<span className="text-gold">I</span>SON
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em] font-medium">
          <Link to="/" activeProps={{ className: "text-gold" }} className="underline-gold">Home</Link>
          <Link to="/shop" activeProps={{ className: "text-gold" }} className="underline-gold">Shop</Link>
          <Link to="/about" activeProps={{ className: "text-gold" }} className="underline-gold">About</Link>
          <Link to="/contact" activeProps={{ className: "text-gold" }} className="underline-gold">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/shop" className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/80 hover:text-gold transition">
            <ShoppingBag className="w-4 h-4" /> Bag
          </Link>
          <button
            className="md:hidden text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background animate-fade-in">
          <nav className="flex flex-col px-6 py-6 gap-5 text-sm uppercase tracking-[0.2em]">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/shop" onClick={() => setOpen(false)}>Shop</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
