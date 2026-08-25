import { useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import type { ReactNode } from "react";
import { useAppName } from "@/core/store/configStore";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  actions?: ReactNode;
  filters?: ReactNode;
}

/**
 * Page header with title and actions on the first row, filters on the second, and sets the document title.
 */
export const PageHeader = ({ title, subtitle, badge, actions, filters }: PageHeaderProps) => {
  const theme = useTheme();
  const appName = useAppName();

  useEffect(() => {
    document.title = `${title} - ${appName}`;
  }, [title, appName]);

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: filters ? 3 : 0,
        }}
      >
        <Box>
          <Box display="flex" alignItems="center" gap={2} mb={subtitle ? 1 : 0}>
            <Typography variant="h2" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
              {title}
            </Typography>
            {badge}
          </Box>
          {subtitle && (
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
              {subtitle}
            </Typography>
          )}
        </Box>

        {actions && (
          <Box
            display="flex"
            gap={1}
            alignItems="center"
            flexShrink={0}
            ml={2}
            sx={{
              "& .MuiButton-root": {
                minHeight: 44,
                borderRadius: "12px",
                px: 3,
                letterSpacing: 0,
              },
            }}
          >
            {actions}
          </Box>
        )}
      </Box>

      {filters && (
        <Box display="flex" justifyContent="flex-start" alignItems="center" gap={2}>
          {filters}
        </Box>
      )}
    </Box>
  );
};
