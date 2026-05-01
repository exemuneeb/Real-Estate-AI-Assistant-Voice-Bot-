import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
<<<<<<< HEAD
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ChatbotWidget } from "@/components/chat/ChatbotWidget";
=======
import { Header, Footer } from "@/components/Layout";
import { VoiceAssistant } from "@/components/VoiceAssistant";
>>>>>>> 1c6e130a11c2642a1fdda806922bcd446f8f4eb2

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
<<<<<<< HEAD
        <h1 className="display text-8xl text-gold">404</h1>
        <h2 className="mt-4 display text-2xl tracking-widest">PAGE NOT FOUND</h2>
=======
        <h1 className="font-serif text-7xl text-foreground">404</h1>
        <h2 className="mt-4 font-serif text-2xl">Page not found</h2>
>>>>>>> 1c6e130a11c2642a1fdda806922bcd446f8f4eb2
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for has moved or no longer exists.
        </p>
<<<<<<< HEAD
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gold text-primary-foreground text-xs uppercase tracking-[0.25em] font-semibold hover:scale-105 transition"
          >
            Return Home
          </Link>
        </div>
=======
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-primary-foreground"
        >
          Go home
        </Link>
>>>>>>> 1c6e130a11c2642a1fdda806922bcd446f8f4eb2
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
<<<<<<< HEAD
      { title: "MAISON — Modern Menswear" },
      { name: "description", content: "Premium menswear, made with intention. Outerwear, knitwear, and footwear designed for the modern man." },
=======
      { title: "Maison Estates — Curated luxury homes worldwide" },
      {
        name: "description",
        content:
          "Discover handpicked luxury properties in the world's most desirable cities. Speak with Aria, our AI concierge, anytime.",
      },
>>>>>>> 1c6e130a11c2642a1fdda806922bcd446f8f4eb2
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
<<<<<<< HEAD
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <ChatbotWidget />
=======
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <VoiceAssistant />
>>>>>>> 1c6e130a11c2642a1fdda806922bcd446f8f4eb2
    </div>
  );
}
