import { Link, Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import Footer from "../shared/Footer";
import { useState } from "react";

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="navbar bg-base-100/50 backdrop-blur-md fixed top-0 w-full shadow-sm z-50 px-4">
        {/* Left: Logo */}
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl font-bold">
            Movie Time
          </Link>
        </div>

        {/* Center: Search - show only if user logged in and on md+ */}
        {user && (
          <div className="hidden md:flex flex-1 justify-center">
            <input
              type="text"
              placeholder="Search movies, theaters..."
              className="input input-bordered w-96"
            />
          </div>
        )}

        {/* Right: Links and User Menu */}
        <div className="flex-none flex items-center gap-3">
          {/* Hamburger button for mobile */}
          <button
            className="btn btn-square btn-ghost md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Common Explore link for md+ */}
          <Link to="/explore" className="hidden md:inline font-semibold hover:text-primary">
            Explore
          </Link>

          {!user && (
            <>
              {/* When no user logged in - show buttons on md+, hidden on mobile */}
              <Link
                to="/login"
                className="hidden md:inline btn btn-outline btn-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hidden md:inline btn btn-primary btn-sm"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* User and Admin menus for md+ */}
          {user && user.role === "user" && (
            <>
              <Link
                to="/user/bookings"
                className="hidden md:inline font-semibold hover:text-primary"
              >
                My Bookings
              </Link>

              {/* User Avatar dropdown */}
              <div className="dropdown dropdown-end hidden md:block">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User Avatar"
                      src={
                        user.avatarUrl || "https://i.pravatar.cc/150?img=3"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              {/* Admin links hidden on mobile */}
              <Link
                to="/admin/dashboard"
                className="hidden md:inline font-semibold hover:text-primary"
              >
                Dashboard
              </Link>

              {/* Admin Manage dropdown (grouped manage links) */}
              <div className="dropdown dropdown-end hidden md:block">
                <label tabIndex={0} className="btn btn-ghost font-semibold">
                  Manage ▾
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/admin/movies">Movies</Link>
                  </li>
                  <li>
                    <Link to="/admin/showtimes">Showtimes</Link>
                  </li>
                  <li>
                    <Link to="/admin/users">Users</Link>
                  </li>
                  <li>
                    <Link to="/admin/bookings">Bookings</Link>
                  </li>
                  <li>
                    <Link to="/admin/theaters">Theaters</Link>
                  </li>
                </ul>
              </div>

              {/* Admin Avatar dropdown */}
              <div className="dropdown dropdown-end hidden md:block">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Admin Avatar"
                      src={
                        user.avatarUrl || "https://i.pravatar.cc/150?img=12"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/admin/profile">Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu - only visible when toggled */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-base-100 shadow-md z-40 p-4 md:hidden space-y-3">
          <Link
            to="/explore"
            className="block font-semibold hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Explore
          </Link>

          {!user && (
            <>
              <Link
                to="/login"
                className="block btn btn-outline btn-sm w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block btn btn-primary btn-sm w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}

          {user && user.role === "user" && (
            <>
              <Link
                to="/user/bookings"
                className="block font-semibold hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Bookings
              </Link>
              <Link
                to="/user/bookings/history"
                className="block font-semibold hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Booking History
              </Link>
              <Link
                to="/user/bookings/canceled"
                className="block font-semibold hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Canceled Bookings
              </Link>
              <Link
                to="/user/wishlist"
                className="block font-semibold hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Wish List
              </Link>

              <Link
                to="/profile"
                className="block font-semibold hover:text-primary mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-sm w-full mt-1"
              >
                Logout
              </button>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              <Link
                to="/admin/dashboard"
                className="block font-semibold hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <details className="group">
                <summary className="cursor-pointer font-semibold">
                  Manage 
                </summary>
                <ul className="pl-4 mt-2 space-y-1">
                  <li>
                    <Link
                      to="/admin/movies"
                      className="block hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Movies
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/showtimes"
                      className="block hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Showtimes
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/users"
                      className="block hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/bookings"
                      className="block hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Bookings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/theaters"
                      className="block hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Theaters
                    </Link>
                  </li>
                </ul>
              </details>

              <Link
                to="/admin/profile"
                className="block font-semibold hover:text-primary mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-sm w-full mt-1"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}

      <div className="pt-16">
        {/* Outlet and footer pushed down so content isn't hidden behind fixed navbar */}
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
