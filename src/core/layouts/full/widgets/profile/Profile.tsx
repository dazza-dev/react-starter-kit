import { useState } from "react";
import type { FC, MouseEvent } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import { IconLogout, IconMail, IconUser } from "@tabler/icons-react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import Divider from "@/core/components/Divider";
import { useAuthStore } from "@/modules/auth/store/authStore";
import { useLogout } from "@/modules/auth/hooks/useAuth";

const Profile: FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogout();

  const handleOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const initials = `${user?.firstName?.charAt(0) ?? ""}${user?.lastName?.charAt(0) ?? ""}` || "U";

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="user-profile"
        color="inherit"
        sx={{ ...(anchorEl && { color: "primary.main" }) }}
        onClick={handleOpen}
      >
        <Avatar
          alt={user?.name}
          src={user?.avatar ?? undefined}
          sx={{ width: 35, height: 35, bgcolor: "primary.main", color: "white", fontWeight: 600 }}
        >
          {initials}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{ "& .MuiMenu-paper": { width: "340px", p: 3 } }}
      >
        <Stack direction="row" pb={2} spacing={2} alignItems="center">
          <Avatar
            alt={user?.name}
            src={user?.avatar ?? undefined}
            sx={{ width: 48, height: 48, bgcolor: "primary.main", color: "white", fontWeight: 600 }}
          >
            {initials}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" color="textPrimary" fontWeight={700}>
              {user?.name}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <IconMail width={15} height={15} />
              {user?.email}
            </Typography>
            <Stack direction="row" spacing={0.5} mt={1} flexWrap="wrap">
              {user?.roles?.map((role) => (
                <Chip
                  key={role.uuid}
                  label={role.name}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              ))}
            </Stack>
          </Box>
        </Stack>

        <Divider />

        <Stack spacing={1} mt={2}>
          <Button
            component={Link}
            to="/profile"
            variant="outlined"
            fullWidth
            startIcon={<IconUser size={20} />}
            onClick={handleClose}
          >
            {t("common:profile.myProfile")}
          </Button>
          <Button
            onClick={() => logoutMutation.mutate()}
            variant="outlined"
            color="error"
            fullWidth
            disabled={logoutMutation.isPending}
            startIcon={
              logoutMutation.isPending ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <IconLogout size={20} />
              )
            }
          >
            {t("auth:logout")}
          </Button>
        </Stack>
      </Menu>
    </Box>
  );
};

export default Profile;
