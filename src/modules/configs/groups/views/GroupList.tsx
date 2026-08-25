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
import { useDeleteGroup, useGroups, useRestoreGroup } from "../hooks/useGroups";
import { useGroupColumns } from "../hooks/useGroupColumns";
import GroupFormModal from "./GroupFormModal";
import type { Group } from "../types/group.type";

/**
 * Group list.
 */
export default function GroupList() {
  const { t } = useTranslation();
  const { params, paginationModel, onPaginationModelChange, onSortModelChange, onSearch } =
    useDataTable({ sortBy: [{ key: "name", order: "asc" }] });

  const { data, isLoading } = useGroups(params);
  const deleteGroup = useDeleteGroup();
  const restoreGroup = useRestoreGroup();

  const [formUuid, setFormUuid] = useState<string | null>(null);
  const [groupToDelete, setGroupToDelete] = useState<Group | null>(null);

  const onEdit = useCallback((group: Group) => setFormUuid(group.uuid), []);
  const onDelete = useCallback((group: Group) => setGroupToDelete(group), []);
  const onRestore = useCallback((group: Group) => restoreGroup.mutate(group.uuid), [restoreGroup]);

  const columns = useGroupColumns({ onEdit, onDelete, onRestore });

  const confirmDelete = () => {
    if (!groupToDelete) return;
    deleteGroup.mutate(groupToDelete.uuid, { onSuccess: () => setGroupToDelete(null) });
  };

  return (
    <Box>
      <PageHeader
        title={t("groups:title")}
        subtitle={t("groups:subtitle")}
        actions={
          <CanAccess permission="create-groups">
            <Button
              variant="contained"
              startIcon={<IconPlus size={18} />}
              onClick={() => setFormUuid("")}
            >
              {t("groups:create.button")}
            </Button>
          </CanAccess>
        }
      />

      <Card>
        {/* The search box lives in the card's header. */}
        <Box sx={{ px: 3, pt: 3, pb: 2 }}>
          <DataSearch onSearch={onSearch} placeholder={t("groups:searchGroups")} size="small" />
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
        <GroupFormModal open uuid={formUuid} onClose={() => setFormUuid(null)} />
      )}

      <DeleteConfirmDialog
        open={groupToDelete !== null}
        onClose={() => setGroupToDelete(null)}
        onConfirm={confirmDelete}
        confirming={deleteGroup.isPending}
        title={t("groups:delete.title")}
        description={t("groups:delete.description", { name: groupToDelete?.name })}
      />
    </Box>
  );
}
