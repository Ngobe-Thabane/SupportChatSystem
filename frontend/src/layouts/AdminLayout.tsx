// layouts/AdminLayout.tsx
import { Link, Outlet } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
// import { FiLogOut, FiUsers, FiFilm, FiMessageCircle, FiStar, FiSettings, FiGrid } from "react-icons";

export default function AdminLayout() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="flex min-h-screen bg-base-200 text-base-content">
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 shadow-lg p-4 hidden md:flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6 text-primary">MovieTime</h1>

          <div className="flex items-center gap-3 mb-6">
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div>
              <p className="font-semibold">{user?.username}</p>
              <span className="badge badge-outline badge-sm">Admin</span>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            <Link to="/admin" className="btn btn-ghost justify-start">
              Dashboard
            </Link>
            <Link to="/admin/catalog" className="btn btn-ghost justify-start">
              Catalog
            </Link>
            <Link to="/admin/users" className="btn btn-ghost justify-start">
               Users
            </Link>
            <Link to="/admin/comments" className="btn btn-ghost justify-start">
              Comments
            </Link>
            <Link to="/admin/reviews" className="btn btn-ghost justify-start">
              Reviews
            </Link>
            <Link to="/admin/settings" className="btn btn-ghost justify-start">
              Settings
            </Link>
          </nav>
        </div>

        <div>
          <button onClick={logout} className="btn btn-sm btn-outline w-full mt-4">
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
