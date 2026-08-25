import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CustomTextField from "@/core/components/forms/CustomTextField";
import type { TextFieldProps } from "@mui/material/TextField";

type CustomPasswordFieldProps = Omit<TextFieldProps, "type">;

const CustomPasswordField = (props: CustomPasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <CustomTextField
      {...props}
      type={showPassword ? "text" : "password"}
      slotProps={{
        ...props.slotProps,
        input: {
          ...((props.slotProps?.input as Record<string, unknown>) ?? {}),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default CustomPasswordField;
