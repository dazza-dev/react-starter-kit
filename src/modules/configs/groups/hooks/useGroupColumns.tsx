import { useMemo } from "react";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { GridColDef } from "@mui/x-data-grid";
import { DeleteIconButton, EditButton, RestoreIconButton } from "@/core/components/buttons";
import { CanAccess } from "@/modules/auth/components/CanAccess";
import type { Group } from "../types/group.type";

interface Options {
  onEdit: (group: Group) => void;
  onDelete: (group: Group) => void;
  onRestore: (group: Group) => void;
}

/**
 * Groups table columns.
 */
export function useGroupColumns({ onEdit, onDelete, onRestore }: Options): GridColDef<Group>[] {
  const { t } = useTranslation();

  return useMemo(
    () => [
      {
        field: "name",
        headerName: t("groups:fields.name"),
        flex: 1,
        minWidth: 200,
      },
      {
        field: "actions",
        headerName: "",
        width: 120,
        sortable: false,
        renderCell: ({ row }) =>
          row.deletedAt ? (
            <CanAccess permission="update-groups">
              <RestoreIconButton onClick={() => onRestore(row)} />
            </CanAccess>
          ) : (
            <Stack direction="row">
              <CanAccess permission="update-groups">
                <EditButton onClick={() => onEdit(row)} />
              </CanAccess>
              <CanAccess permission="delete-groups">
                <DeleteIconButton onClick={() => onDelete(row)} />
              </CanAccess>
            </Stack>
          ),
      },
    ],
    [t, onEdit, onDelete, onRestore],
  );
}
