import { IconButton, Tooltip, type IconButtonProps } from "@mui/material";
import { IconPencil } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface EditButtonProps extends Omit<IconButtonProps, "size" | "color"> {
  onClick: () => void;
  tooltip?: string;
  size?: "small" | "medium" | "large";
}

export const EditButton = ({ onClick, tooltip, size = "small", ...props }: EditButtonProps) => {
  const { t } = useTranslation();
  const title = tooltip || t("common:edit");

  return (
    <Tooltip title={title}>
      <IconButton size={size} onClick={onClick} color="primary" {...props}>
        <IconPencil size={18} />
      </IconButton>
    </Tooltip>
  );
};
