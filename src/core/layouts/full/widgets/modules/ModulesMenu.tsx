import { useState } from "react";
import type { FC, MouseEvent } from "react";
import { Avatar, Box, Button, Divider, Menu, Stack, Typography, alpha } from "@mui/material";
import { IconChevronDown, IconLayoutGrid } from "@tabler/icons-react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

interface ModuleItem {
  icon: typeof IconLayoutGrid;
  title: string;
  subtext: string;
  href: string;
}

// Header's module selector. Add an entry for each module with its own navigation.
const MODULES: ModuleItem[] = [
  {
    icon: IconLayoutGrid,
    title: "sidebar:moduleApp",
    subtext: "sidebar:moduleAppDescription",
    href: "/app/dashboard",
  },
];

const ModulesMenu: FC = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Button
        variant="text"
        onClick={handleOpen}
        sx={(theme) => ({
          display: { xs: "none", md: "inline-flex" },
          color: alpha(theme.palette.text.secondary, 0.8),
        })}
        endIcon={<IconChevronDown size={16} />}
      >
        {t("common:menu.modules")}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ "& .MuiMenu-paper": { width: 360, p: 2 } }}
      >
        {MODULES.map((item, index) => {
          const Icon = item.icon;
          return (
            <Box key={item.href}>
              <Box
                component={Link}
                to={item.href}
                onClick={handleClose}
                sx={{ textDecoration: "none", display: "block", py: 1.25 }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Avatar variant="rounded" sx={{ width: 45, height: 45, bgcolor: "primary.main" }}>
                    <Icon size={24} color="white" />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                      {t(item.title)}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {t(item.subtext)}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              {index < MODULES.length - 1 && <Divider sx={{ my: 1.5 }} />}
            </Box>
          );
        })}
      </Menu>
    </>
  );
};

export default ModulesMenu;
