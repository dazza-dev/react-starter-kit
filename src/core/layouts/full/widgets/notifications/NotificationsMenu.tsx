import { useState } from "react";
import type { FC, MouseEvent } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  IconButton,
  List,
  ListItem,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import { IconBellOff, IconBellRinging } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface Notification {
  title: string;
  subtitle: string;
  avatar?: string;
}

// Wire this up to your notifications endpoint once you have one.
const NOTIFICATIONS: Notification[] = [];

const NotificationsMenu: FC = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const hasNotifications = NOTIFICATIONS.length > 0;

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen} aria-label={t("common:notifications.title")}>
        <Badge variant="dot" color="primary" invisible={!hasNotifications}>
          <IconBellRinging size={22} stroke={1.5} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ "& .MuiMenu-paper": { width: 360 } }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 4, pt: 3, pb: 2 }}
        >
          <Typography variant="h5">{t("common:notifications.title")}</Typography>
          {hasNotifications && (
            <Chip
              size="small"
              color="primary"
              label={t("common:notifications.countNew", { count: NOTIFICATIONS.length })}
              sx={{ color: "#fff" }}
            />
          )}
        </Stack>

        {hasNotifications ? (
          <Box>
            <List sx={{ py: 0, maxHeight: 400, overflowY: "auto" }}>
              {NOTIFICATIONS.map((item) => (
                <ListItem key={item.title} sx={{ py: 2, px: 4 }}>
                  <Avatar src={item.avatar} sx={{ width: 48, height: 48, mr: 1.5 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {item.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {item.subtitle}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
            <Box sx={{ py: 2, px: 3 }}>
              <Button color="primary" variant="outlined" fullWidth>
                {t("common:notifications.seeAll")}
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ px: 4, py: 5, textAlign: "center", color: "text.secondary" }}>
            <IconBellOff size={32} stroke={1.5} />
            <Typography variant="subtitle1" mt={1}>
              {t("common:notifications.empty")}
            </Typography>
          </Box>
        )}
      </Menu>
    </>
  );
};

export default NotificationsMenu;
