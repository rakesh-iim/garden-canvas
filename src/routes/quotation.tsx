import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { quotationGroups } from "@/lib/mock";
import { ArrowLeft, FileText, Download, Trash2, Plus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/quotation")({
  component: QuotationPage,
  head: () => ({ meta: [{ title: "Quotation — Verdana" }] }),
});

const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");

function QuotationPage() {
  const [groups, setGroups] = useState(quotationGroups);

  const subtotal = groups.reduce((acc, g) => acc + g.items.reduce((a, i) => a + i.qty * i.unit, 0), 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const updateQty = (gi: number, ii: number, qty: number) => {
    setGroups((prev) => prev.map((g, i) => (i !== gi ? g : { ...g, items: g.items.map((it, j) => (j !== ii ? it : { ...it, qty })) })));
  };

  return (
    <AppShell>
      <div className="px-8 py-8 max-w-[1400px] grid lg:grid-cols-[1fr_360px] gap-8">
        <div>
          <Link to="/workspace" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
            <ArrowLeft className="size-4" /> Back to workspace
          </Link>

          <div className="mt-6 flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs text-muted-foreground">Quotation · Q-2410-128</div>
              <h1 className="font-serif text-5xl mt-1">Skyline Balcony Retreat</h1>
              <div className="text-muted-foreground mt-1">Mehta Residence · Mumbai · 120 sq ft</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border hover:bg-muted text-sm"><FileText className="size-4" /> Preview</button>
              <button className="inline-flex items-center gap-1.5 bg-leaf text-leaf-foreground px-4 py-2 rounded-full text-sm font-medium"><Download className="size-4" /> Download PDF</button>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {groups.map((g, gi) => {
              const groupTotal = g.items.reduce((a, i) => a + i.qty * i.unit, 0);
              return (
                <div key={g.name} className="rounded-2xl border border-border bg-card overflow-hidden">
                  <div className="px-5 py-4 flex items-center justify-between border-b border-border">
                    <h3 className="font-serif text-xl">{g.name}</h3>
                    <div className="font-medium">{formatINR(groupTotal)}</div>
                  </div>
                  <div className="divide-y divide-border">
                    {g.items.map((it, ii) => (
                      <div key={ii} className="grid grid-cols-[1fr_90px_120px_110px_36px] items-center gap-3 px-5 py-3 text-sm">
                        <div>{it.label}</div>
                        <input type="number" value={it.qty} onChange={(e) => updateQty(gi, ii, +e.target.value)} className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm" />
                        <input type="number" value={it.unit} readOnly className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm" />
                        <div className="text-right font-medium">{formatINR(it.qty * it.unit)}</div>
                        <button className="size-8 grid place-items-center rounded-full hover:bg-muted text-muted-foreground"><Trash2 className="size-4" /></button>
                      </div>
                    ))}
                  </div>
                  <button className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 px-5 py-3"><Plus className="size-3.5" /> Add line item</button>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="lg:sticky lg:top-8 self-start">
          <div className="rounded-2xl bg-card border border-border p-6">
            <h3 className="font-serif text-2xl">Summary</h3>
            <div className="mt-5 space-y-3 text-sm">
              {groups.map((g) => (
                <div key={g.name} className="flex justify-between">
                  <span>{g.name}</span><span className="font-medium">{formatINR(g.items.reduce((a, i) => a + i.qty * i.unit, 0))}</span>
                </div>
              ))}
              <div className="border-t border-border pt-3 flex justify-between"><span>Subtotal</span><span className="font-medium">{formatINR(subtotal)}</span></div>
              <div className="flex justify-between"><span>GST (18%)</span><span className="font-medium">{formatINR(gst)}</span></div>
            </div>
            <div className="mt-5 pt-5 border-t border-border flex items-end justify-between">
              <span>Total</span>
              <span className="font-serif text-3xl">{formatINR(total)}</span>
            </div>
            <button className="w-full mt-5 bg-leaf text-leaf-foreground rounded-full py-3 text-sm font-medium hover:opacity-90">Send to client</button>
            <p className="text-center text-xs text-muted-foreground mt-3">Real-time pricing · valid 30 days</p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
