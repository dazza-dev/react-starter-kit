import { Card, CardContent, Typography, Stack, Avatar, Divider } from "@mui/material";
import type { ReactNode } from "react";

interface FormSectionProps {
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  footer?: ReactNode;
}

/**
 * Content card with an optional header separated by a divider.
 */
export default function FormSection({ title, children, icon, action, footer }: FormSectionProps) {
  const hasHeader = title || icon || action;

  return (
    <Card>
      {hasHeader && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 3, pt: 2, pb: 2 }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5}>
              {icon && (
                <Avatar
                  sx={{ width: 32, height: 32, bgcolor: "primary.light", color: "primary.main" }}
                >
                  {icon}
                </Avatar>
              )}
              {title && (
                <Typography variant="h5" fontWeight={600}>
                  {title}
                </Typography>
              )}
            </Stack>
            {action}
          </Stack>
          <Divider />
        </>
      )}

      <CardContent>{children}</CardContent>

      {footer && (
        <>
          <Divider />
          <CardContent>{footer}</CardContent>
        </>
      )}
    </Card>
  );
}
