import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useCreateUser, useUpdateUser } from "@/modules/users/hooks/useUsers";
import { useUserStore } from "@/modules/users/store/useUserStore";

export default function UserFormDialog() {
  const { isFormOpen, toggleForm, selectedUser } = useUserStore();
  const [form, setForm] = useState({ name: "", email: "", role: "" });

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  useEffect(() => {
    if (selectedUser) setForm(selectedUser);
    else setForm({ name: "", email: "", role: "" });
  }, [selectedUser]);

  const handleSubmit = () => {
    if (selectedUser) updateUser.mutate({ ...form, id: selectedUser.id });
    else createUser.mutate(form);
    toggleForm(false);
  };

  return (
    <Dialog
      open={isFormOpen}
      onClose={() => toggleForm(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {selectedUser ? "Editar Usuario" : "Nuevo Usuario"}
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={() => toggleForm(false)}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {selectedUser ? "Actualizar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
