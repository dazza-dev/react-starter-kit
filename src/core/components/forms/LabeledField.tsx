import { Grid, Typography } from "@mui/material";
import CustomFormLabel from "./CustomFormLabel";
import type { ReactNode } from "react";

interface LabeledFieldProps {
  label: string;
  children: ReactNode;
  required?: boolean;
  htmlFor?: string;
  size?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export default function LabeledField({
  label,
  children,
  required = false,
  htmlFor,
  size = { xs: 12 },
}: LabeledFieldProps) {
  return (
    <Grid size={size}>
      <CustomFormLabel sx={{ mt: 0 }} htmlFor={htmlFor}>
        {label}
        {required && (
          <Typography component="span" color="error.main">
            {" "}
            *
          </Typography>
        )}
      </CustomFormLabel>
      {children}
    </Grid>
  );
}
