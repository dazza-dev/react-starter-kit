import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
  Typography,
  type DialogProps,
  type DialogContentProps,
} from "@mui/material";
import { IconX } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";

type CustomDialogProps = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  /** Replaces the content with a spinner while the form's data is loading. */
  contentLoading?: boolean;
  /** MUI breakpoint or a fixed width in pixels. */
  maxWidth?: DialogProps["maxWidth"] | number;
  fullWidth?: boolean;
  contentSx?: DialogContentProps["sx"];
};

export default function CustomDialog({
  open,
  onClose,
  title,
  children,
  actions,
  contentLoading = false,
  maxWidth = 500,
  fullWidth = true,
  contentSx,
}: CustomDialogProps) {
  const { t } = useTranslation();
  const fixedWidth = typeof maxWidth === "number" ? maxWidth : undefined;

  return (
    <Dialog
      open={open}
      // Closes only via its own buttons: no backdrop, no Escape key.
      disableEscapeKeyDown
      fullWidth={fullWidth}
      maxWidth={fixedWidth ? false : (maxWidth as DialogProps["maxWidth"])}
      slotProps={{
        paper: {
          sx: {
            display: "flex",
            flexDirection: "column",
            borderRadius: "7px",
            maxHeight: "90vh",
            ...(fixedWidth ? { maxWidth: fixedWidth } : {}),
          },
        },
      }}
    >
      {title ? (
        <DialogTitle
          sx={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            px: 3,
            pt: 2.5,
            pb: 1,
          }}
        >
          <Typography variant="h4" component="span" fontWeight={700}>
            {title}
          </Typography>
          <IconButton size="small" onClick={onClose} aria-label={t("common:actions.cancel")}>
            <IconX size={18} />
          </IconButton>
        </DialogTitle>
      ) : null}

      {/* `&&&` outranks the `padding-top: 0` MUI applies after DialogTitle. */}
      <DialogContent
        sx={[
          {
            "&&&": { px: 3, pt: 2, pb: 1 },
            flex: "1 1 auto",
            minHeight: 0,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          },
          ...(Array.isArray(contentSx) ? contentSx : [contentSx ?? {}]),
        ]}
      >
        {contentLoading ? (
          <Stack alignItems="center" justifyContent="center" py={6}>
            <CircularProgress color="primary" size={48} />
          </Stack>
        ) : (
          children
        )}
      </DialogContent>

      {actions ? (
        <DialogActions sx={{ flexShrink: 0, px: 3, pt: 1.5, pb: 2.5, gap: 1 }}>
          {actions}
        </DialogActions>
      ) : null}
    </Dialog>
  );
}
