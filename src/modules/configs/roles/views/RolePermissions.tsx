import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/core/components/PageHeader";
import FormSection from "@/core/components/forms/FormSection";
import Spinner from "@/core/components/Spinner";
import { SaveButton } from "@/core/components/buttons";
import { CanAccess } from "@/modules/auth/components/CanAccess";
import { useRole, useRolePermissions, useSaveRolePermissions } from "../hooks/useRoles";
import type { PermissionGroup } from "../types/role.type";

/**
 * A role's permission matrix: one tab per module, one row per group, saved whole in a single request.
 */
export default function RolePermissions() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { uuid = "" } = useParams<{ uuid: string }>();

  const { data: role } = useRole(uuid);
  const { data, isLoading } = useRolePermissions(uuid);
  const savePermissions = useSaveRolePermissions(uuid);

  const [currentTab, setCurrentTab] = useState(0);
  // null means "whatever the server says"; becomes a Set as soon as a checkbox is touched.
  const [edited, setEdited] = useState<Set<string> | null>(null);

  const assigned = useMemo(() => new Set(data?.assigned ?? []), [data?.assigned]);
  const selected = edited ?? assigned;

  const modules = useMemo(() => data?.data ?? [], [data?.data]);
  const activeModule = modules[currentTab];

  const toggle = (uuid: string) => {
    setEdited((prev) => {
      const next = new Set(prev ?? assigned);
      if (next.has(uuid)) next.delete(uuid);
      else next.add(uuid);
      return next;
    });
  };

  /** Checks or unchecks all permissions of a row at once. */
  const toggleGroup = (group: PermissionGroup, checked: boolean) => {
    setEdited((prev) => {
      const next = new Set(prev ?? assigned);
      group.permissions.forEach((permission) => {
        if (checked) next.add(permission.uuid);
        else next.delete(permission.uuid);
      });
      return next;
    });
  };

  const handleSave = () => {
    // After saving, falls back to the server response, already invalidated.
    savePermissions.mutate(Array.from(selected), { onSuccess: () => setEdited(null) });
  };

  if (isLoading) return <Spinner minHeight="calc(100vh - 170px)" />;

  return (
    <Box>
      <PageHeader
        title={t("roles:permissionsTitle", { role: role?.displayName ?? "" })}
        subtitle={t("roles:permissionsSubtitle")}
        actions={
          <>
            <Button variant="text" onClick={() => void navigate("/configs/roles")}>
              {t("common:cancel")}
            </Button>
            <CanAccess permission="update-roles">
              <SaveButton
                onClick={handleSave}
                loading={savePermissions.isPending}
                disabled={edited === null}
              />
            </CanAccess>
          </>
        }
      />

      <Tabs
        value={currentTab}
        onChange={(_, value: number) => setCurrentTab(value)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2.5 }}
      >
        {modules.map((module) => (
          <Tab key={module.module ?? "general"} label={module.label} />
        ))}
      </Tabs>

      <FormSection title={activeModule?.label}>
        {activeModule?.groups.map((group) => {
          const allChecked = group.permissions.every((p) => selected.has(p.uuid));
          const someChecked = group.permissions.some((p) => selected.has(p.uuid));

          return (
            <Box key={group.group}>
              {/* The group takes the first column and its permissions grid on the right. */}
              <Grid container alignItems="flex-start" sx={{ py: 2 }}>
                <Grid size={{ xs: 12, md: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={allChecked}
                        indeterminate={someChecked && !allChecked}
                        onChange={(event) => toggleGroup(group, event.target.checked)}
                      />
                    }
                    label={
                      <Typography variant="subtitle2" fontWeight={700}>
                        {group.label}
                      </Typography>
                    }
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 9 }}>
                  <Grid container>
                    {group.permissions.map((permission) => (
                      <Grid key={permission.uuid} size={{ xs: 12, sm: 6, md: 4 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              checked={selected.has(permission.uuid)}
                              onChange={() => toggle(permission.uuid)}
                            />
                          }
                          label={permission.label}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
            </Box>
          );
        })}
      </FormSection>
    </Box>
  );
}
