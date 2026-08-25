import { useEffect } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CustomDialog } from "@/core/components/modals";
import FormInput from "@/core/components/forms/FormInput";
import FormSelect from "@/core/components/forms/FormSelect";
import { CancelButton, SaveButton } from "@/core/components/buttons";
import { useRoleOptions } from "@/core/hooks/useOptions";
import { useSaveUser, useUser } from "@/modules/users/hooks/useUsers";
import type { UserForm } from "@/modules/users/types/user.type";

interface UserFormModalProps {
  open: boolean;
  // Empty string = creating; with a uuid = editing.
  uuid: string;
  onClose: () => void;
}

const EMPTY_FORM: UserForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  username: "",
  password: "",
  status: "active",
  roleUuids: [],
};

/**
 * User creation and editing, loading the user before showing the form when editing.
 */
export default function UserFormModal({ open, uuid, onClose }: UserFormModalProps) {
  const { t } = useTranslation();
  const isCreating = uuid === "";
  const { data: user, isLoading: loadingUser } = useUser(open ? uuid : "");
  const { data: roles = [], isLoading: loadingRoles } = useRoleOptions();
  const saveUser = useSaveUser();

  const schema = z.object({
    firstName: z.string().min(1, t("validation:required")),
    lastName: z.string(),
    email: z.email({ message: t("validation:invalid_email") }),
    phone: z.string(),
    username: z.string().min(3, t("validation:min_chars", { count: 3 })),
    // The password is required when creating; when editing, empty means "don't change it".
    password: isCreating
      ? z.string().min(8, t("validation:min_chars", { count: 8 }))
      : z.union([z.literal(""), z.string().min(8, t("validation:min_chars", { count: 8 }))]),
    status: z.enum(["active", "inactive"]),
    roleUuids: z.array(z.string()).min(1, t("validation:required")),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<UserForm>({
    resolver: zodResolver(schema),
    defaultValues: EMPTY_FORM,
    mode: "onChange",
  });

  useEffect(() => {
    if (!open) return;

    if (isCreating) {
      reset(EMPTY_FORM);
    } else if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName ?? "",
        email: user.email,
        phone: user.phone ?? "",
        username: user.username,
        password: "",
        status: user.status,
        roleUuids: user.roles?.map((role) => role.uuid) ?? [],
      });
    }
  }, [open, isCreating, user, reset]);

  const onSubmit = (form: UserForm) => {
    saveUser.mutate({ uuid, form }, { onSuccess: onClose });
  };

  const statusOptions = [
    { id: "active", name: t("common:active") },
    { id: "inactive", name: t("common:inactive") },
  ];

  const contentLoading = !isCreating && loadingUser;

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      contentLoading={contentLoading}
      title={isCreating ? t("users:create.title") : t("users:edit.title")}
      actions={
        <>
          <CancelButton onClick={onClose} />
          <SaveButton
            onClick={handleSubmit(onSubmit)}
            icon={null}
            loading={saveUser.isPending}
            disabled={contentLoading || !isValid}
          />
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <FormInput
            name="firstName"
            control={control}
            label={t("users:form.firstName")}
            size={{ xs: 12, md: 6 }}
            required
          />
          <FormInput
            name="lastName"
            control={control}
            label={t("users:form.lastName")}
            size={{ xs: 12, md: 6 }}
          />
          <FormInput
            name="email"
            control={control}
            label={t("users:form.email")}
            size={{ xs: 12, md: 6 }}
            required
          />
          <FormInput
            name="phone"
            control={control}
            label={t("users:form.phone")}
            size={{ xs: 12, md: 6 }}
          />
          <FormSelect
            name="roleUuids"
            control={control}
            label={t("users:form.roles")}
            options={roles.map((role) => ({ id: role.uuid, name: role.name }))}
            loading={loadingRoles}
            multiple
            size={{ xs: 12, md: 6 }}
            required
          />
          <FormSelect
            name="status"
            control={control}
            label={t("users:form.status")}
            options={statusOptions}
            size={{ xs: 12, md: 6 }}
            required
          />
          <FormInput
            name="username"
            control={control}
            label={t("users:form.username")}
            size={{ xs: 12, md: 6 }}
            required
          />
          <FormInput
            name="password"
            control={control}
            label={isCreating ? t("users:form.password") : t("users:form.passwordOptional")}
            type="password"
            size={{ xs: 12, md: 6 }}
            required={isCreating}
          />
        </Grid>
        {/* Allows submitting with Enter; the visible button lives in the dialog's footer. */}
        <button type="submit" hidden />
      </form>
    </CustomDialog>
  );
}
