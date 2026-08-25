import { IconButton, Tooltip, type IconButtonProps } from "@mui/material";
import { IconTrash } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface DeleteIconButtonProps extends Omit<IconButtonProps, "size" | "color"> {
  onClick: () => void;
  tooltip?: string;
  size?: "small" | "medium" | "large";
}

export const DeleteIconButton = ({
  onClick,
  tooltip,
  size = "small",
  ...props
}: DeleteIconButtonProps) => {
  const { t } = useTranslation();
  const title = tooltip || t("common:delete");

  return (
    <Tooltip title={title}>
      <IconButton size={size} onClick={onClick} color="error" {...props}>
        <IconTrash size={18} />
      </IconButton>
    </Tooltip>
  );
};
