import { Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control, Path, FieldValues } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import CustomPasswordField from "./CustomPasswordField";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  size?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  type?: string;
  disabled?: boolean;
  required?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /** Reduces the field size. */
  dense?: boolean;
}

export default function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  helperText,
  multiline = false,
  rows,
  size = { xs: 12 },
  type = "text",
  disabled = false,
  required = false,
  inputProps,
  dense = false,
}: FormInputProps<T>) {
  const isPassword = type === "password";
  const Field = isPassword ? CustomPasswordField : CustomTextField;

  return (
    <Grid size={size}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Field
            {...field}
            id={name}
            label={label}
            fullWidth
            size={dense ? "small" : "medium"}
            multiline={multiline}
            rows={rows}
            {...(isPassword ? {} : { type })}
            disabled={disabled}
            error={!!error}
            helperText={error?.message || helperText}
            placeholder={placeholder}
            value={field.value ?? ""}
            slotProps={{ htmlInput: { "aria-required": required, ...inputProps } }}
          />
        )}
      />
    </Grid>
  );
}
