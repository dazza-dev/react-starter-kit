import type { FC } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { IconLock } from "@tabler/icons-react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

/**
 * 403 screen: the route exists but the user's role doesn't grant access.
 */
const Forbidden: FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="70vh"
      textAlign="center"
      justifyContent="center"
    >
      <Container maxWidth="sm">
        <IconLock size={72} opacity={0.4} />
        <Typography align="center" variant="h2" mt={2} mb={2}>
          {t("common:forbidden.title")}
        </Typography>
        <Typography align="center" variant="body1" color="text.secondary" mb={4}>
          {t("common:forbidden.description")}
        </Typography>
        <Button
          color="primary"
          variant="contained"
          component={Link}
          to="/app/dashboard"
          disableElevation
        >
          {t("common:error.backToHome")}
        </Button>
      </Container>
    </Box>
  );
};

export default Forbidden;
