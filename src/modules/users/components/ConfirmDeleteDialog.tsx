import { useDeleteUser } from "@/modules/users/hooks/useUsers";
import { useUserStore } from "@/modules/users/store/useUserStore";
import DeleteConfirmDialog from "@/core/components/modals/DeleteConfirmDialog";
import type { ReactElement } from "react";

export default function ConfirmDeleteDialog(): ReactElement {
  const { isDeleteConfirmOpen, toggleDeleteConfirm, selectedUser } =
    useUserStore();
  const deleteUser = useDeleteUser();

  const handleConfirm = (): void => {
    if (selectedUser) deleteUser.mutate(selectedUser.id);
    toggleDeleteConfirm(false);
  };

  return (
    <DeleteConfirmDialog
      open={isDeleteConfirmOpen}
      onClose={() => toggleDeleteConfirm(false)}
      onConfirm={handleConfirm}
      title={"¿Seguro que deseas eliminar este usuario?"}
      description={
        "Esta acción es irreversible. Todos los datos del usuario serán eliminados permanentemente."
      }
      cancelLabel={"Cancelar"}
      confirmLabel={"Sí, eliminar"}
    />
  );
}
