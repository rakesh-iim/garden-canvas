import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { templates } from "@/lib/mock";
import { Bookmark, Sparkles, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/templates")({
  component: TemplatesPage,
  head: () => ({ meta: [{ title: "Templates — Verdana" }] }),
});

const themes = ["All", "Minimal", "Luxury", "Tropical", "Zen", "Contemporary", "Organic", "Café-style"];
const sizes = ["All", "60–120", "120–300", "300–700", "700+"];
const tiers = ["All", "Modern", "Traditional", "Luxury"];

function TemplatesPage() {
  const [theme, setTheme] = useState("All");
  const [size, setSize] = useState("All");
  const [tier, setTier] = useState("All");

  const filtered = templates.filter((t) =>
    (theme === "All" || t.theme === theme) &&
    (tier === "All" || t.tier === tier)
  );
  void size;

  return (
    <AppShell>
      <div className="px-8 py-8 max-w-[1500px]">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs text-muted-foreground">Library</div>
            <h1 className="font-serif text-5xl mt-1">Templates</h1>
            <p className="text-muted-foreground mt-2">Start from a curated blueprint, then make it yours in the workspace.</p>
          </div>
          <div className="relative">
            <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search templates…" className="pl-11 pr-4 py-2.5 rounded-full bg-card border border-border text-sm w-72" />
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <FilterRow label="Theme" options={themes} value={theme} onChange={setTheme} />
          <FilterRow label="Size (sq ft)" options={sizes} value={size} onChange={setSize} />
          <FilterRow label="Style tier" options={tiers} value={tier} onChange={setTier} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {filtered.map((t) => (
            <div key={t.name} className="rounded-2xl bg-card border border-border overflow-hidden group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={t.image} alt={t.name} className="size-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase bg-card/90 backdrop-blur px-2 py-1 rounded-full">{t.tier}</span>
                <button className="absolute top-3 right-3 size-8 rounded-full bg-card/90 backdrop-blur grid place-items-center hover:bg-card"><Bookmark className="size-4" /></button>
              </div>
              <div className="p-4">
                <div className="font-serif text-lg">{t.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.theme} · {t.size}</div>
                <div className="flex items-end justify-between mt-4">
                  <div>
                    <div className="text-[10px] tracking-widest text-muted-foreground uppercase">Est.</div>
                    <div className="font-serif text-xl">{t.price}</div>
                  </div>
                  <button className="inline-flex items-center gap-1.5 bg-leaf text-leaf-foreground rounded-full px-3.5 py-2 text-xs font-medium hover:opacity-90">
                    <Sparkles className="size-3.5" /> Use
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function FilterRow({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="text-[10px] tracking-widest uppercase text-muted-foreground w-24">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`px-3.5 py-1.5 text-sm rounded-full border ${value === o ? "bg-leaf text-leaf-foreground border-leaf" : "border-border hover:bg-muted"}`}
          >{o}</button>
        ))}
      </div>
    </div>
  );
}
