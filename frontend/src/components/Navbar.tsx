import { Link, Outlet} from "react-router";
import { useAuthStore } from "../stores/useAuthStore";

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  
  return (
    <>
      <div className="navbar bg-base-100/20 backdrop-blur-md shadow-sm z-50 mb-2">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">Movie Time</Link>
        </div>

        <div className="flex gap-2 items-center">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          <Link to={'/user/explore'}>Explore</Link>
          {!user ? (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
            </>
          ) : (
            <>
            <Link to={'/user/bookings'}>My Bookings</Link>
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
            </>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}
