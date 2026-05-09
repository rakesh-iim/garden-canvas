import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { ShieldCheck, UserPlus } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Admin — Verdana" }] }),
});

type Row = {
  id: string;
  full_name: string | null;
  roles: ("admin" | "designer" | "client")[];
};

const ALL_ROLES: Row["roles"] = ["admin", "designer", "client"];

function AdminPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [{ data: profiles }, { data: roles }] = await Promise.all([
      supabase.from("profiles").select("id, full_name"),
      supabase.from("user_roles").select("user_id, role"),
    ]);
    const map = new Map<string, Row>();
    (profiles ?? []).forEach((p) => map.set(p.id, { id: p.id, full_name: p.full_name, roles: [] }));
    (roles ?? []).forEach((r) => {
      const row = map.get(r.user_id);
      if (row) row.roles.push(r.role as Row["roles"][number]);
    });
    setRows(Array.from(map.values()));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggleRole = async (userId: string, role: Row["roles"][number], has: boolean) => {
    if (has) {
      const { error } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", role);
      if (error) return toast.error(error.message);
    } else {
      const { error } = await supabase.from("user_roles").insert({ user_id: userId, role });
      if (error) return toast.error(error.message);
    }
    toast.success("Role updated");
    load();
  };

  return (
    <AppShell requireAdmin>
      <div className="px-8 py-8 max-w-[1200px]">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-leaf text-leaf-foreground grid place-items-center"><ShieldCheck className="size-5" /></div>
          <div>
            <h1 className="font-serif text-4xl">Access control</h1>
            <p className="text-muted-foreground text-sm mt-1">Grant admin, designer, or client roles to studio members.</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-[1fr_auto] gap-4 px-5 py-3 border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
            <div>Member</div>
            <div>Roles</div>
          </div>
          {loading ? (
            <div className="p-8 text-sm text-muted-foreground">Loading members…</div>
          ) : rows.length === 0 ? (
            <div className="p-8 text-sm text-muted-foreground inline-flex items-center gap-2"><UserPlus className="size-4" /> No members yet.</div>
          ) : rows.map((r) => (
            <div key={r.id} className="grid grid-cols-[1fr_auto] gap-4 items-center px-5 py-4 border-b border-border last:border-0">
              <div>
                <div className="font-medium text-sm">{r.full_name ?? "Unnamed user"}{r.id === user?.id && <span className="ml-2 text-xs text-muted-foreground">(you)</span>}</div>
                <div className="text-xs text-muted-foreground font-mono">{r.id.slice(0, 8)}…</div>
              </div>
              <div className="flex gap-2">
                {ALL_ROLES.map((role) => {
                  const has = r.roles.includes(role);
                  return (
                    <button
                      key={role}
                      onClick={() => toggleRole(r.id, role, has)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${has ? "bg-leaf text-leaf-foreground border-leaf" : "bg-background border-border text-muted-foreground hover:text-foreground"}`}
                    >
                      {role}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
