import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { useDeleteUser } from "@/modules/users/hooks/useUsers";
import { useUserStore } from "@/modules/users/store/useUserStore";

export default function ConfirmDeleteDialog() {
  const { isDeleteConfirmOpen, toggleDeleteConfirm, selectedUser } =
    useUserStore();
  const deleteUser = useDeleteUser();

  const handleConfirm = () => {
    if (selectedUser) deleteUser.mutate(selectedUser.id);
    toggleDeleteConfirm(false);
  };

  return (
    <Dialog
      open={isDeleteConfirmOpen}
      onClose={() => toggleDeleteConfirm(false)}
    >
      <DialogTitle>¿Seguro que deseas eliminar este usuario?</DialogTitle>
      <DialogActions>
        <Button onClick={() => toggleDeleteConfirm(false)}>Cancelar</Button>
        <Button color="error" variant="contained" onClick={handleConfirm}>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
