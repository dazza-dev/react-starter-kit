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
  confirmLabel = "Yes, delete",
  cancelLabel = "Cancel",
  confirming = false,
  maxWidth = "xs",
  fullWidth = true,
}: DeleteConfirmDialogProps): ReactElement {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <DialogContent sx={{ mt: 1, textAlign: "center" }}>
        <WarningAmberRoundedIcon />
        <DialogTitle>{title}</DialogTitle>
        {description ? (
          <Typography variant="body1">{description}</Typography>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          disabled={confirming}
          color="secondary"
          variant="outlined"
        >
          {cancelLabel}
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
          disabled={confirming}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
