import { Avatar, Box, Card, Grid, Stack, Typography } from "@mui/material";
import { IconSettings, IconShieldLock, IconUsers, IconUsersGroup } from "@tabler/icons-react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/core/components/PageHeader";
import { useAuthStore } from "@/modules/auth/store/authStore";

// Replace these cards with your app's real metrics.
const CARDS = [
  {
    icon: IconUsers,
    title: "sidebar:users",
    description: "dashboard:usersDescription",
    to: "/app/users",
    permission: "read-users",
  },
  {
    icon: IconShieldLock,
    title: "sidebar:roles",
    description: "dashboard:rolesDescription",
    to: "/configs/roles",
    permission: "read-roles",
  },
  {
    icon: IconUsersGroup,
    title: "sidebar:groups",
    description: "dashboard:groupsDescription",
    to: "/configs/groups",
    permission: "read-groups",
  },
  {
    icon: IconSettings,
    title: "sidebar:settings",
    description: "dashboard:settingsDescription",
    to: "/configs/settings",
    permission: "read-config",
  },
];

/**
 * Home screen after login.
 */
export default function Dashboard() {
  const { t } = useTranslation();
  const can = useAuthStore((state) => state.can);
  const cards = CARDS.filter((card) => can(card.permission));

  return (
    <Box>
      <PageHeader title={t("dashboard:title")} subtitle={t("dashboard:subtitle")} />

      <Grid container spacing={3}>
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Grid key={card.to} size={{ xs: 12, sm: 6, lg: 3 }}>
              <Box component={Link} to={card.to} sx={{ textDecoration: "none" }}>
                <Card sx={{ p: 3, height: "100%" }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: "primary.light", color: "primary.main" }}>
                      <Icon size={24} />
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{t(card.title)}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t(card.description)}
                      </Typography>
                    </Box>
                  </Stack>
                </Card>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
