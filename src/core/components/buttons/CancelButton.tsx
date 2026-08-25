import { Button, type ButtonProps } from "@mui/material";
import { useTranslation } from "react-i18next";

interface CancelButtonProps extends Omit<ButtonProps, "children"> {
  label?: string;
}

export const CancelButton = ({ label, ...props }: CancelButtonProps) => {
  const { t } = useTranslation();
  const buttonLabel = label || t("common:actions.cancel");

  return (
    <Button color="inherit" {...props}>
      {buttonLabel}
    </Button>
  );
};
