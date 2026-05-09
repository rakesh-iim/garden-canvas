import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, FilePlus2, Sparkles, LayoutGrid, FileText, Presentation, Settings, Moon, Sun, Sprout, ShieldCheck, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/projects/new", label: "New Project", icon: FilePlus2 },
  { to: "/workspace", label: "Designer", icon: Sparkles },
  { to: "/templates", label: "Templates", icon: LayoutGrid },
  { to: "/quotation", label: "Quotation", icon: FileText },
  { to: "/present", label: "Present", icon: Presentation },
] as const;

export function Sidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [dark, setDark] = useState(false);
  const { user, isAdmin, signOut, roles } = useAuth();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const initials = (user?.user_metadata?.full_name || user?.email || "U")
    .split(" ").map((s: string) => s[0]).join("").slice(0, 2).toUpperCase();
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Member";
  const roleLabel = isAdmin ? "Admin" : roles[0] ? roles[0][0].toUpperCase() + roles[0].slice(1) : "Member";

  return (
    <aside className="w-60 shrink-0 border-r border-border bg-sand/60 flex flex-col sticky top-0 h-screen">
      <div className="px-5 py-5 flex items-center gap-3">
        <div className="size-9 rounded-xl bg-leaf text-leaf-foreground grid place-items-center">
          <Sprout className="size-5" />
        </div>
        <div>
          <div className="font-serif text-lg leading-none">Verdana</div>
          <div className="text-[10px] tracking-[0.18em] text-muted-foreground mt-1">AI GARDEN STUDIO</div>
        </div>
      </div>

      <nav className="px-3 py-2 space-y-1 flex-1 overflow-y-auto">
        {nav.map(({ to, label, icon: Icon }) => {
          const active = path === to || (to !== "/dashboard" && path.startsWith(to));
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                active ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:bg-card/60 hover:text-foreground"
              }`}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          );
        })}
        {isAdmin && (
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              path.startsWith("/admin") ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:bg-card/60 hover:text-foreground"
            }`}
          >
            <ShieldCheck className="size-4" />
            Admin
          </Link>
        )}
      </nav>

      <div className="px-3 pb-3 space-y-1">
        <button onClick={signOut} className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-card/60">
          <LogOut className="size-4" /> Sign out
        </button>
        <button className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-card/60">
          <Settings className="size-4" /> Settings
        </button>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-card">
          <div className="size-8 rounded-full bg-leaf text-leaf-foreground grid place-items-center text-xs font-medium">{initials}</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{displayName}</div>
            <div className="text-xs text-muted-foreground">{roleLabel}</div>
          </div>
          <button onClick={() => setDark(!dark)} className="size-8 grid place-items-center rounded-full hover:bg-muted">
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
