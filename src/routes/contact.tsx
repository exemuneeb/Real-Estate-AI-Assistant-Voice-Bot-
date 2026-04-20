import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, MessageCircle, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MAISON" },
      { name: "description", content: "Get in touch with the MAISON team. Personal styling, press, partnerships." },
      { property: "og:title", content: "Contact MAISON" },
      { property: "og:description", content: "Reach the MAISON team — styling, press, partnerships." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
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
      </div>
    </div>
  );
}
