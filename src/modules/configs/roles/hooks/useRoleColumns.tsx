import { useMemo } from "react";
import { Button, Stack, alpha } from "@mui/material";
import { IconShieldLock } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import type { GridColDef } from "@mui/x-data-grid";
import { DeleteIconButton, EditButton, RestoreIconButton } from "@/core/components/buttons";
import { CanAccess } from "@/modules/auth/components/CanAccess";
import type { Role } from "../types/role.type";

interface Options {
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
  onRestore: (role: Role) => void;
  onPermissions: (role: Role) => void;
}

/**
 * Roles table columns.
 */
export function useRoleColumns({
  onEdit,
  onDelete,
  onRestore,
  onPermissions,
}: Options): GridColDef<Role>[] {
  const { t } = useTranslation();

  return useMemo(
    () => [
      {
        field: "displayName",
        headerName: t("roles:fields.displayName"),
        flex: 1,
        minWidth: 180,
      },
      {
        field: "description",
        headerName: t("roles:fields.description"),
        flex: 1.4,
        minWidth: 240,
      },
      {
        field: "permissions",
        headerName: t("roles:permissionsLabel"),
        width: 160,
        sortable: false,
        renderCell: ({ row }) => (
          <CanAccess permission="update-roles">
            <Button
              size="small"
              variant="text"
              color="primary"
              startIcon={<IconShieldLock size={16} />}
              onClick={() => onPermissions(row)}
              // Background at 12% of the primary color.
              sx={(theme) => ({
                backgroundColor: alpha(theme.palette.primary.main, 0.12),
                "&:hover": { backgroundColor: alpha(theme.palette.primary.main, 0.2) },
              })}
            >
              {t("roles:permissionsLabel")}
            </Button>
          </CanAccess>
        ),
      },
      {
        field: "actions",
        headerName: t("roles:fields.actions"),
        width: 120,
        align: "right",
        headerAlign: "right",
        sortable: false,
        renderCell: ({ row }) =>
          row.deletedAt ? (
            <CanAccess permission="update-roles">
              <RestoreIconButton onClick={() => onRestore(row)} />
            </CanAccess>
          ) : (
            <Stack direction="row">
              <CanAccess permission="update-roles">
                <EditButton onClick={() => onEdit(row)} />
              </CanAccess>
              <CanAccess permission="delete-roles">
                <DeleteIconButton onClick={() => onDelete(row)} />
              </CanAccess>
            </Stack>
          ),
      },
    ],
    [t, onEdit, onDelete, onRestore, onPermissions],
  );
}
