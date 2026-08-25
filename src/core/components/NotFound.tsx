import type { FC } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import NotFoundArt from "@/core/components/NotFoundArt";

const NotFound: FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      textAlign="center"
      px={2}
      py={6}
    >
      <Box width="100%" maxWidth={380} color="primary.main">
        <NotFoundArt />
      </Box>
      <Typography variant="h4" fontWeight={700} mt={5}>
        {t("common:error.title")}
      </Typography>
      <Typography variant="body1" color="text.secondary" mt={1.5} maxWidth={420}>
        {t("common:error.description")}
      </Typography>
      <Button
        color="primary"
        variant="contained"
        component={Link}
        to="/"
        disableElevation
        sx={{ mt: 4 }}
      >
        {t("common:error.backToHome")}
      </Button>
    </Box>
  );
};

export default NotFound;
