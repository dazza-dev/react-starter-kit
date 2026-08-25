import { useEffect } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CustomDialog } from "@/core/components/modals";
import FormInput from "@/core/components/forms/FormInput";
import { CancelButton, SaveButton } from "@/core/components/buttons";
import { useGroup, useSaveGroup } from "../hooks/useGroups";
import type { GroupForm } from "../types/group.type";

interface GroupFormModalProps {
  open: boolean;
  // Empty string = creating; with a uuid = editing.
  uuid: string;
  onClose: () => void;
}

/**
 * Group creation and editing; the smallest example of the module pattern.
 */
export default function GroupFormModal({ open, uuid, onClose }: GroupFormModalProps) {
  const { t } = useTranslation();
  const isCreating = uuid === "";
  const { data: group, isLoading: loadingGroup } = useGroup(open ? uuid : "");
  const saveGroup = useSaveGroup();

  const schema = z.object({
    name: z.string().min(1, t("validation:required")),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<GroupForm>({
    resolver: zodResolver(schema),
    defaultValues: { name: "" },
    mode: "onChange",
  });

  useEffect(() => {
    if (!open) return;
    reset({ name: isCreating ? "" : (group?.name ?? "") });
  }, [open, isCreating, group, reset]);

  const onSubmit = (form: GroupForm) => {
    saveGroup.mutate({ uuid, form }, { onSuccess: onClose });
  };

  const contentLoading = !isCreating && loadingGroup;

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      contentLoading={contentLoading}
      title={isCreating ? t("groups:create.title") : t("groups:edit.title")}
      actions={
        <>
          <CancelButton onClick={onClose} />
          <SaveButton
            onClick={handleSubmit(onSubmit)}
            icon={null}
            loading={saveGroup.isPending}
            disabled={contentLoading || !isValid}
          />
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <FormInput name="name" control={control} label={t("groups:fields.name")} required />
        </Grid>
        <button type="submit" hidden />
      </form>
    </CustomDialog>
  );
}
