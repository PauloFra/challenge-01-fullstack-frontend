import { create } from "zustand";
import { AuthState, LoginCredentials, User } from "../types/auth";

const ADMIN_USER: User = {
  id: 1,
  name: "Admin",
  email: "admin@example.com",
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null,

  login: async (credentials: LoginCredentials) => {
    if (
      credentials.email === "admin@example.com" &&
      credentials.password === "admin"
    ) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(ADMIN_USER));

      set({
        isAuthenticated: true,
        user: ADMIN_USER,
      });
    } else {
      throw new Error("Invalid credentials");
    }
  },

  logout: () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");

    set({
      isAuthenticated: false,
      user: null,
    });
  },
}));
