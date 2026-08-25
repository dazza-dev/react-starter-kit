import { useState } from "react";
import { useLocation } from "react-router";
import { ListItemIcon, ListItemButton, Collapse, ListItemText, useTheme } from "@mui/material";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import NavItem from "./NavItem";
import type { NavCollapseProps } from "./sidebar.interface";
import type { MenuitemsType } from "./sidebar.type";
import { CanAccess } from "@/modules/auth/components/CanAccess";

/**
 * Opens only when the active route is one of its children, unless the user toggled it manually.
 */
const NavCollapse = ({
  menu,
  level,
  pathWithoutLastPart,
  pathDirect,
  hideMenu,
  onClick,
}: NavCollapseProps) => {
  const Icon = menu?.icon;
  const theme = useTheme();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  // null means "let the active route decide"; becomes a boolean once the header is clicked.
  const [toggled, setToggled] = useState<boolean | null>(null);
  const hasActiveChild = menu?.children?.some((item) => item?.href === pathname) ?? false;
  const open = toggled ?? hasActiveChild;

  const menuIcon = Icon ? (
    level > 1 ? (
      <Icon stroke={1.5} size="1rem" />
    ) : (
      <Icon stroke={1.5} size="1.3rem" />
    )
  ) : null;

  const isActiveHref = menu?.href ? pathname.includes(menu.href) : false;

  const listItemSx = {
    minHeight: "45px",
    margin: "0 0 2px",
    padding: hideMenu ? "8px" : "8px 12px",
    justifyContent: hideMenu ? "center" : "flex-start",
    paddingLeft: hideMenu ? "8px" : level > 2 ? `${level * 15}px` : "12px",
    backgroundColor: open && level < 2 ? theme.palette.sidebar.activeBackground : "",
    whiteSpace: "nowrap",
    fontSize: "0.875rem",
    borderRadius: "7px",
    "&:hover": {
      backgroundColor:
        isActiveHref || open
          ? theme.palette.sidebar.activeBackground
          : theme.palette.sidebar.hoverBackground,
      color: theme.palette.sidebar.text,
    },
    color: theme.palette.sidebar.text,
    fontWeight: 500,
  } as const;

  const submenus = menu.children?.map((item: MenuitemsType) => {
    const element = item.children ? (
      <NavCollapse
        key={item?.id}
        menu={item}
        level={level + 1}
        pathWithoutLastPart={pathWithoutLastPart}
        pathDirect={pathDirect}
        hideMenu={hideMenu}
        onClick={onClick}
      />
    ) : (
      <NavItem
        key={item.id}
        item={item}
        level={level + 1}
        pathDirect={pathDirect}
        hideMenu={hideMenu}
        onClick={onClick}
      />
    );

    return item.permission ? (
      <CanAccess key={item.id} permission={item.permission}>
        {element}
      </CanAccess>
    ) : (
      element
    );
  });

  return (
    <>
      <ListItemButton
        sx={listItemSx}
        onClick={() => setToggled(!open)}
        selected={pathWithoutLastPart === menu.href}
      >
        <ListItemIcon
          sx={{
            minWidth: "auto",
            marginInlineEnd: hideMenu ? 0 : "13px",
            p: "3px 0",
            color: "inherit",
          }}
        >
          {menuIcon}
        </ListItemIcon>
        {hideMenu ? null : (
          <>
            <ListItemText
              sx={{ "& .MuiListItemText-primary": { fontSize: "0.875rem", fontWeight: 500 } }}
            >
              {t(`${menu.title}`)}
            </ListItemText>
            {open ? <IconChevronUp size="1rem" /> : <IconChevronDown size="1rem" />}
          </>
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {submenus}
      </Collapse>
    </>
  );
};

export default NavCollapse;
