import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Upload, Sparkles, Image as ImageIcon, Video } from "lucide-react";

export const Route = createFileRoute("/projects/new")({
  component: NewProject,
  head: () => ({ meta: [{ title: "New Project — Verdana" }] }),
});

const steps = ["Project", "Inspiration", "Style", "Budget", "Generate"];

function NewProject() {
  const [step, setStep] = useState(0);
  return (
    <AppShell>
      <div className="px-8 py-10 max-w-5xl mx-auto">
        <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
          <ArrowLeft className="size-4" /> Back to dashboard
        </Link>

        <div className="grid grid-cols-5 gap-3 mt-8">
          {steps.map((s, i) => (
            <div key={s} className={`flex items-center gap-3 ${i <= step ? "" : "opacity-50"}`}>
              <div className={`size-8 rounded-full grid place-items-center text-xs font-medium ${i <= step ? "bg-leaf text-leaf-foreground" : "bg-muted text-muted-foreground"}`}>{i + 1}</div>
              <span className="text-sm">{s}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-card border border-border p-8 animate-fade-in">
          {step === 0 && <Step1 />}
          {step === 1 && <Step2 />}
          {step === 2 && <Step3 />}
          {step === 3 && <Step4 />}
          {step === 4 && <Step5 />}

          <div className="border-t border-border mt-8 pt-6 flex items-center justify-between">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> Back
            </button>
            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center gap-2 bg-leaf text-leaf-foreground rounded-full px-5 py-2.5 text-sm font-medium hover:opacity-90"
              >
                Continue <ArrowRight className="size-4" />
              </button>
            ) : (
              <Link to="/workspace" className="inline-flex items-center gap-2 bg-leaf text-leaf-foreground rounded-full px-5 py-2.5 text-sm font-medium hover:opacity-90">
                <Sparkles className="size-4" /> Generate workspace
              </Link>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

const inputCls = "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

function Step1() {
  const [type, setType] = useState("Balcony");
  return (
    <>
      <h2 className="font-serif text-3xl">Tell us about the project</h2>
      <p className="text-muted-foreground mt-1 text-sm">The basics — we'll use this to set up the workspace.</p>
      <div className="grid md:grid-cols-2 gap-5 mt-6">
        <Field label="Project name"><input className={inputCls} defaultValue="Skyline Balcony Retreat" /></Field>
        <Field label="Client name"><input className={inputCls} defaultValue="Mehta Residence" /></Field>
        <Field label="Space type">
          <div className="flex flex-wrap gap-2">
            {["Balcony", "Terrace", "Garden", "Landscape"].map((t) => (
              <button key={t} onClick={() => setType(t)} className={`px-4 py-2 rounded-full text-sm border ${type === t ? "bg-accent border-accent" : "border-border hover:bg-muted"}`}>{t}</button>
            ))}
          </div>
        </Field>
        <Field label="City"><input className={inputCls} defaultValue="Mumbai" /></Field>
        <Field label="Length (ft)"><input className={inputCls} defaultValue="12" /></Field>
        <Field label="Width (ft)"><input className={inputCls} defaultValue="10" /></Field>
      </div>
    </>
  );
}

function Step2() {
  return (
    <>
      <h2 className="font-serif text-3xl">Show us the space</h2>
      <p className="text-muted-foreground mt-1 text-sm">Upload site photos and references — drop in anything that inspires.</p>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {[{ icon: ImageIcon, label: "Site photos" }, { icon: Video, label: "Walkthrough video" }, { icon: Upload, label: "Inspiration" }].map((u) => (
          <div key={u.label} className="border border-dashed border-border rounded-xl p-8 text-center hover:bg-muted/40 transition cursor-pointer">
            <u.icon className="size-6 mx-auto text-muted-foreground" />
            <div className="text-sm font-medium mt-3">{u.label}</div>
            <div className="text-xs text-muted-foreground mt-1">Drag & drop or browse</div>
          </div>
        ))}
      </div>
    </>
  );
}

function Step3() {
  const styles = ["Minimal", "Luxury", "Tropical", "Zen", "Modern", "Organic", "Café-style", "Contemporary"];
  const [active, setActive] = useState("Minimal");
  return (
    <>
      <h2 className="font-serif text-3xl">Choose a design language</h2>
      <p className="text-muted-foreground mt-1 text-sm">We'll use this as the visual north star.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {styles.map((s) => (
          <button key={s} onClick={() => setActive(s)} className={`aspect-[4/5] rounded-xl border text-left p-4 flex flex-col justify-end transition ${active === s ? "border-leaf ring-2 ring-leaf/30 bg-card" : "border-border bg-card hover:bg-muted/40"}`}>
            <div className="font-serif text-xl">{s}</div>
            <div className="text-xs text-muted-foreground mt-1">Curated palette & textures</div>
          </button>
        ))}
      </div>
    </>
  );
}

function Step4() {
  return (
    <>
      <h2 className="font-serif text-3xl">Budget & preferences</h2>
      <p className="text-muted-foreground mt-1 text-sm">We'll keep recommendations within range.</p>
      <div className="grid md:grid-cols-2 gap-5 mt-6">
        <Field label="Budget range">
          <select className={inputCls}>
            <option>₹50k – ₹1.5L</option>
            <option>₹1.5L – ₹4L</option>
            <option>₹4L – ₹10L</option>
            <option>₹10L+</option>
          </select>
        </Field>
        <Field label="Material preference">
          <select className={inputCls}>
            <option>Mixed natural</option>
            <option>Wood-forward</option>
            <option>Stone-forward</option>
            <option>Modular composite</option>
          </select>
        </Field>
        <Field label="Maintenance">
          <div className="flex gap-2">
            {["Low", "Medium", "High"].map((m) => (
              <button key={m} className="flex-1 py-2.5 rounded-lg border border-border hover:bg-muted text-sm">{m}</button>
            ))}
          </div>
        </Field>
      </div>
    </>
  );
}

function Step5() {
  return (
    <div className="text-center py-8">
      <div className="size-16 rounded-2xl bg-leaf text-leaf-foreground grid place-items-center mx-auto"><Sparkles className="size-7" /></div>
      <h2 className="font-serif text-3xl mt-5">Your workspace is ready</h2>
      <p className="text-muted-foreground mt-2 max-w-md mx-auto text-sm">Verdana AI has prepared a starter layout based on your inputs. You can refine everything once inside.</p>
    </div>
  );
}
