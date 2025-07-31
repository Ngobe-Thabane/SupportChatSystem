// components/Navbar.tsx
import { Link, Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">Movie Time</Link>
        </div>

        <div className="flex gap-2 items-center">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />

          {!user ? (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}
