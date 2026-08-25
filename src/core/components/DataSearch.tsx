import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { InputAdornment, IconButton, type SxProps, type Theme } from "@mui/material";
import CustomTextField from "@/core/components/forms/CustomTextField";

interface DataSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceTime?: number;
  sx?: SxProps<Theme>;
  size?: "small" | "medium";
}

/**
 * Debounced search box that notifies the parent only when the user stops typing.
 */
export default function DataSearch({
  onSearch,
  placeholder,
  debounceTime = 500,
  sx,
  size = "medium",
}: DataSearchProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  // Every keystroke resets the timer; the parent only finds out once typing stops.
  useEffect(() => {
    const timer = setTimeout(() => onSearch(value), debounceTime);
    return () => clearTimeout(timer);
  }, [value, debounceTime, onSearch]);

  return (
    <CustomTextField
      placeholder={placeholder ?? t("common:search")}
      fullWidth
      value={value}
      size={size}
      sx={{
        maxWidth: 300,
        "& .MuiOutlinedInput-root": { minHeight: 40 },
        "& .MuiOutlinedInput-input": { fontSize: "1rem" },
        ...sx,
      }}
      onChange={(event) => setValue(event.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton onClick={() => setValue("")} edge="end" size="small">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ) : undefined,
        },
      }}
    />
  );
}
