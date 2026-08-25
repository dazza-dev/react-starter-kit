import { create } from "zustand";
import type { AuthUser } from "@/modules/auth/types/auth.type";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: AuthUser) => void;
  can: (permission: string | string[]) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: true, isLoading: false }),

  /**
   * An admin can do everything without enumerating permissions; with an array, having just one is enough.
   */
  can: (permission) => {
    const user = get().user;
    if (!user) return false;
    if (user.isAdmin) return true;
    if (Array.isArray(permission)) return permission.some((p) => user.permissions.includes(p));
    return user.permissions.includes(permission);
  },

  logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
}));
