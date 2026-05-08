import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { assetCategories, plantAssets } from "@/lib/mock";
import { Save, Undo2, Redo2, Download, Eye, FileText, Sparkles, MousePointer2, Hand, Move3D, Grid3x3, Sprout, X, ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/workspace")({
  component: Workspace,
  head: () => ({ meta: [{ title: "Designer — Verdana" }] }),
});

function Workspace() {
  const [view, setView] = useState<"2D" | "3D">("2D");
  const [activeCat, setActiveCat] = useState("plants");
  const [aiOpen, setAiOpen] = useState(true);

  return (
    <AppShell
      topBar={
        <div className="flex items-center gap-4 px-6 py-3 border-b border-border bg-card/50">
          <Link to="/dashboard" className="font-serif text-lg">Skyline Balcony Retreat</Link>
          <span className="text-xs text-muted-foreground">· Mehta Residence · Auto-saved 12s ago</span>
          <div className="ml-auto flex items-center gap-1.5">
            <IconBtn><Undo2 className="size-4" /></IconBtn>
            <IconBtn><Redo2 className="size-4" /></IconBtn>
            <div className="h-6 w-px bg-border mx-1" />
            <div className="flex bg-muted rounded-full p-1">
              {(["2D", "3D"] as const).map((v) => (
                <button key={v} onClick={() => setView(v)} className={`px-3 py-1 rounded-full text-xs font-medium ${view === v ? "bg-card shadow-sm" : "text-muted-foreground"}`}>
                  {v === "2D" ? "▦ 2D" : "◈ 3D"}
                </button>
              ))}
            </div>
            <div className="h-6 w-px bg-border mx-1" />
            <button onClick={() => setAiOpen(!aiOpen)} className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full hover:bg-muted">
              <Sparkles className="size-4" /> AI
            </button>
            <IconBtn><Eye className="size-4" /> Render</IconBtn>
            <IconBtn><FileText className="size-4" /> Quote</IconBtn>
            <IconBtn><Download className="size-4" /> Export</IconBtn>
            <button className="inline-flex items-center gap-1.5 text-sm bg-leaf text-leaf-foreground px-4 py-2 rounded-full font-medium">
              <Save className="size-4" /> Save
            </button>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-[280px_1fr_300px] h-[calc(100vh-65px)]">
        {/* LEFT: Asset library */}
        <aside className="border-r border-border flex flex-col bg-card/40 min-h-0">
          <div className="p-3">
            <input placeholder="Search assets" className="w-full rounded-full bg-background border border-border px-4 py-2 text-sm" />
          </div>
          <div className="px-2 space-y-0.5 overflow-y-auto">
            {assetCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm ${activeCat === c.id ? "bg-accent" : "hover:bg-muted/60"}`}
              >
                <span>{c.icon}</span>{c.label}
              </button>
            ))}
          </div>
          <div className="border-t border-border p-3 mt-2">
            <div className="text-[10px] tracking-widest text-muted-foreground uppercase mb-2">Plants · drag to canvas</div>
            <div className="grid grid-cols-2 gap-2">
              {plantAssets.map((p) => (
                <div key={p.name} className="rounded-lg bg-card border border-border p-3 hover:shadow-md transition cursor-grab active:cursor-grabbing">
                  <div className="aspect-square rounded-md bg-accent/40 grid place-items-center text-2xl"><Sprout className="size-6 text-leaf" /></div>
                  <div className="text-xs font-medium mt-2 truncate">{p.name}</div>
                  <div className="text-[10px] text-muted-foreground">{p.price}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* CENTER: Canvas */}
        <section className="relative bg-sand/30 flex flex-col min-h-0">
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 bg-card border border-border rounded-xl p-1.5 shadow-sm">
            {[MousePointer2, Hand, Move3D, Grid3x3].map((I, i) => (
              <button key={i} className={`size-9 grid place-items-center rounded-lg ${i === 0 ? "bg-leaf text-leaf-foreground" : "hover:bg-muted"}`}><I className="size-4" /></button>
            ))}
          </div>
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-card border border-border rounded-full px-3 py-1.5 shadow-sm text-xs">
            <span>12'×10'</span><span className="text-muted-foreground">·</span><span>{view} view</span><span className="text-muted-foreground">·</span>
            <button className="size-5 grid place-items-center rounded hover:bg-muted">−</button><span>100%</span><button className="size-5 grid place-items-center rounded hover:bg-muted">+</button>
          </div>

          <div className="flex-1 grid place-items-center p-8 overflow-hidden">
            <div
              className="relative w-full max-w-3xl aspect-[6/5] rounded-xl border border-border bg-card"
              style={{
                backgroundImage:
                  "linear-gradient(to right, oklch(0.9 0.015 95) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.9 0.015 95) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            >
              <div className="absolute top-[10%] left-[10%] right-[10%] h-12 rounded-full bg-accent/60 grid place-items-center text-leaf">
                <Sparkles className="size-5" />
              </div>
              <div className="absolute top-[35%] left-[15%] size-20 rounded-lg bg-leaf/20 border-2 border-leaf grid place-items-center">
                <Sprout className="size-7 text-leaf" />
              </div>
              <div className="absolute top-[40%] left-[55%] size-24 rounded-lg bg-muted border-2 border-foreground/20" />
              <div className="absolute top-[65%] left-[30%] w-32 h-14 rounded-lg bg-muted border-2 border-leaf/40" />
              <div className="absolute top-[68%] right-[12%] size-16 rounded-lg bg-leaf/20 border-2 border-leaf grid place-items-center">
                <Sprout className="size-6 text-leaf" />
              </div>
            </div>
          </div>

          {/* Bottom layers + timeline */}
          <div className="border-t border-border bg-card/60 grid grid-cols-[260px_1fr]">
            <div className="border-r border-border p-3 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground"><span>▤</span> LAYERS</div>
              <ul className="mt-2 space-y-1">
                {["Base · Floor", "Furniture", "Plants", "Lighting"].map((l, i) => (
                  <li key={l} className={`px-2 py-1.5 rounded ${i === 0 ? "bg-accent" : "hover:bg-muted"}`}>{l}</li>
                ))}
              </ul>
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>PROJECT TIMELINE</span><ChevronDown className="size-4" />
              </div>
              <div className="grid grid-cols-5 gap-1 items-end h-12">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div key={i} className={`bg-leaf/40 rounded-sm`} style={{ height: `${20 + Math.abs(Math.sin(i)) * 80}%`, gridColumn: "auto" }} />
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
                <span>Brief</span><span>Concept</span><span>Render</span><span>Quote</span><span>Approval</span>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT: Properties + AI */}
        <aside className="border-l border-border bg-card/40 overflow-y-auto">
          <div className="p-5 border-b border-border">
            <div className="text-[10px] tracking-widest uppercase text-muted-foreground">Properties</div>
            <h3 className="font-serif text-xl mt-1">Teak Bench</h3>
            <PropGroup label="Position">
              <Coord k="X" v="42" /><Coord k="Y" v="60" />
            </PropGroup>
            <PropGroup label="Size">
              <Coord k="W" v="28" /><Coord k="H" v="10" />
            </PropGroup>
            <div className="mt-4">
              <div className="text-[10px] tracking-widest uppercase text-muted-foreground">Rotation · 0°</div>
              <input type="range" className="w-full mt-2 accent-leaf" />
            </div>
            <div className="mt-4">
              <div className="text-[10px] tracking-widest uppercase text-muted-foreground">Material</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Teak", "Bamboo", "Steel", "Stone", "Concrete", "Rattan"].map((m, i) => (
                  <button key={m} className={`px-3 py-1.5 rounded-full text-xs border ${i === 0 ? "bg-accent border-accent" : "border-border hover:bg-muted"}`}>{m}</button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-[10px] tracking-widest uppercase text-muted-foreground">Color</div>
              <div className="flex gap-2 mt-2">
                {["#5b3a29", "#3f6a3a", "#7a5a47", "#d6c478", "#1f1f1f"].map((c) => (
                  <button key={c} className="size-7 rounded-full border border-border" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          </div>

          {aiOpen && (
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-leaf text-leaf-foreground grid place-items-center"><Sparkles className="size-4" /></div>
                  <div>
                    <div className="font-medium text-sm">Verdana AI</div>
                    <div className="text-xs text-muted-foreground">Design copilot</div>
                  </div>
                </div>
                <button onClick={() => setAiOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="size-4" /></button>
              </div>
              <div className="rounded-xl bg-accent/50 p-3 text-sm mt-4">
                Drag assets onto the canvas, switch to 3D to preview the volume. I can auto-arrange them for you.
              </div>
              <div className="space-y-2 mt-3">
                {["Suggested plant pairings", "Optimise for afternoon sun", "Reduce budget by 12%", "Auto-arrange seating"].map((s) => (
                  <button key={s} className="w-full text-left text-sm px-3 py-2.5 rounded-lg bg-card border border-border hover:bg-muted/60">{s}</button>
                ))}
              </div>
              <div className="mt-4 relative">
                <input placeholder="Ask Verdana AI…" className="w-full rounded-full bg-background border border-border px-4 py-2.5 text-sm pr-10" />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 size-7 rounded-full bg-leaf text-leaf-foreground grid place-items-center"><Sparkles className="size-3.5" /></button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </AppShell>
  );
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return <button className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground">{children}</button>;
}
function PropGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <div className="text-[10px] tracking-widest uppercase text-muted-foreground">{label}</div>
      <div className="grid grid-cols-2 gap-2 mt-2">{children}</div>
    </div>
  );
}
function Coord({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-background border border-border px-3 py-2">
      <span className="text-xs text-muted-foreground">{k}</span>
      <input defaultValue={v} className="w-full bg-transparent text-sm focus:outline-none" />
    </div>
  );
}
