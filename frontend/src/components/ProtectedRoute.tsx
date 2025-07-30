// components/ProtectedRoute.tsx
import { Navigate } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import type { JSX } from "react";

type Props = {
  children: JSX.Element;
  role?: "admin" | "user";
};

export const ProtectedRoute = ({ children, role }: Props) => {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/unauthorized" />;

  return children;
};
