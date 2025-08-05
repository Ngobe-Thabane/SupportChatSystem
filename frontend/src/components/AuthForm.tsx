import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../stores/useAuthStore";
import { loginUser, registerUser } from "../lib/Auth";
import type { Auth } from "../interfaces/Auth.Interface";

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setError("");
  };

  const loginMutation = useMutation({
    mutationFn: (data: Auth) => loginUser(data),
    onSuccess: (res) => {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      login({ username: user.username, role: user.role, token });
      navigate(user.role === "admin" ? "/admin" : "/user");
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || "Login failed");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: Auth) => registerUser(data),
    onSuccess: () => {
      setMode("login");
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || "Signup failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    const username = form.username?.value;

    setError("");

    const payload: Auth = {
      email,
      password,
      ...(mode === "signup" && { username }),
    };

    if (mode === "login") {
      loginMutation.mutate(payload);
    } else {
      registerMutation.mutate(payload);
    }
  };

  const loading = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="w-full max-w-sm p-8 bg-base-100 rounded-box shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === "login" ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "signup" && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input input-bordered w-full"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />
          {error && <p className="text-error">{error}</p>}

          <button
            type="submit"
            className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleMode}
              className="btn btn-link btn-sm ml-1"
            >
              {mode === "login" ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
