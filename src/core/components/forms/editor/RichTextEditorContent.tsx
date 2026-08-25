import { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { Box, Typography, useTheme } from "@mui/material";
import MenuBar from "./MenuBar";

interface RichTextEditorContentProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: string;
  helperText?: string;
}

export default function RichTextEditorContent({
  value,
  onChange,
  placeholder,
  disabled,
  errorMessage,
  helperText,
}: RichTextEditorContentProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const isInternalChange = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value || "",
    editable: !disabled,
    onUpdate: ({ editor }) => {
      isInternalChange.current = true;
      onChange(editor.getHTML());
    },
  });

  // Syncs the external value with the editor, unless the change came from itself.
  useEffect(() => {
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }
    if (editor && !editor.isDestroyed && !editor.isFocused) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  const borderColor = errorMessage
    ? theme.palette.error.main
    : isDark
      ? "rgba(255, 255, 255, 0.23)"
      : theme.palette.grey[300];

  const focusBorderColor = errorMessage ? theme.palette.error.main : theme.palette.primary.main;

  return (
    <Box
      sx={{
        border: 1,
        borderColor: borderColor,
        borderRadius: 1,
        overflow: "hidden",
        bgcolor: "background.paper",
        transition: "border-color 0.2s",
        "&:focus-within": {
          borderColor: focusBorderColor,
          borderWidth: 2,
        },
      }}
    >
      <MenuBar editor={editor} />
      <Box
        sx={{
          minHeight: 200,
          maxHeight: 400,
          overflow: "auto",
          p: 2,
          "& .ProseMirror": {
            outline: "none",
            minHeight: 150,
            color: "text.primary",
            "& p": {
              margin: 0,
              marginBottom: 1,
            },
            "& ul, & ol": {
              paddingLeft: 3,
              marginBottom: 1,
            },
            "& h1, & h2, & h3": {
              marginTop: 2,
              marginBottom: 1,
            },
            "& strong": {
              fontWeight: "bold",
            },
            "& em": {
              fontStyle: "italic",
            },
            "& u": {
              textDecoration: "underline",
            },
          },
          "& .ProseMirror p.is-editor-empty:first-of-type::before": {
            content: `"${placeholder || ""}"`,
            float: "left",
            color: "text.disabled",
            pointerEvents: "none",
            height: 0,
          },
        }}
      >
        <EditorContent editor={editor} />
      </Box>
      {helperText && !errorMessage && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ px: 2, pb: 1, display: "block" }}
        >
          {helperText}
        </Typography>
      )}
      {errorMessage && (
        <Typography variant="caption" color="error" sx={{ px: 2, pb: 1, display: "block" }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
}
