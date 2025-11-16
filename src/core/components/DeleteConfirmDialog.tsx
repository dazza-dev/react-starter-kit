import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  AlertTitle,
  Typography,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import type { ReactNode } from "react";

type DeleteConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  confirming?: boolean;
};

export default function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Yes, delete",
  cancelLabel = "No, keep it",
  confirming = false,
}: DeleteConfirmDialogProps): JSX.Element {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      {description ? (
        <DialogContent sx={{ mt: 1 }}>
          <Alert
            severity="error"
            icon={<WarningAmberRoundedIcon />}
            sx={{
              borderRadius: 1,
            }}
          >
            <AlertTitle>Warning</AlertTitle>
            <Typography variant="body2">{description}</Typography>
          </Alert>
        </DialogContent>
      ) : null}
      <DialogActions>
        <Button onClick={onClose} disabled={confirming} variant="contained">
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