import { useContext, type ReactNode } from "react";
import { useTheme } from "@mui/material/styles";
import { Card, CardContent, Typography, Stack, Box } from "@mui/material";
import { CustomizerContext } from "@/core/context/CustomizerContext";

type Props = {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  footer?: ReactNode;
  cardHeading?: boolean;
  headTitle?: string;
  headSubtitle?: string;
  children?: ReactNode;
  middleContent?: ReactNode;
};

const DashboardCard = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardHeading,
  headTitle,
  headSubtitle,
  middleContent,
}: Props) => {
  const { isCardShadow } = useContext(CustomizerContext);
  const theme = useTheme();
  const borderColor = theme.palette.grey[100];

  return (
    <Card
      sx={{
        padding: 0,
        border: !isCardShadow ? `1px solid ${borderColor}` : "none",
      }}
      elevation={isCardShadow ? 9 : 0}
      variant={!isCardShadow ? "outlined" : undefined}
    >
      {cardHeading ? (
        <CardContent>
          <Typography variant="h5">{headTitle}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {headSubtitle}
          </Typography>
        </CardContent>
      ) : (
        <CardContent sx={{ p: "30px" }}>
          {title ? (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems={"center"}
              mb={3}
            >
              <Box>
                {title ? <Typography variant="h5">{title}</Typography> : ""}
                {subtitle ? (
                  <Typography variant="subtitle2" color="textSecondary">
                    {subtitle}
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
              {action}
            </Stack>
          ) : null}

          {children}
        </CardContent>
      )}
      {middleContent}
      {footer}
    </Card>
  );
};

export default DashboardCard;
