import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  type DialogProps,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import type { ReactElement, ReactNode } from "react";
import { useTranslation } from "react-i18next";

type DeleteConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  confirming?: boolean;
  maxWidth?: DialogProps["maxWidth"];
  fullWidth?: boolean;
};

export default function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel,
  cancelLabel,
  confirming = false,
  maxWidth = "xs",
  fullWidth = true,
}: DeleteConfirmDialogProps): ReactElement {
  const { t } = useTranslation();
  const finalConfirmLabel = confirmLabel || t("common:actions.confirmDelete");
  const finalCancelLabel = cancelLabel || t("common:actions.cancel");

  return (
    // Closes only via its own buttons: no backdrop, no Escape key.
    <Dialog open={open} disableEscapeKeyDown fullWidth={fullWidth} maxWidth={maxWidth}>
      <DialogContent sx={{ mt: 1, textAlign: "center" }}>
        <WarningAmberRoundedIcon />
        <DialogTitle>{title}</DialogTitle>
        {description ? <Typography variant="body1">{description}</Typography> : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={confirming} color="secondary" variant="outlined">
          {finalCancelLabel}
        </Button>
        <Button color="error" variant="contained" onClick={onConfirm} disabled={confirming}>
          {finalConfirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
