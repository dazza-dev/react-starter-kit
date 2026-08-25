import { IconButton, Tooltip, type IconButtonProps } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { useTranslation } from "react-i18next";

interface RestoreIconButtonProps extends Omit<IconButtonProps, "size" | "color"> {
  onClick: () => void;
  tooltip?: string;
  size?: "small" | "medium" | "large";
}

export const RestoreIconButton = ({
  onClick,
  tooltip,
  size = "small",
  ...props
}: RestoreIconButtonProps) => {
  const { t } = useTranslation();
  const title = tooltip || t("common:actions.restore");

  return (
    <Tooltip title={title}>
      <IconButton size={size} onClick={onClick} color="success" {...props}>
        <RestoreIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};
