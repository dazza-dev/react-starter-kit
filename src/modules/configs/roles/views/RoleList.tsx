import { useCallback, useState } from "react";
import { Box, Button, Card, CardContent, Divider } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/core/components/PageHeader";
import DataTable from "@/core/components/DataTable";
import DataSearch from "@/core/components/DataSearch";
import { DeleteConfirmDialog } from "@/core/components/modals";
import { useDataTable } from "@/core/hooks/useDataTable";
import { CanAccess } from "@/modules/auth/components/CanAccess";
import { useDeleteRole, useRestoreRole, useRoles } from "../hooks/useRoles";
import { useRoleColumns } from "../hooks/useRoleColumns";
import RoleFormModal from "./RoleFormModal";
import type { Role } from "../types/role.type";

/**
 * Role list, with the permissions matrix on its own screen.
 */
export default function RoleList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { params, paginationModel, onPaginationModelChange, onSortModelChange, onSearch } =
    useDataTable({ sortBy: [{ key: "displayName", order: "asc" }] });

  const { data, isLoading } = useRoles(params);
  const deleteRole = useDeleteRole();
  const restoreRole = useRestoreRole();

  const [formUuid, setFormUuid] = useState<string | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  const onEdit = useCallback((role: Role) => setFormUuid(role.uuid), []);
  const onDelete = useCallback((role: Role) => setRoleToDelete(role), []);
  const onRestore = useCallback((role: Role) => restoreRole.mutate(role.uuid), [restoreRole]);
  const onPermissions = useCallback(
    (role: Role) => void navigate(`/configs/roles/${role.uuid}/permissions`),
    [navigate],
  );

  const columns = useRoleColumns({ onEdit, onDelete, onRestore, onPermissions });

  const confirmDelete = () => {
    if (!roleToDelete) return;
    deleteRole.mutate(roleToDelete.uuid, { onSuccess: () => setRoleToDelete(null) });
  };

  return (
    <Box>
      <PageHeader
        title={t("roles:title")}
        subtitle={t("roles:subtitle")}
        actions={
          <CanAccess permission="create-roles">
            <Button
              variant="contained"
              startIcon={<IconPlus size={18} />}
              onClick={() => setFormUuid("")}
            >
              {t("roles:create.button")}
            </Button>
          </CanAccess>
        }
      />

      <Card>
        {/* The search box lives in the card's header. */}
        <Box sx={{ px: 3, pt: 3, pb: 2 }}>
          <DataSearch onSearch={onSearch} placeholder={t("roles:searchRoles")} size="small" />
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
        <RoleFormModal open uuid={formUuid} onClose={() => setFormUuid(null)} />
      )}

      <DeleteConfirmDialog
        open={roleToDelete !== null}
        onClose={() => setRoleToDelete(null)}
        onConfirm={confirmDelete}
        confirming={deleteRole.isPending}
        title={t("roles:delete.title")}
        description={t("roles:delete.description", { name: roleToDelete?.displayName })}
      />
    </Box>
  );
}
