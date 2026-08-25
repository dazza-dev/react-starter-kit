import { Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control, Path, FieldValues } from "react-hook-form";
import CustomTextField from "./CustomTextField";

interface FormTextAreaProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  rows?: number;
  size?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  disabled?: boolean;
  required?: boolean;
  /** Reduces the field size. */
  dense?: boolean;
}

export default function FormTextArea<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  rows = 4,
  size = { xs: 12 },
  disabled = false,
  required = false,
  dense = false,
}: FormTextAreaProps<T>) {
  return (
    <Grid size={size}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <CustomTextField
            {...field}
            id={name}
            label={label}
            fullWidth
            size={dense ? "small" : "medium"}
            multiline
            rows={rows}
            disabled={disabled}
            error={!!error}
            helperText={error?.message}
            placeholder={placeholder}
            value={field.value ?? ""}
            slotProps={{ htmlInput: { "aria-required": required } }}
            sx={{ "& .MuiInputBase-input": { resize: "vertical" } }}
          />
        )}
      />
    </Grid>
  );
}
