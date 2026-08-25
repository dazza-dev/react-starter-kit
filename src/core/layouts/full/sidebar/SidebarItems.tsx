import { Box, List, useMediaQuery } from "@mui/material";
import { useLocation } from "react-router";
import type { FC } from "react";
import type { Theme } from "@mui/material/styles";
import Menuitems from "./MenuItems";
import NavItem from "./NavItem";
import NavCollapse from "./NavCollapse";
import NavGroup from "./NavGroup";
import { useCustomizer } from "@/core/context/CustomizerContext";
import { CanAccess } from "@/modules/auth/components/CanAccess";

const SidebarItems: FC = () => {
  const { pathname } = useLocation();
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf("/"));

  const { isSidebarHover, isCollapse, isMobileSidebar, setIsMobileSidebar } = useCustomizer();

  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const hideMenu: boolean = lgUp ? isCollapse === "mini-sidebar" && !isSidebarHover : false;

  return (
    <Box sx={{ px: hideMenu ? 2 : 3, py: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />;
          }

          const element = item.children ? (
            <NavCollapse
              menu={item}
              pathDirect={pathname}
              hideMenu={hideMenu}
              pathWithoutLastPart={pathWithoutLastPart}
              level={1}
              onClick={() => setIsMobileSidebar(!isMobileSidebar)}
            />
          ) : (
            <NavItem
              item={item}
              pathDirect={pathname}
              hideMenu={hideMenu}
              onClick={() => setIsMobileSidebar(!isMobileSidebar)}
            />
          );

          return item.permission ? (
            <CanAccess key={item.id} permission={item.permission}>
              {element}
            </CanAccess>
          ) : (
            <Box key={item.id}>{element}</Box>
          );
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
