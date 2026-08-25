import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  type DialogProps,
  CircularProgress,
} from "@mui/material";
import type { ReactElement, ReactNode } from "react";
import { useTranslation } from "react-i18next";

type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  confirming?: boolean;
  confirmColor?: "primary" | "error" | "warning" | "success" | "info";
  icon?: ReactNode;
  maxWidth?: DialogProps["maxWidth"];
  fullWidth?: boolean;
};

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel,
  cancelLabel,
  confirming = false,
  confirmColor = "primary",
  icon,
  maxWidth = "xs",
  fullWidth = true,
}: ConfirmDialogProps): ReactElement {
  const { t } = useTranslation();
  const finalConfirmLabel = confirmLabel || t("common:confirm");
  const finalCancelLabel = cancelLabel || t("common:cancel");

  const handleClose = () => {
    if (!confirming) {
      onClose();
    }
  };

  return (
    // Closes only via its own buttons: no backdrop, no Escape key.
    <Dialog open={open} disableEscapeKeyDown fullWidth={fullWidth} maxWidth={maxWidth}>
      <DialogContent sx={{ mt: 1, textAlign: "center" }}>
        {icon}
        <DialogTitle>{title}</DialogTitle>
        {description && <Typography variant="body1">{description}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={confirming} color="inherit" variant="outlined">
          {finalCancelLabel}
        </Button>
        <Button
          color={confirmColor}
          variant="contained"
          onClick={onConfirm}
          disabled={confirming}
          startIcon={confirming ? <CircularProgress size={20} /> : undefined}
        >
          {finalConfirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
