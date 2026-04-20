import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import p5 from "@/assets/product-5.jpg";
import p6 from "@/assets/product-6.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: "Outerwear" | "Knitwear" | "Shirts" | "Trousers" | "Footwear";
  image: string;
  tag?: "New" | "Bestseller" | "Low stock";
  description: string;
  details: string[];
  occasion: string[];
  styleTags: string[];
};

export const products: Product[] = [
  {
    id: "noir-overcoat",
    name: "Noir Wool Overcoat",
    price: 389,
    category: "Outerwear",
    image: p1,
    tag: "Bestseller",
    description:
      "An uncompromising silhouette in heavyweight Italian wool. Built for cold mornings and quiet entrances.",
    details: ["100% virgin wool", "Single-breasted, two-button", "Horn buttons", "Made in Portugal"],
    occasion: ["work", "evening", "smart casual"],
    styleTags: ["minimal", "tailored", "premium"],
  },
  {
    id: "merino-crew",
    name: "Merino Ribbed Crew",
    price: 119,
    category: "Knitwear",
    image: p2,
    tag: "New",
    description:
      "Fine-gauge ribbed merino with a sculpted body. Sits clean under a coat, holds shape on its own.",
    details: ["100% extra-fine merino", "Ribbed body", "Reinforced shoulders"],
    occasion: ["everyday", "smart casual"],
    styleTags: ["minimal", "layering"],
  },
  {
    id: "atelier-biker",
    name: "Atelier Leather Biker",
    price: 549,
    category: "Outerwear",
    image: p3,
    tag: "Low stock",
    description:
      "Hand-finished lambskin with brass hardware. The jacket your wardrobe was missing.",
    details: ["Lambskin leather", "Brass YKK hardware", "Quilted lining"],
    occasion: ["evening", "weekend"],
    styleTags: ["edgy", "statement"],
  },
  {
    id: "tapered-trouser",
    name: "Tapered Wool Trouser",
    price: 169,
    category: "Trousers",
    image: p4,
    description:
      "A tapered leg with a clean break. Sharp enough for the office, soft enough to live in.",
    details: ["Italian wool blend", "Tapered fit", "Side adjusters"],
    occasion: ["work", "evening"],
    styleTags: ["tailored", "minimal"],
  },
  {
    id: "oxford-noir",
    name: "Oxford Noir Shirt",
    price: 95,
    category: "Shirts",
    image: p5,
    description:
      "Garment-washed oxford cotton with a soft button-down collar. Quietly the best shirt you'll own.",
    details: ["Long-staple cotton", "Mother-of-pearl buttons", "Garment washed"],
    occasion: ["everyday", "work", "smart casual"],
    styleTags: ["minimal", "essential"],
  },
  {
    id: "chelsea-boot",
    name: "Chelsea Leather Boot",
    price: 279,
    category: "Footwear",
    image: p6,
    tag: "Bestseller",
    description:
      "Goodyear-welted, full-grain leather, gold-stitched welt. Ages into something better than new.",
    details: ["Full-grain leather", "Goodyear welt", "Leather lining"],
    occasion: ["everyday", "evening", "weekend"],
    styleTags: ["classic", "premium"],
  },
];

export function findProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function recommendProducts(opts: {
  budget?: number;
  occasion?: string;
  style?: string;
}): Product[] {
  let pool = [...products];
  if (opts.occasion) {
    const occ = opts.occasion.toLowerCase();
    pool = pool.filter((p) => p.occasion.some((o) => occ.includes(o) || o.includes(occ)));
  }
  if (opts.style) {
    const s = opts.style.toLowerCase();
    pool = pool.filter((p) => p.styleTags.some((t) => s.includes(t) || t.includes(s)));
  }
  if (opts.budget) {
    pool = pool.filter((p) => p.price <= opts.budget!);
  }
  if (pool.length === 0) pool = products;
  return pool.slice(0, 3);
}
