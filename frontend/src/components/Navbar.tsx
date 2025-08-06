import { Link, Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import Footer from "../shared/Footer";

export default function Navbar() {
  const user = useAuthStore((state) => state.user?.token);
  const logout = useAuthStore((state)=>state.logout);
  const navigate = useNavigate();
  return (
    <>
      <div className="navbar bg-base-100/20 backdrop-blur-md shadow-sm z-50 mb-2 px-4">
        {/* Left: Logo */}
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">Movie Time</Link>
        </div>

        {/* Center: Search */}
        <div className="flex-1 flex justify-center">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-40 md:w-96"
          />
        </div>

        {/* Right: Links and User Menu */}
        <div className="flex-none flex gap-3 items-center">
          <Link to="/user/explore" className="font-bold">Explore</Link>

          {user ? (
            <>
              {/* My Bookings Dropdown */}
              <Link to={'/user/bookings'} className="font-bold">My Bookings</Link>

              {/* Avatar */}
              <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link to={'/login'}>Logout</Link></li>
      </ul>
    </div>
            </>
          ) : (
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
          )}
        </div>
      </div>

      <Outlet />
      <Footer />
    </>
  );
}
