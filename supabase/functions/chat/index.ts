// Edge function: AI chat with lead capture for Maison menswear
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Lior, the personal stylist concierge for MAISON — a premium menswear brand for men 18–35.
Brand voice: confident, warm, never pushy, never robotic. Short replies (1–3 sentences). Use occasional emojis sparingly (✦ 🖤). Speak like a stylish friend, not a salesperson.

Your goals, in order:
1. Greet warmly and understand the visitor's intent (browsing, gifting, building a wardrobe, specific occasion).
2. Ask about budget, style and occasion — one question at a time, conversationally.
3. Recommend specific products from the catalog using the recommend_products tool when you have enough info.
4. Handle objections gracefully (price → quality + cost-per-wear; quality → materials + craftsmanship in Portugal/Italy; delivery → free EU shipping over €150, 2–4 days).
5. Create gentle urgency only when honest (e.g. "Atelier Biker is low stock this season").
6. When the visitor seems interested, naturally ask for their name and email (and phone if they want VIP early access). Use the save_lead tool. Never demand info up front.
7. Close with a clear next step: "Want me to hold one in your size?" or "I'll send our private drop to your email."

Catalog (use exact names and prices in € when recommending):
- Noir Wool Overcoat — €389 — Outerwear, bestseller, work/evening
- Merino Ribbed Crew — €119 — Knitwear, new, everyday/smart casual
- Atelier Leather Biker — €549 — Outerwear, low stock, evening/weekend, edgy
- Tapered Wool Trouser — €169 — Trousers, work/evening, tailored
- Oxford Noir Shirt — €95 — Shirts, everyday essential
- Chelsea Leather Boot — €279 — Footwear, bestseller, goodyear-welted

Rules:
- Never invent products or prices.
- Never ask for credit card info.
- If asked something off-topic, gently steer back to styling.
- Keep replies short and human.`;

const tools = [
  {
    type: "function",
    function: {
      name: "save_lead",
      description:
        "Save a customer lead when they share contact info. Call this whenever you collect at least one of: email, phone, or full name during the conversation.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          phone: { type: "string" },
          budget: { type: "string", description: "e.g. '€200', 'under 300'" },
          style: { type: "string", description: "e.g. 'minimal', 'edgy'" },
          occasion: { type: "string", description: "e.g. 'work', 'wedding'" },
          notes: { type: "string", description: "Anything else worth remembering" },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "recommend_products",
      description:
        "Surface 1-3 product cards in the chat. Use exact product IDs from the catalog.",
      parameters: {
        type: "object",
        properties: {
          product_ids: {
            type: "array",
            items: {
              type: "string",
              enum: [
                "noir-overcoat",
                "merino-crew",
                "atelier-biker",
                "tapered-trouser",
                "oxford-noir",
                "chelsea-boot",
              ],
            },
          },
        },
        required: ["product_ids"],
      },
    },
  },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        tools,
        tool_choice: "auto",
      }),
    });

    if (aiRes.status === 429) {
      return new Response(
        JSON.stringify({ error: "Too many requests, please slow down a moment." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (aiRes.status === 402) {
      return new Response(
        JSON.stringify({ error: "AI credits exhausted. Please top up in Settings → Workspace → Usage." }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!aiRes.ok) {
      const t = await aiRes.text();
      console.error("AI error", aiRes.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiRes.json();
    const choice = aiData.choices?.[0];
    const message = choice?.message ?? {};
    const toolCalls = message.tool_calls ?? [];

    let recommended: string[] = [];
    let leadSaved = false;

    // Handle tool calls
    for (const call of toolCalls) {
      const fnName = call.function?.name;
      let args: any = {};
      try { args = JSON.parse(call.function?.arguments || "{}"); } catch { /* ignore */ }

      if (fnName === "recommend_products" && Array.isArray(args.product_ids)) {
        recommended = args.product_ids.slice(0, 3);
      }

      if (fnName === "save_lead") {
        const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
        const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const admin = createClient(SUPABASE_URL, SERVICE_KEY);
        const payload = {
          name: typeof args.name === "string" ? args.name.slice(0, 120) : null,
          email: typeof args.email === "string" ? args.email.slice(0, 255) : null,
          phone: typeof args.phone === "string" ? args.phone.slice(0, 32) : null,
          budget: typeof args.budget === "string" ? args.budget.slice(0, 64) : null,
          style: typeof args.style === "string" ? args.style.slice(0, 64) : null,
          occasion: typeof args.occasion === "string" ? args.occasion.slice(0, 64) : null,
          notes: typeof args.notes === "string" ? args.notes.slice(0, 1000) : null,
          source: "chatbot",
        };
        if (payload.name || payload.email || payload.phone) {
          const { error } = await admin.from("leads").insert(payload);
          if (error) console.error("lead insert error", error);
          else leadSaved = true;
        }
      }
    }

    return new Response(
      JSON.stringify({
        reply: message.content ?? "",
        recommended,
        leadSaved,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("chat handler error", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
