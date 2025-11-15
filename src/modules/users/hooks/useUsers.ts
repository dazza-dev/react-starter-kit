import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  User,
  CreateUserDTO,
  UpdateUserDTO,
} from "@/modules/users/types/user";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/users";

export const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(API_URL);
      return res.data.data as User[];
    },
  });

export const useCreateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateUserDTO) => {
      const res = await axios.post(API_URL, data);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useUpdateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateUserDTO) => {
      const res = await axios.put(`${API_URL}/${data.id}`, data);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await axios.delete(`${API_URL}/${id}`);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};
