import { createFileRoute } from "@tanstack/react-router";
<<<<<<< HEAD
import about from "@/assets/about.jpg";
=======
>>>>>>> 1c6e130a11c2642a1fdda806922bcd446f8f4eb2

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
<<<<<<< HEAD
      { title: "About — MAISON" },
      { name: "description", content: "Founded in Stockholm in 2019, MAISON is a modern menswear house built around one idea: own less, wear it longer." },
      { property: "og:title", content: "About MAISON" },
      { property: "og:description", content: "A modern menswear house built around quiet quality." },
      { property: "og:image", content: about },
=======
      { title: "About — Maison Estates" },
      {
        name: "description",
        content: "Twenty-five years of placing people in homes they love. Meet the agency behind Maison Estates.",
      },
      { property: "og:title", content: "About — Maison Estates" },
      { property: "og:description", content: "Twenty-five years of placing people in homes they love." },
>>>>>>> 1c6e130a11c2642a1fdda806922bcd446f8f4eb2
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
<<<<<<< HEAD
    <div>
      <section className="max-w-5xl mx-auto px-6 lg:px-10 py-24 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-6">Our Story</p>
        <h1 className="display text-6xl md:text-8xl tracking-wide leading-[0.95]">
          Own less.<br />
          <span className="text-gold italic font-light">Wear it longer.</span>
        </h1>
        <p className="mt-10 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          MAISON was founded in Stockholm in 2019 around a single, stubborn idea:
          a man's wardrobe should be small, considered, and quietly extraordinary.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10">
        <img src={about} alt="MAISON atelier" loading="lazy" width={1536} height={1024} className="w-full h-auto" />
      </section>

      <section className="max-w-5xl mx-auto px-6 lg:px-10 py-24 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="display text-4xl tracking-wide mb-6">The materials.</h2>
          <p className="text-muted-foreground leading-relaxed">
            We work directly with mills in Biella, Italy and ateliers in northern
            Portugal. Italian wools. Long-staple Egyptian cottons. Full-grain leathers
            from European tanneries certified for low environmental impact.
          </p>
        </div>
        <div>
          <h2 className="display text-4xl tracking-wide mb-6">The fits.</h2>
          <p className="text-muted-foreground leading-relaxed">
            Each silhouette is patterned over 20+ rounds of fittings on real bodies —
            not mannequins. The result is clothing that looks intentional standing still
            and lives easily when you move.
          </p>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["2019", "Founded"],
            ["6", "Pieces per drop"],
            ["100%", "European-made"],
            ["2yr", "Guarantee"],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="display text-5xl text-gold">{n}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </section>
=======
    <div className="mx-auto max-w-4xl px-6 py-24">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">About us</p>
      <h1 className="mt-3 font-serif text-5xl leading-tight md:text-7xl">
        We sell <em>fewer</em> homes — <br className="hidden md:inline" />
        and care more about each one.
      </h1>
      <div className="mt-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
        <p>
          Maison Estates was founded in Paris in 1998 with a simple idea: that buying a home should
          feel like an unhurried conversation, not a sales call. Twenty-five years later, that
          principle still guides every viewing, every contract, every key handed over.
        </p>
        <p>
          Our portfolio spans from quiet stone villas in the Tuscan hills to glass penthouses above
          Manhattan. What ties them together is a feeling — a sense that someone, somewhere, is
          about to begin a chapter here.
        </p>
        <p>
          In 2024, we introduced Aria, a voice concierge built into every page. She helps you
          search out loud, asks the right follow-up questions, and quietly hands you over to a
          human agent the moment you'd like one.
        </p>
      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-3">
        {[
          { n: "25+", l: "years in business" },
          { n: "12", l: "countries" },
          { n: "3,400+", l: "homes placed" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl bg-secondary/40 p-8 text-center">
            <div className="font-serif text-5xl text-primary">{s.n}</div>
            <div className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
>>>>>>> 1c6e130a11c2642a1fdda806922bcd446f8f4eb2
    </div>
  );
}
