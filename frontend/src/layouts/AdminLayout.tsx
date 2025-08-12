// layouts/AdminLayout.tsx
import { Link, Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import Home from "../pages/Home";
import { useState } from "react";
import { X, Menu } from "lucide-react";

export default function AdminLayout() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen bg-base-200 text-base-content">
      {/* Sidebar */}
      <aside
        className={`bg-base-100 shadow-lg p-4 flex-col justify-between transition-all duration-300 ease-in-out
          ${isOpen ? "w-64 flex" : "w-0 overflow-hidden hidden"}`}
      >
        {isOpen && (
          <>
            <div>
              {/* Header with close button */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-primary">MovieTime</h1>
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn btn-ghost btn-xs"
                >
                  <X size={18} />
                </button>
              </div>

              {/* User avatar */}
              <div className="flex items-center gap-3 mb-6">
                <div className="avatar">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      alt="User avatar"
                    />
                  </div>
                </div>
                <div>
                  <p className="font-semibold">{user?.username}</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-2">
                <Link to="/admin" className="btn btn-ghost justify-start">
                  Dashboard
                </Link>
                <Link to="/admin/movies" className="btn btn-ghost justify-start">
                  Movies
                </Link>
                <Link to="/admin/theaters" className="btn btn-ghost justify-start">
                  Theaters
                </Link>
                <Link to="/admin/showtimes" className="btn btn-ghost justify-start">
                  Showtimes
                </Link>
              </nav>
            </div>

            {/* Logout */}
            <div>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="btn btn-sm btn-outline w-full mt-4"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-5 overflow-y-auto">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-ghost mb-4"
          >
            <Menu size={20} />
          </button>
        )}
        {user?.role === "admin" ? <Outlet /> : <Home />}
      </main>
    </div>
  );
}
