import React from "react";
import { useState } from "react";
import { useLocation } from "react-router";
import {
  ListItemIcon,
  ListItemButton,
  Collapse,
  styled,
  ListItemText,
  useTheme,
} from "@mui/material";
import NavItem from "./NavItem";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { CustomizerContext } from "@/core/context/CustomizerContext";

type NavGroupProps = {
  [x: string]: any;
  navLabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: any;
};

interface NavCollapseProps {
  menu: NavGroupProps;
  level: number;
  pathWithoutLastPart: any;
  pathDirect: any;
  hideMenu: any;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

// FC Component For Dropdown Menu
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
  const { activeMode, sidebarBackground } = useContext(CustomizerContext);
  const isSidebarDark =
    activeMode === "dark" || sidebarBackground === "colored";
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const menuIcon =
    level > 1 ? (
      <Icon stroke={1.5} size="1rem" />
    ) : (
      <Icon stroke={1.5} size="1.3rem" />
    );

  const handleClick = () => {
    setOpen(!open);
  };

  // menu collapse for sub-levels
  React.useEffect(() => {
    setOpen(false);
    menu?.children?.forEach((item: any) => {
      if (item?.href === pathname) {
        setOpen(true);
      }
    });
  }, [pathname, menu.children]);

  const ListItemStyled = styled(ListItemButton)(() => ({
    marginBottom: "2px",
    padding: "10px 12px",
    paddingLeft: hideMenu ? "10px" : level > 2 ? `${level * 15}px` : "10px",
    backgroundColor: open && level < 2 ? theme.palette.primary.main : "",
    whiteSpace: "nowrap",
    fontSize: "0.95rem",
    letterSpacing: "0.01em",
    borderRadius: "9px",
    "&:hover": {
      backgroundColor:
        pathname.includes(menu.href) || open
          ? theme.palette.primary.main
          : isSidebarDark
          ? "rgba(255,255,255,0.08)"
          : theme.palette.action.hover,
      color:
        pathname.includes(menu.href) || open
          ? "white"
          : isSidebarDark
          ? "#ffffff"
          : theme.palette.text.primary,
    },
    color:
      open && level < 2
        ? "white"
        : level > 1 && open
        ? theme.palette.primary.main
        : isSidebarDark
        ? "#ffffff"
        : theme.palette.text.primary,
    
    fontWeight: 700,
  }));

  // If Menu has Children
  const submenus = menu.children?.map((item: any) => {
    if (item.children) {
      return (
        <NavCollapse
          key={item?.id}
          menu={item}
          level={level + 1}
          pathWithoutLastPart={pathWithoutLastPart}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
          onClick={onClick}
        />
      );
    } else {
      return (
        <NavItem
          key={item.id}
          item={item}
          level={level + 1}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
          onClick={onClick}
        />
      );
    }
  });

  return (
    <>
      <ListItemStyled
        onClick={handleClick}
        selected={pathWithoutLastPart === menu.href}
        key={menu?.id}
      >
        <ListItemIcon
          sx={{
            minWidth: "36px",
            p: "3px 0",
            color: "inherit",
          }}
        >
          {menuIcon}
        </ListItemIcon>
        <ListItemText color="inherit">
          {hideMenu ? "" : <>{t(`${menu.title}`)}</>}
        </ListItemText>
        {!open ? (
          <IconChevronDown size="1rem" />
        ) : (
          <IconChevronUp size="1rem" />
        )}
      </ListItemStyled>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {submenus}
      </Collapse>
    </>
  );
};

export default NavCollapse;
