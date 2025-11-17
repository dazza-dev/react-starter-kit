import { Dialog, DialogTitle, DialogContent, DialogActions, type DialogProps, type DialogContentProps } from "@mui/material";
import type { ReactNode } from "react";

type CustomDialogProps = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  maxWidth?: DialogProps["maxWidth"];
  fullWidth?: boolean;
  contentSx?: DialogContentProps["sx"];
};

export default function CustomDialog({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = "sm",
  fullWidth = true,
  contentSx,
}: CustomDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth={fullWidth} maxWidth={maxWidth}>
      {title ? <DialogTitle>{title}</DialogTitle> : null}
      <DialogContent
        sx={
          typeof contentSx === "function"
            ? (theme) => ({
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 1,
                ...contentSx(theme),
              })
            : {
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 1,
                ...(contentSx ?? {}),
              }
        }
      >
        {children}
      </DialogContent>
      {actions ? <DialogActions>{actions}</DialogActions> : null}
    </Dialog>
  );
}