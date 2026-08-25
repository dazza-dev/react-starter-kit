import { useMemo } from "react";
import { Chip, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { GridColDef } from "@mui/x-data-grid";
import { DeleteIconButton, EditButton, RestoreIconButton } from "@/core/components/buttons";
import { CanAccess } from "@/modules/auth/components/CanAccess";
import type { User } from "@/modules/users/types/user.type";

interface Options {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onRestore: (user: User) => void;
}

/**
 * Users table columns.
 */
export function useUserColumns({ onEdit, onDelete, onRestore }: Options): GridColDef<User>[] {
  const { t } = useTranslation();

  return useMemo(
    () => [
      {
        // Sorts by first name even though the cell shows the full name.
        field: "firstName",
        headerName: t("users:fields.name"),
        flex: 1,
        minWidth: 180,
        renderCell: ({ row }) => row.fullName,
      },
      {
        field: "email",
        headerName: t("users:fields.email"),
        flex: 1.2,
        minWidth: 220,
      },
      {
        field: "roles",
        headerName: t("users:fields.roles"),
        flex: 1,
        minWidth: 160,
        sortable: false,
        renderCell: ({ row }) => row.roles?.map((role) => role.name).join(", ") || "—",
      },
      {
        field: "status",
        headerName: t("users:fields.status"),
        width: 130,
        renderCell: ({ row }) => (
          <Chip
            size="small"
            label={t(row.status === "active" ? "users:statusActive" : "users:statusInactive")}
            sx={{
              bgcolor: row.status === "active" ? "success.light" : "error.light",
              color: "text.primary",
              fontWeight: 500,
            }}
          />
        ),
      },
      {
        field: "actions",
        headerName: t("users:fields.actions"),
        width: 120,
        align: "right",
        headerAlign: "right",
        sortable: false,
        renderCell: ({ row }) =>
          row.deletedAt ? (
            <CanAccess permission="update-users">
              <RestoreIconButton onClick={() => onRestore(row)} />
            </CanAccess>
          ) : (
            <Stack direction="row">
              <CanAccess permission="update-users">
                <EditButton onClick={() => onEdit(row)} />
              </CanAccess>
              <CanAccess permission="delete-users">
                <DeleteIconButton onClick={() => onDelete(row)} />
              </CanAccess>
            </Stack>
          ),
      },
    ],
    [t, onEdit, onDelete, onRestore],
  );
}
