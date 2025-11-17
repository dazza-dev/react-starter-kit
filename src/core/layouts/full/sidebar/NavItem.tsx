import { NavLink } from "react-router";
import {
  ListItemIcon,
  List,
  ListItemText,
  Chip,
  useTheme,
  Typography,
  ListItemButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { CustomizerContext } from "@/core/context/CustomizerContext";
import type { NavItemType } from "./sidebar.type";

const NavItem = ({
  item,
  level,
  pathDirect,
  hideMenu,
  onClick,
}: NavItemType) => {
  const Icon = item?.icon;
  const theme = useTheme();
  const { activeMode, sidebarBackground } = useContext(CustomizerContext);
  const isSidebarDark =
    activeMode === "dark" || sidebarBackground === "colored";
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
    whiteSpace: "nowrap",
    marginBottom: "2px",
    padding: "10px 12px",
    borderRadius: "9px",
    backgroundColor: currentLevel > 1 ? "transparent !important" : "inherit",
    color:
      currentLevel > 1 && pathDirect === item?.href
        ? `${theme.palette.primary.main}!important`
        : isSidebarDark
        ? "#ffffff"
        : theme.palette.text.primary,
    fontWeight: 700,
    fontSize: "1rem",
    letterSpacing: "0.01em",
    paddingLeft: hideMenu
      ? "10px"
      : currentLevel > 2
      ? `${currentLevel * 15}px`
      : "10px",
    "&:hover": {
      backgroundColor: isSidebarDark
        ? "rgba(255,255,255,0.08)"
        : theme.palette.action.hover,
      color: isSidebarDark ? "#ffffff" : theme.palette.text.primary,
    },
    "&.Mui-selected": {
      color: isSidebarDark ? "#ffffff" : theme.palette.text.primary,
      backgroundColor: isSidebarDark
        ? "rgba(255,255,255,0.12)"
        : theme.palette.action.hover,
      "&:hover": {
        backgroundColor: isSidebarDark
          ? "rgba(255,255,255,0.12)"
          : theme.palette.action.hover,
        color: isSidebarDark ? "#ffffff" : theme.palette.text.primary,
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
    chipColorOptions.includes(
      item?.chipColor as (typeof chipColorOptions)[number]
    )
      ? (item?.chipColor as (typeof chipColorOptions)[number])
      : "default";

  const chipVariantOptions = ["filled", "outlined"] as const;
  const chipVariant =
    typeof item?.variant === "string" &&
    chipVariantOptions.includes(
      item?.variant as (typeof chipVariantOptions)[number]
    )
      ? (item?.variant as (typeof chipVariantOptions)[number])
      : "filled";

  return (
    <List component="li" disablePadding key={item?.id && item.title}>
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
            minWidth: "30px",
            p: "3px 0",
            color: isSidebarDark
              ? "#ffffff"
              : currentLevel > 1 && pathDirect === item?.href
              ? `${theme.palette.primary.main}!important`
              : theme.palette.text.primary,
          }}
        >
          {itemIcon}
        </ListItemIcon>
        <ListItemText>
          {hideMenu ? "" : <>{t(`${item?.title}`)}</>}
          <br />
          {item?.subtitle ? (
            <Typography variant="caption">
              {hideMenu ? "" : item?.subtitle}
            </Typography>
          ) : (
            ""
          )}
        </ListItemText>

        {!item?.chip || hideMenu ? null : (
          <Chip
            color={chipColor}
            variant={chipVariant}
            size="small"
            label={item?.chip}
          />
        )}
      </ListItemButton>
    </List>
  );
};

export default NavItem;
