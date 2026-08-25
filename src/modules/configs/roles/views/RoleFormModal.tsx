import { useEffect } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CustomDialog } from "@/core/components/modals";
import FormInput from "@/core/components/forms/FormInput";
import { CancelButton, SaveButton } from "@/core/components/buttons";
import { useRole, useSaveRole } from "../hooks/useRoles";
import type { RoleForm } from "../types/role.type";

interface RoleFormModalProps {
  open: boolean;
  // Empty string = creating; with a uuid = editing.
  uuid: string;
  onClose: () => void;
}

/**
 * Role creation and editing; the backend generates the slug from the display name.
 */
export default function RoleFormModal({ open, uuid, onClose }: RoleFormModalProps) {
  const { t } = useTranslation();
  const isCreating = uuid === "";
  const { data: role, isLoading: loadingRole } = useRole(open ? uuid : "");
  const saveRole = useSaveRole();

  const schema = z.object({
    displayName: z.string().min(1, t("validation:required")),
    description: z.string(),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<RoleForm>({
    resolver: zodResolver(schema),
    defaultValues: { displayName: "", description: "" },
    mode: "onChange",
  });

  useEffect(() => {
    if (!open) return;
    reset(
      isCreating
        ? { displayName: "", description: "" }
        : { displayName: role?.displayName ?? "", description: role?.description ?? "" },
    );
  }, [open, isCreating, role, reset]);

  const onSubmit = (form: RoleForm) => {
    saveRole.mutate({ uuid, form }, { onSuccess: onClose });
  };

  const contentLoading = !isCreating && loadingRole;

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      contentLoading={contentLoading}
      title={isCreating ? t("roles:create.title") : t("roles:edit.title")}
      actions={
        <>
          <CancelButton onClick={onClose} />
          <SaveButton
            onClick={handleSubmit(onSubmit)}
            icon={null}
            loading={saveRole.isPending}
            disabled={contentLoading || !isValid}
          />
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <FormInput
            name="displayName"
            control={control}
            label={t("roles:fields.displayName")}
            required
          />
          <FormInput name="description" control={control} label={t("roles:fields.description")} />
        </Grid>
        <button type="submit" hidden />
      </form>
    </CustomDialog>
  );
}
