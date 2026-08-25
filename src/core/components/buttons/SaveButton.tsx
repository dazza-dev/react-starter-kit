import { Button, CircularProgress, type ButtonProps } from "@mui/material";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";

interface SaveButtonProps extends Omit<ButtonProps, "children"> {
  loading?: boolean;
  label?: string;
  /** `null` leaves the button without an icon. */
  icon?: ReactNode;
}

export const SaveButton = ({
  loading = false,
  label,
  icon = <IconDeviceFloppy />,
  disabled,
  ...props
}: SaveButtonProps) => {
  const { t } = useTranslation();
  const buttonLabel = label || t("common:actions.save");

  return (
    <Button
      variant="contained"
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : icon}
      {...props}
    >
      {buttonLabel}
    </Button>
  );
};
