import { create } from "zustand";

type User = {
  username: string;
  role: "admin" | "user";
  token: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  setToken : (token:string) => void;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  setToken: (token:string) => set({token:token}),
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
