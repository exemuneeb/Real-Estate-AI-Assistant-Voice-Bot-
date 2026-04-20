import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { findProductById } from "@/data/products";

type Msg = {
  role: "user" | "assistant";
  content: string;
  recommended?: string[];
};

const INITIAL: Msg = {
  role: "assistant",
  content:
    "Hey ✦ I'm Lior, your stylist at MAISON. Looking for something specific tonight, or just exploring?",
};

const QUICK = [
  "Build me a capsule wardrobe",
  "Something for a wedding",
  "Under €200",
];

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(true);
  const [messages, setMessages] = useState<Msg[]>([INITIAL]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadToast, setLeadToast] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: {
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        },
      });

      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);

      const reply = (data as any).reply || "Got it — tell me a bit more?";
      const recommended = (data as any).recommended as string[] | undefined;
      const leadSaved = (data as any).leadSaved as boolean | undefined;

      setMessages((m) => [...m, { role: "assistant", content: reply, recommended }]);
      if (leadSaved) {
        setLeadToast(true);
        setTimeout(() => setLeadToast(false), 3500);
      }
    } catch (e: any) {
      const msg = e?.message?.includes("402")
        ? "AI is paused — credits ran out. Please top up to keep chatting."
        : e?.message?.includes("429")
          ? "Quick breath — I'm getting a lot of messages. Try again in a moment."
          : "Something went sideways. Try again in a sec.";
      setMessages((m) => [...m, { role: "assistant", content: msg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open stylist chat"
        className={`fixed bottom-6 right-6 z-50 group flex items-center gap-3 pl-4 pr-5 py-3 rounded-full bg-gold text-primary-foreground gold-shadow transition-all duration-300 hover:scale-105 ${
          pulse && !open ? "animate-pulse" : ""
        }`}
      >
        {open ? <X className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
        <span className="text-xs uppercase tracking-[0.2em] font-semibold">
          {open ? "Close" : "Ask Lior"}
        </span>
      </button>

      {/* Lead saved toast */}
      {leadToast && (
        <div className="fixed bottom-24 right-6 z-50 bg-card border border-gold/40 px-4 py-3 rounded animate-fade-in text-sm text-gold">
          ✦ Saved. We'll be in touch.
        </div>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed inset-x-3 bottom-24 sm:inset-x-auto sm:right-6 sm:bottom-24 z-50 w-auto sm:w-[380px] max-h-[78vh] flex flex-col bg-card border border-border rounded-lg overflow-hidden shadow-2xl gold-shadow animate-fade-in">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-background">
            <div className="w-9 h-9 rounded-full gradient-gold flex items-center justify-center text-primary-foreground font-bold">
              L
            </div>
            <div className="flex-1">
              <p className="display text-lg leading-none">LIOR</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold">
                Stylist concierge · online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-background/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[85%] space-y-2">
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-gold text-primary-foreground rounded-br-sm"
                        : "bg-secondary text-foreground rounded-bl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                  {m.recommended && m.recommended.length > 0 && (
                    <div className="grid grid-cols-1 gap-2">
                      {m.recommended.map((id) => {
                        const p = findProductById(id);
                        if (!p) return null;
                        return (
                          <Link
                            key={id}
                            to="/shop/$productId"
                            params={{ productId: p.id }}
                            onClick={() => setOpen(false)}
                            className="flex gap-3 p-2 bg-card border border-border hover:border-gold transition rounded"
                          >
                            <img src={p.image} alt={p.name} className="w-14 h-16 object-cover" />
                            <div className="flex flex-col justify-center">
                              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                {p.category}
                              </p>
                              <p className="display text-base leading-tight">{p.name}</p>
                              <p className="text-xs text-gold">€ {p.price}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-secondary text-sm">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:120ms]" />
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:240ms]" />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick chips */}
          {messages.length === 1 && (
            <div className="px-4 pb-3 flex flex-wrap gap-2">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-[11px] uppercase tracking-wider px-3 py-1.5 border border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground transition rounded-full"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 px-3 py-3 border-t border-border bg-background"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about fit, style, sizing…"
              className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none placeholder:text-muted-foreground"
              maxLength={500}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gold text-primary-foreground disabled:opacity-40 hover:scale-105 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
