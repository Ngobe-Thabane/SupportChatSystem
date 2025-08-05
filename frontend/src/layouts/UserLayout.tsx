// layouts/UserLayout.tsx
import { Link, Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";

export default function UserLayout() {
  return (
    <>
    <Navbar />
    <Outlet/>
    </>
  );
}
