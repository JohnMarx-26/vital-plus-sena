import Navbar from "@/shared/layout/Navbar";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen text-text-primary">

      {/* Navbar */}
      <header>
        <Navbar variant={isHome ? "transparent" : "solid"} />
      </header>

      {isHome ? (
        <Outlet />
      ) : (
        <main className="mx-auto max-w-7xl px-4 pt-2 pb-6">
          <Outlet />
        </main>
      )}
    </div>
  );
}