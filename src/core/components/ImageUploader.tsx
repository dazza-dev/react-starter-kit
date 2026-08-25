import { useRef, useState } from "react";
import { Box, CircularProgress, Typography, alpha, useTheme } from "@mui/material";
import { IconPhoto, IconTrash, IconUpload } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

const MIME_LABELS: Record<string, string> = {
  "image/png": "PNG",
  "image/jpeg": "JPG",
  "image/webp": "WebP",
  "image/gif": "GIF",
  "image/svg+xml": "SVG",
};

interface ImageUploaderProps {
  value: string | null;
  onChange: (url: string | null) => void;
  uploadFn: (file: File) => Promise<string>;
  accept?: string;
  maxSizeMb?: number;
  helpText?: string;
  altText?: string;
  /** Dark backdrop in the preview, for images meant for a dark surface. */
  dark?: boolean;
  onError?: (message: string) => void;
}

/**
 * Image upload with preview, format and size validation, and an option to remove it.
 */
export default function ImageUploader({
  value,
  onChange,
  uploadFn,
  accept = "image/png,image/jpeg",
  maxSizeMb = 1,
  helpText,
  altText = "image",
  dark = false,
  onError,
}: ImageUploaderProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Allows re-selecting the same file after removing it.
  const resetInput = () => {
    if (inputRef.current) inputRef.current.value = "";
  };

  const fail = (message: string) => {
    setError(message);
    onError?.(message);
    resetInput();
  };

  // `accept` types without wildcards: the dialog's filter can be bypassed.
  const restrictedTypes = () => {
    const patterns = accept
      .split(",")
      .map((pattern) => pattern.trim())
      .filter(Boolean);
    return patterns.some((pattern) => pattern.endsWith("/*")) ? [] : patterns;
  };

  const handleFile = async (file: File) => {
    const allowed = restrictedTypes();
    if (allowed.length > 0 && !allowed.includes(file.type)) {
      const formats = allowed.map((type) => MIME_LABELS[type] ?? type).join(", ");
      fail(t("common:invalidFormat", { formats }));
      return;
    }

    if (file.size > maxSizeMb * 1024 * 1024) {
      fail(t("common:fileTooLarge", { max: maxSizeMb }));
      return;
    }

    setUploading(true);
    setError(null);
    try {
      onChange(await uploadFn(file));
    } catch {
      fail(t("common:uploadFailed"));
    } finally {
      setUploading(false);
      resetInput();
    }
  };

  const handleRemove = () => {
    onChange(null);
    resetInput();
  };

  const border = `1px solid ${theme.palette.divider}`;
  // `dark` previews an image meant for a dark surface, so it keeps its own backdrop.
  const previewBg = dark ? "#1f2937" : alpha(theme.palette.text.primary, 0.04);
  const placeholderColor = dark
    ? "rgba(255, 255, 255, 0.4)"
    : alpha(theme.palette.text.primary, 0.28);
  const overlayBg = dark ? "rgba(0, 0, 0, 0.4)" : alpha(theme.palette.background.paper, 0.7);

  const actionSx = {
    flex: 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "10px 12px",
    background: "transparent",
    border: "none",
    font: "inherit",
    fontSize: "0.875rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.15s",
    "&:disabled": { opacity: 0.45, cursor: "not-allowed" },
  } as const;

  return (
    <Box>
      <Box sx={{ border, borderRadius: "10px", overflow: "hidden", bgcolor: "background.paper" }}>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 130,
            padding: "24px 16px",
            background: previewBg,
          }}
        >
          {value ? (
            <Box
              component="img"
              src={value}
              alt={altText}
              sx={{ maxHeight: 76, maxWidth: "100%", objectFit: "contain" }}
            />
          ) : (
            <IconPhoto size={40} stroke={1.5} color={placeholderColor} />
          )}

          {uploading && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: overlayBg,
              }}
            >
              <CircularProgress color="primary" size={32} />
            </Box>
          )}
        </Box>

        <Box sx={{ display: "flex", borderTop: border }}>
          <Box
            component="button"
            type="button"
            disabled={uploading}
            onClick={() => {
              setError(null);
              inputRef.current?.click();
            }}
            sx={{
              ...actionSx,
              borderRight: border,
              color: "text.primary",
              "&:hover:not(:disabled)": { background: alpha(theme.palette.text.primary, 0.06) },
            }}
          >
            <IconUpload size={18} stroke={2} />
            <span>{t("common:change")}</span>
          </Box>

          <Box
            component="button"
            type="button"
            disabled={uploading || !value}
            onClick={handleRemove}
            sx={(theme) => ({
              ...actionSx,
              color: theme.palette.error.main,
              "&:hover:not(:disabled)": { background: alpha(theme.palette.error.main, 0.08) },
            })}
          >
            <IconTrash size={18} stroke={2} />
            <span>{t("common:remove")}</span>
          </Box>
        </Box>
      </Box>

      {helpText && (
        <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
          {helpText}
        </Typography>
      )}

      {error && (
        <Typography variant="caption" color="error.main" display="block" mt={0.5}>
          {error}
        </Typography>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />
    </Box>
  );
}
