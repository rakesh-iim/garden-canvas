import { Sidebar } from "./Sidebar";
import { ReactNode } from "react";

export function AppShell({ children, topBar }: { children: ReactNode; topBar?: ReactNode }) {
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
