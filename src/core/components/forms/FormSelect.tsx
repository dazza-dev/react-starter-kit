import { Box, Chip, CircularProgress, Grid, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control, Path, FieldValues } from "react-hook-form";
import CustomTextField from "./CustomTextField";

type OptionId = number | string;

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options?: { id: OptionId; name: string }[];
  size?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  disabled?: boolean;
  required?: boolean;
  multiple?: boolean;
  /** While options are loading from the API, a spinner replaces the arrow. */
  loading?: boolean;
  /** Reduces the field size. */
  dense?: boolean;
}

export default function FormSelect<T extends FieldValues>({
  name,
  control,
  label,
  options = [],
  size = { xs: 12 },
  disabled = false,
  required = false,
  multiple = false,
  loading = false,
  dense = false,
}: FormSelectProps<T>) {
  // In multiple mode, chips are rendered since the raw value is uuids.
  const renderValue = (value: unknown) => (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
      {(value as OptionId[]).map((id) => (
        <Chip key={id} size="small" label={options.find((o) => o.id === id)?.name ?? id} />
      ))}
    </Box>
  );

  return (
    <Grid size={size}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <CustomTextField
            {...field}
            id={name}
            select
            label={label}
            fullWidth
            size={dense ? "small" : "medium"}
            disabled={disabled}
            error={!!error}
            helperText={error?.message}
            value={field.value ?? (multiple ? [] : "")}
            slotProps={{
              select: {
                multiple,
                ...(multiple ? { renderValue } : {}),
                ...(loading
                  ? {
                      IconComponent: () => (
                        <CircularProgress size={18} sx={{ mr: 1.5 }} color="primary" />
                      ),
                    }
                  : {}),
              },
              htmlInput: { "aria-required": required },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </CustomTextField>
        )}
      />
    </Grid>
  );
}
