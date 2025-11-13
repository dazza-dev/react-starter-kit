import { create } from "zustand";
import type { User } from "@/modules/users/types/user";

interface UserState {
  selectedUser: User | null;
  isFormOpen: boolean;
  isDeleteConfirmOpen: boolean;
  setSelectedUser: (user: User | null) => void;
  toggleForm: (state?: boolean) => void;
  toggleDeleteConfirm: (state?: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  selectedUser: null,
  isFormOpen: false,
  isDeleteConfirmOpen: false,
  setSelectedUser: (user) => set({ selectedUser: user }),
  toggleForm: (state) =>
    set((prev) => ({ isFormOpen: state ?? !prev.isFormOpen })),
  toggleDeleteConfirm: (state) =>
    set((prev) => ({
      isDeleteConfirmOpen: state ?? !prev.isDeleteConfirmOpen,
    })),
}));
