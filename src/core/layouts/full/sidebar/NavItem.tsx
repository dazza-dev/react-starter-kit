import { NavLink } from "react-router";
import {
  ListItemIcon,
  ListItemText,
  Chip,
  useTheme,
  Typography,
  ListItemButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import type { NavItemType } from "./sidebar.type";

const NavItem = ({ item, level, pathDirect, hideMenu, onClick }: NavItemType) => {
  const Icon = item?.icon;
  const theme = useTheme();
  const { t } = useTranslation();
  const currentLevel = level ?? 1;
  const itemIcon = Icon ? (
    currentLevel > 1 ? (
      <Icon stroke={1.5} size="1rem" />
    ) : (
      <Icon stroke={1.5} size="1.3rem" />
    )
  ) : null;

  const listItemSx = {
    whiteSpace: "normal",
    minHeight: "45px",
    margin: "0 0 2px",
    padding: hideMenu ? "8px" : "8px 12px",
    justifyContent: hideMenu ? "center" : "flex-start",
    borderRadius: "7px",
    backgroundColor: currentLevel > 1 ? "transparent !important" : "inherit",
    color: theme.palette.sidebar.text,
    fontWeight: 500,
    fontSize: "0.875rem",
    paddingLeft: hideMenu ? "8px" : currentLevel > 2 ? `${currentLevel * 15}px` : "12px",
    "&:hover": {
      backgroundColor: theme.palette.sidebar.hoverBackground,
      color: theme.palette.sidebar.text,
    },
    "&.Mui-selected": {
      color: theme.palette.sidebar.text,
      backgroundColor: theme.palette.sidebar.activeBackground,
      "&:hover": {
        backgroundColor: theme.palette.sidebar.activeBackground,
        color: theme.palette.sidebar.text,
      },
    },
  } as const;

  const chipColorOptions = [
    "default",
    "primary",
    "secondary",
    "error",
    "info",
    "success",
    "warning",
  ] as const;
  const chipColor =
    typeof item?.chipColor === "string" &&
    chipColorOptions.includes(item?.chipColor as (typeof chipColorOptions)[number])
      ? (item?.chipColor as (typeof chipColorOptions)[number])
      : "default";

  const chipVariantOptions = ["filled", "outlined"] as const;
  const chipVariant =
    typeof item?.variant === "string" &&
    chipVariantOptions.includes(item?.variant as (typeof chipVariantOptions)[number])
      ? (item?.variant as (typeof chipVariantOptions)[number])
      : "filled";

  return (
    <li style={{ listStyle: "none" }}>
      <ListItemButton
        sx={listItemSx}
        component={item?.external ? "a" : NavLink}
        to={item?.external ? undefined : item?.href}
        href={item?.external ? item?.href : undefined}
        target={item?.external ? "_blank" : undefined}
        disabled={item?.disabled}
        selected={pathDirect === item?.href}
        onClick={onClick}
      >
        <ListItemIcon
          sx={{
            minWidth: "auto",
            marginInlineEnd: hideMenu ? 0 : "13px",
            p: "3px 0",
            color: theme.palette.sidebar.text,
          }}
        >
          {itemIcon}
        </ListItemIcon>
        {hideMenu ? null : (
          <ListItemText
            sx={{
              "& .MuiListItemText-primary": {
                fontSize: "0.875rem",
                fontWeight: 500,
              },
            }}
          >
            {t(`${item?.title}`)}
            <br />
            {item?.subtitle ? <Typography variant="caption">{item?.subtitle}</Typography> : ""}
          </ListItemText>
        )}

        {!item?.chip || hideMenu ? null : (
          <Chip color={chipColor} variant={chipVariant} size="small" label={item?.chip} />
        )}
      </ListItemButton>
    </li>
  );
};

export default NavItem;
