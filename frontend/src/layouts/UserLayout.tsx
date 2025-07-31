// layouts/UserLayout.tsx
import { Link, Outlet } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";

export default function UserLayout() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="flex min-h-screen bg-base-200 text-base-content">
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 shadow-lg p-4 hidden md:flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6 text-primary">🎬 My Movies</h1>

          <div className="flex items-center gap-3 mb-6">
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div>
              <p className="font-semibold">{user?.username}</p>
              <span className="badge badge-outline badge-sm">User</span>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            <Link to="/user" className="btn btn-ghost justify-start">
               My Bookings
            </Link>
            <Link to="/user/history" className="btn btn-ghost justify-start">
               Booking History
            </Link>
            <Link to="/user/canceled" className="btn btn-ghost justify-start">
              Canceled Bookings
            </Link>
            <Link to="/user/explore" className="btn btn-ghost justify-start">
             Explore
            </Link>
          </nav>
        </div>

        <button onClick={logout} className="btn btn-sm btn-outline w-full mt-4">
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
