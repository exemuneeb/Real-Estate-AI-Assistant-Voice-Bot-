import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
<<<<<<< HEAD
import { z } from "zod";
import { MessageCircle, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});
=======
>>>>>>> 1c6e130a11c2642a1fdda806922bcd446f8f4eb2

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
<<<<<<< HEAD
      { title: "Contact — MAISON" },
      { name: "description", content: "Get in touch with the MAISON team. Personal styling, press, partnerships." },
      { property: "og:title", content: "Contact MAISON" },
      { property: "og:description", content: "Reach the MAISON team — styling, press, partnerships." },
=======
      { title: "Contact — Maison Estates" },
      {
        name: "description",
        content: "Speak to a senior agent at Maison Estates, or schedule a private viewing.",
      },
      { property: "og:title", content: "Contact — Maison Estates" },
      { property: "og:description", content: "Speak to a senior agent or schedule a viewing." },
>>>>>>> 1c6e130a11c2642a1fdda806922bcd446f8f4eb2
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
<<<<<<< HEAD
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setStatus("loading");
    const { error: dbErr } = await supabase.from("leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      notes: parsed.data.message,
      source: "chatbot", // RLS allows
    });
    if (dbErr) {
      setStatus("error");
      setError("Couldn't send. Try again in a moment.");
      return;
    }
    setStatus("success");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-20">
      <div className="text-center mb-16">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-4">Reach Us</p>
        <h1 className="display text-6xl md:text-7xl tracking-wide">Let's talk.</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div>
            <h2 className="display text-2xl mb-3">Personal styling</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Talk to Lior, our AI concierge — bottom-right, available 24/7.
              For human styling, write to <span className="text-gold">style@maison.co</span>.
            </p>
          </div>
          <div>
            <h2 className="display text-2xl mb-3">Press & partnerships</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              <span className="text-gold">press@maison.co</span><br />
              <span className="text-gold">studio@maison.co</span>
            </p>
          </div>
          <div>
            <h2 className="display text-2xl mb-3">Atelier</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Götgatan 24<br />116 22 Stockholm, Sweden
            </p>
          </div>

          <div className="pt-6 border-t border-border">
            <div className="flex items-center gap-3 text-gold">
              <MessageCircle className="w-5 h-5" />
              <p className="text-xs uppercase tracking-[0.25em]">Fastest reply via Lior, our AI stylist →</p>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="bg-card border border-border p-8 space-y-5">
          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={120}
              className="mt-2 w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              maxLength={255}
              className="mt-2 w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              maxLength={1000}
              className="mt-2 w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition resize-none"
            />
          </div>

          {error && <p className="text-destructive text-xs">{error}</p>}
          {status === "success" && (
            <p className="text-gold text-xs">✦ Message received. We'll be in touch within 24h.</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full inline-flex items-center justify-center gap-2 bg-gold text-primary-foreground py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:scale-[1.02] transition disabled:opacity-50"
          >
            {status === "loading" ? "Sending…" : (
              <>Send message <Send className="w-4 h-4" /></>
            )}
          </button>
        </form>
=======
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Contact</p>
        <h1 className="mt-3 font-serif text-5xl leading-tight md:text-6xl">Let's talk.</h1>
        <p className="mt-6 max-w-md text-muted-foreground">
          Tell us a little about what you're looking for and a senior agent will reach out within
          one business day. Prefer to talk now? Tap the microphone — Aria is on duty.
        </p>
        <div className="mt-12 space-y-6 text-sm">
          <Detail label="Email" value="concierge@maisonestates.com" />
          <Detail label="Phone" value="+33 1 84 88 19 00" />
          <Detail label="Office" value="Boulevard Haussmann 142, 75008 Paris" />
        </div>
      </div>

      <div className="rounded-2xl bg-secondary/40 p-8 md:p-10">
        {submitted ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="font-serif text-3xl">Thank you.</div>
            <p className="mt-3 text-sm text-muted-foreground">
              An agent will reach out within one business day.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-5"
          >
            <FormField label="Your name">
              <input required className="w-full rounded-lg bg-background px-4 py-3 text-sm outline-none" />
            </FormField>
            <FormField label="Email">
              <input required type="email" className="w-full rounded-lg bg-background px-4 py-3 text-sm outline-none" />
            </FormField>
            <FormField label="Phone (optional)">
              <input type="tel" className="w-full rounded-lg bg-background px-4 py-3 text-sm outline-none" />
            </FormField>
            <FormField label="What are you looking for?">
              <textarea
                required
                rows={4}
                className="w-full resize-none rounded-lg bg-background px-4 py-3 text-sm outline-none"
                placeholder="A villa in Tuscany, a penthouse in NYC, somewhere quiet…"
              />
            </FormField>
            <button
              type="submit"
              className="w-full rounded-full bg-primary px-6 py-3 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
            >
              Request a callback
            </button>
          </form>
        )}
>>>>>>> 1c6e130a11c2642a1fdda806922bcd446f8f4eb2
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 text-foreground">{value}</div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
>>>>>>> 1c6e130a11c2642a1fdda806922bcd446f8f4eb2
