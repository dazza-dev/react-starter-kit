import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  User,
  CreateUserDTO,
  UpdateUserDTO,
} from "@/modules/users/types/user";

const API_URL = "https://api.example.com/users";

export const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error fetching users");
      return res.json();
    },
  });

export const useCreateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateUserDTO) => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error creating user");
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useUpdateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateUserDTO) => {
      const res = await fetch(`${API_URL}/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error updating user");
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error deleting user");
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};
