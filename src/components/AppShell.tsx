import { Sidebar } from "./Sidebar";
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";

export function AppShell({ children, topBar, requireAdmin }: { children: ReactNode; topBar?: ReactNode; requireAdmin?: boolean }) {
  const { session, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!session) navigate({ to: "/" });
    else if (requireAdmin && !isAdmin) navigate({ to: "/dashboard" });
  }, [loading, session, isAdmin, requireAdmin, navigate]);

  if (loading || !session) {
    return <div className="min-h-screen grid place-items-center text-sm text-muted-foreground">Loading…</div>;
  }

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {topBar}
        <main className="flex-1 animate-fade-in">{children}</main>
      </div>
    </div>
  );
}
