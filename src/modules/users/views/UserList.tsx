import { useCallback, useState } from "react";
import { Box, Button, Card, CardContent, Divider } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/core/components/PageHeader";
import DataTable from "@/core/components/DataTable";
import DataSearch from "@/core/components/DataSearch";
import { DeleteConfirmDialog } from "@/core/components/modals";
import { useDataTable } from "@/core/hooks/useDataTable";
import { CanAccess } from "@/modules/auth/components/CanAccess";
import { useDeleteUser, useRestoreUser, useUsers } from "@/modules/users/hooks/useUsers";
import { useUserColumns } from "@/modules/users/hooks/useUserColumns";
import UserFormModal from "./UserFormModal";
import type { User } from "@/modules/users/types/user.type";

/**
 * User list: the full example of the module pattern (table, search, modal and delete).
 */
export default function UserList() {
  const { t } = useTranslation();
  const { params, paginationModel, onPaginationModelChange, onSortModelChange, onSearch } =
    useDataTable({ sortBy: [{ key: "firstName", order: "asc" }] });

  const { data, isLoading } = useUsers(params);
  const deleteUser = useDeleteUser();
  const restoreUser = useRestoreUser();

  const [formUuid, setFormUuid] = useState<string | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const onEdit = useCallback((user: User) => setFormUuid(user.uuid), []);
  const onDelete = useCallback((user: User) => setUserToDelete(user), []);
  const onRestore = useCallback((user: User) => restoreUser.mutate(user.uuid), [restoreUser]);

  const columns = useUserColumns({ onEdit, onDelete, onRestore });

  const confirmDelete = () => {
    if (!userToDelete) return;
    deleteUser.mutate(userToDelete.uuid, { onSuccess: () => setUserToDelete(null) });
  };

  return (
    <Box>
      <PageHeader
        title={t("users:title")}
        subtitle={t("users:subtitle")}
        actions={
          <CanAccess permission="create-users">
            <Button
              variant="contained"
              startIcon={<IconPlus size={18} />}
              onClick={() => setFormUuid("")}
            >
              {t("users:create.button")}
            </Button>
          </CanAccess>
        }
      />

      <Card>
        {/* The search box lives in the card's header. */}
        <Box sx={{ px: 3, pt: 3, pb: 2 }}>
          <DataSearch onSearch={onSearch} placeholder={t("users:searchUsers")} size="small" />
        </Box>
        <Divider />
        <CardContent>
          <DataTable
            rows={data?.data ?? []}
            columns={columns}
            loading={isLoading}
            getRowId={(row) => row.uuid}
            rowCount={data?.meta.total ?? 0}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={onPaginationModelChange}
            onSortModelChange={onSortModelChange}
          />
        </CardContent>
      </Card>

      {formUuid !== null && (
        <UserFormModal open uuid={formUuid} onClose={() => setFormUuid(null)} />
      )}

      <DeleteConfirmDialog
        open={userToDelete !== null}
        onClose={() => setUserToDelete(null)}
        onConfirm={confirmDelete}
        confirming={deleteUser.isPending}
        title={t("users:delete.title")}
        description={t("users:delete.description", { name: userToDelete?.fullName })}
      />
    </Box>
  );
}
