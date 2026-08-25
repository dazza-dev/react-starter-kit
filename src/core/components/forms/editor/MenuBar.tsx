import { Box, IconButton, Divider, useTheme } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import type { Editor } from "@tiptap/react";

interface MenuBarProps {
  editor: Editor | null;
}

export default function MenuBar({ editor }: MenuBarProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  if (!editor) {
    return null;
  }

  const buttonStyle = {
    color: "text.primary",
    "&:hover": {
      bgcolor: "action.hover",
    },
  };

  const activeButtonStyle = {
    bgcolor: "primary.main",
    color: "primary.contrastText",
    "&:hover": {
      bgcolor: "primary.dark",
    },
  };

  const borderColor = isDark ? "rgba(255, 255, 255, 0.23)" : theme.palette.grey[300];

  const bgColor = isDark ? "rgba(255, 255, 255, 0.05)" : theme.palette.grey[50];

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 0.5,
        p: 1,
        borderBottom: 1,
        borderColor: borderColor,
        bgcolor: bgColor,
      }}
    >
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleBold().run()}
        sx={editor.isActive("bold") ? activeButtonStyle : buttonStyle}
      >
        <FormatBoldIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        sx={editor.isActive("italic") ? activeButtonStyle : buttonStyle}
      >
        <FormatItalicIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        sx={editor.isActive("underline") ? activeButtonStyle : buttonStyle}
      >
        <FormatUnderlinedIcon fontSize="small" />
      </IconButton>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: borderColor }} />

      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        sx={editor.isActive("bulletList") ? activeButtonStyle : buttonStyle}
      >
        <FormatListBulletedIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        sx={editor.isActive("orderedList") ? activeButtonStyle : buttonStyle}
      >
        <FormatListNumberedIcon fontSize="small" />
      </IconButton>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: borderColor }} />

      <IconButton
        size="small"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        sx={editor.isActive({ textAlign: "left" }) ? activeButtonStyle : buttonStyle}
      >
        <FormatAlignLeftIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        sx={editor.isActive({ textAlign: "center" }) ? activeButtonStyle : buttonStyle}
      >
        <FormatAlignCenterIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        sx={editor.isActive({ textAlign: "right" }) ? activeButtonStyle : buttonStyle}
      >
        <FormatAlignRightIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        sx={editor.isActive({ textAlign: "justify" }) ? activeButtonStyle : buttonStyle}
      >
        <FormatAlignJustifyIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
