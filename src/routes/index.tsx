import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sprout } from "lucide-react";

export const Route = createFileRoute("/")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Verdana — Sign in" }] }),
});

function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
          alt="Modern terrace garden"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />
        <div className="relative p-10 flex flex-col h-full">
          <div className="flex items-center gap-3 text-white">
            <div className="size-9 rounded-xl bg-white/15 backdrop-blur grid place-items-center">
              <Sprout className="size-5" />
            </div>
            <span className="font-serif text-xl">Verdana</span>
          </div>
          <div className="mt-auto max-w-lg text-white">
            <h1 className="font-serif text-5xl leading-[1.05]">Design living spaces that breathe.</h1>
            <p className="mt-4 text-white/80">
              The AI studio for balconies, terraces, gardens & landscapes — built for design teams who care about the small things.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-10 bg-background">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="size-9 rounded-xl bg-leaf text-leaf-foreground grid place-items-center"><Sprout className="size-5" /></div>
            <span className="font-serif text-xl">Verdana</span>
          </div>
          <h2 className="font-serif text-3xl">Welcome back</h2>
          <p className="text-muted-foreground mt-2 text-sm">Sign in to your studio workspace.</p>

          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-xs tracking-widest text-muted-foreground uppercase">Email</label>
              <input defaultValue="designer@verdana.studio" className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs tracking-widest text-muted-foreground uppercase">Password</label>
                <a className="text-xs text-muted-foreground hover:text-foreground">Forgot?</a>
              </div>
              <input type="password" defaultValue="verdana2026" className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <Link to="/dashboard" className="flex items-center justify-center gap-2 w-full bg-leaf text-leaf-foreground py-3 rounded-full text-sm font-medium hover:opacity-90 transition">
              Enter studio <ArrowRight className="size-4" />
            </Link>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            New to Verdana? <Link to="/dashboard" className="text-foreground underline underline-offset-4">Request access</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
