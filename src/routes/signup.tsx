import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Sprout } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({ meta: [{ title: "Verdana — Create account" }] }),
});

function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { full_name: fullName },
      },
    });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Account created. Welcome to Verdana.");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="relative hidden lg:block">
        <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80" alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent" />
        <div className="relative p-10 flex flex-col h-full text-white">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-white/15 backdrop-blur grid place-items-center"><Sprout className="size-5" /></div>
            <span className="font-serif text-xl">Verdana</span>
          </div>
          <div className="mt-auto max-w-lg">
            <h1 className="font-serif text-5xl leading-[1.05]">Join the studio.</h1>
            <p className="mt-4 text-white/80">Create projects, render concepts, and deliver quotations — all in one place.</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">
          <h2 className="font-serif text-3xl">Create your account</h2>
          <p className="text-muted-foreground mt-2 text-sm">Start designing in under a minute.</p>
          <form className="mt-8 space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="text-xs tracking-widest text-muted-foreground uppercase">Full name</label>
              <input required value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-xs tracking-widest text-muted-foreground uppercase">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-xs tracking-widest text-muted-foreground uppercase">Password</label>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button type="submit" disabled={busy} className="flex items-center justify-center gap-2 w-full bg-leaf text-leaf-foreground py-3 rounded-full text-sm font-medium hover:opacity-90 transition disabled:opacity-50">
              {busy ? "Creating…" : <>Create account <ArrowRight className="size-4" /></>}
            </button>
          </form>
          <p className="text-center text-xs text-muted-foreground mt-6">
            Already have an account? <Link to="/" className="text-foreground underline underline-offset-4">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
