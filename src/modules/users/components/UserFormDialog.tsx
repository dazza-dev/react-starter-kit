import { TextField, Button } from "@mui/material";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateUser, useUpdateUser } from "@/modules/users/hooks/useUsers";
import { useUserStore } from "@/modules/users/store/useUserStore";
import CustomDialog from "@/core/components/modals/CustomDialog";

const schema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  username: z.string().optional(),
  email: z.string().email("Email inválido").min(1, "El email es obligatorio"),
  password: z.string().optional(),
  avatar: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function UserFormDialog() {
  const { isFormOpen, toggleForm, selectedUser } = useUserStore();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      avatar: "",
    },
  });

  useEffect(() => {
    if (isFormOpen) {
      reset({
        name: selectedUser?.name ?? "",
        username: selectedUser?.username ?? "",
        email: selectedUser?.email ?? "",
        password: "",
        avatar: selectedUser?.avatar ?? "",
      });
    }
  }, [isFormOpen, selectedUser, reset]);

  const onSubmit = (data: FormData) => {
    const payload = {
      ...data,
      username: data.username || null,
      avatar: data.avatar || null,
      password: data.password || "",
    };

    const mutation = selectedUser
      ? updateUser.mutateAsync({ ...payload, id: selectedUser.id })
      : createUser.mutateAsync(payload);

    mutation
      .then(() => toggleForm(false))
      .catch((error) => {
        if (error.response?.data?.errors) {
          const apiErrors = error.response.data.errors;
          Object.keys(apiErrors).forEach((key) => {
            setError(key as keyof FormData, {
              type: "manual",
              message: apiErrors[key][0],
            });
          });
        }
      });
  };

  return (
    <CustomDialog
      key={selectedUser ? `edit-${selectedUser.id}` : "new"}
      open={isFormOpen}
      onClose={() => toggleForm(false)}
      title={selectedUser ? "Editar Usuario" : "Nuevo Usuario"}
      actions={
        <>
          <Button onClick={() => toggleForm(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            {selectedUser ? "Actualizar" : "Crear"}
          </Button>
        </>
      }
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nombre"
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            margin="normal"
          />
        )}
      />
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Usuario"
            error={!!errors.username}
            helperText={errors.username?.message}
            fullWidth
            margin="normal"
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            margin="normal"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Contraseña"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            margin="normal"
          />
        )}
      />
      <Controller
        name="avatar"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Avatar URL"
            error={!!errors.avatar}
            helperText={errors.avatar?.message}
            fullWidth
            margin="normal"
          />
        )}
      />
    </CustomDialog>
  );
}
