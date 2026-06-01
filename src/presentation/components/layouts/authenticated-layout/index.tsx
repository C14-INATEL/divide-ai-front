import { useState } from "react";
import { Outlet } from "react-router";
import { cn } from "../../../../domain/utils/cn/cn";
import { Footer } from "../../footer";
import { Header } from "../../header";
import { Sidebar } from "../../sidebar";

export function AuthenticatedLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base-200 p-2 sm:p-3 lg:p-4">
      <div className="flex h-[calc(100vh-1rem)] sm:h-[calc(100vh-1.5rem)] lg:h-[calc(100vh-2rem)] gap-3">
        <div className="hidden lg:block w-[264px] shrink-0">
          <Sidebar />
        </div>

        <div
          className={cn(
            "fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 lg:hidden transition-opacity duration-300",
            sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
          onClick={() => setSidebarOpen(false)}
        />
        <div
          className={cn(
            "fixed left-0 top-0 h-full w-[264px] z-50 p-2 lg:hidden transition-transform duration-300 ease-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        <div className="flex-1 flex flex-col gap-3 min-w-0 overflow-hidden">
          <Header onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 bg-base-100 rounded-2xl shadow-sm border border-base-300/60 overflow-y-auto">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
