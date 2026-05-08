import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { recentProjects, teamActivity, stats } from "@/lib/mock";
import { Search, Plus, Layers, Sparkles, TrendingUp, Users, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard — Verdana" }] }),
});

const iconMap = { layers: Layers, sparkles: Sparkles, trending: TrendingUp, users: Users };

function Dashboard() {
  return (
    <AppShell
      topBar={
        <div className="flex items-center gap-3 px-8 py-4 border-b border-border">
          <div className="relative flex-1 max-w-2xl">
            <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search projects, clients, plants…"
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <Link to="/projects/new" className="ml-auto inline-flex items-center gap-2 bg-leaf text-leaf-foreground rounded-full px-4 py-2.5 text-sm font-medium hover:opacity-90">
            <Plus className="size-4" /> New project
          </Link>
        </div>
      }
    >
      <div className="px-8 py-8 max-w-[1400px]">
        <div className="text-xs text-muted-foreground">Thursday, 7 May</div>
        <h1 className="font-serif text-5xl mt-1">Good morning, Aanya.</h1>
        <p className="text-muted-foreground mt-2">3 reviews pending · 2 client previews scheduled today.</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {stats.map((s) => {
            const Icon = iconMap[s.icon as keyof typeof iconMap];
            return (
              <div key={s.label} className="rounded-2xl bg-card border border-border p-5">
                <div className="flex items-start justify-between">
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                  <div className="size-8 rounded-full bg-accent grid place-items-center"><Icon className="size-4" /></div>
                </div>
                <div className="font-serif text-4xl mt-3">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-2">{s.delta}</div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-10">
          <div className="lg:col-span-2">
            <div className="flex items-end justify-between mb-4">
              <h2 className="font-serif text-2xl">Recent projects</h2>
              <Link to="/templates" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">View all <ArrowUpRight className="size-3.5" /></Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {recentProjects.map((p) => (
                <Link key={p.id} to="/workspace" className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.image} alt={p.name} className="size-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{p.client}</div>
                      </div>
                      <span className="text-[10px] tracking-wider uppercase px-2 py-1 rounded-full bg-accent text-accent-foreground whitespace-nowrap">{p.status}</span>
                    </div>
                    <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                      <span>{p.type}</span>
                      <span>{p.time}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-card border border-border p-5">
              <h3 className="font-serif text-xl mb-4">Team activity</h3>
              <ul className="space-y-4">
                {teamActivity.map((t, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <div className="size-8 rounded-full bg-leaf text-leaf-foreground grid place-items-center text-xs font-medium shrink-0">{t.initials}</div>
                    <div className="min-w-0">
                      <p className="leading-snug"><span className="font-medium">{t.name}</span> <span className="text-muted-foreground">{t.action}</span> <span className="font-medium">{t.target}</span></p>
                      <div className="text-xs text-muted-foreground mt-1">{t.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-sand border border-border p-5">
              <h3 className="font-serif text-xl">Saved templates</h3>
              <p className="text-sm text-muted-foreground mt-1">Quick-start blueprints curated by your team.</p>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {recentProjects.slice(0, 4).map((p) => (
                  <div key={p.id} className="aspect-square rounded-xl overflow-hidden">
                    <img src={p.image} alt={p.name} className="size-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
