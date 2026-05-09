import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Sprout } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Verdana — Sign in" }] }),
});

function LoginPage() {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate({ to: "/dashboard" });
  }, [loading, session, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80" alt="Modern terrace garden" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />
        <div className="relative p-10 flex flex-col h-full">
          <div className="flex items-center gap-3 text-white">
            <div className="size-9 rounded-xl bg-white/15 backdrop-blur grid place-items-center"><Sprout className="size-5" /></div>
            <span className="font-serif text-xl">Verdana</span>
          </div>
          <div className="mt-auto max-w-lg text-white">
            <h1 className="font-serif text-5xl leading-[1.05]">Design living spaces that breathe.</h1>
            <p className="mt-4 text-white/80">The AI studio for balconies, terraces, gardens & landscapes — built for design teams who care about the small things.</p>
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

          <form className="mt-8 space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="text-xs tracking-widest text-muted-foreground uppercase">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs tracking-widest text-muted-foreground uppercase">Password</label>
              </div>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button type="submit" disabled={busy} className="flex items-center justify-center gap-2 w-full bg-leaf text-leaf-foreground py-3 rounded-full text-sm font-medium hover:opacity-90 transition disabled:opacity-50">
              {busy ? "Signing in…" : <>Enter studio <ArrowRight className="size-4" /></>}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            New to Verdana? <Link to="/signup" className="text-foreground underline underline-offset-4">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
