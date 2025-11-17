import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useCreateUser, useUpdateUser } from "@/modules/users/hooks/useUsers";
import { useUserStore } from "@/modules/users/store/useUserStore";
import CustomDialog from "@/core/components/modals/CustomDialog";

export default function UserFormDialog() {
  const { isFormOpen, toggleForm, selectedUser } = useUserStore();
  const [form, setForm] = useState({
    name: selectedUser?.name ?? "",
    email: selectedUser?.email ?? "",
    role: selectedUser?.role ?? "",
  });

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const handleSubmit = (): void => {
    if (selectedUser) updateUser.mutate({ ...form, id: selectedUser.id });
    else createUser.mutate(form);
    toggleForm(false);
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
          <Button variant="contained" onClick={handleSubmit}>
            {selectedUser ? "Actualizar" : "Crear"}
          </Button>
        </>
      }
    >
      <TextField
        label="Nombre"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <TextField
        label="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <TextField
        label="Rol"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      />
    </CustomDialog>
  );
}
