// layouts/AdminLayout.tsx
import { Link, Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import Home from "../pages/Home";
import Footer from "../shared/Footer";

export default function AdminLayout() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="flex h-screen bg-base-200 text-base-content">
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
            </div>
          </div>

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

        <div>
          <button onClick={()=> {
            logout();
            navigate("/");

            }} className="btn btn-sm btn-outline w-full mt-4">
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-5 overflow-y-auto">
        {
          user?.role === 'admin' ? <Outlet /> : <Home/>
        }
      </main>
    </div>
  );
}
