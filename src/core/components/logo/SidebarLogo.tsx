import type { FC } from "react";
import { Link } from "react-router";
import AppLogo from "./AppLogo";
import config from "@/core/context/config";
import { useCustomizer } from "@/core/context/CustomizerContext";

/**
 * Sidebar logo, with the mark in white over the dark background.
 */
const SidebarLogo: FC = () => {
  const { isCollapse, isSidebarHover } = useCustomizer();
  const isMini = isCollapse === "mini-sidebar" && !isSidebarHover;

  return (
    <Link
      to="/app/dashboard"
      style={{
        height: config.topBarHeight,
        width: isMini ? 40 : "auto",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        textDecoration: "none",
      }}
    >
      {/* Natural size 220x40; in mini mode it's cropped to the mark. */}
      <AppLogo variant="light" sx={{ "& svg": { height: 40, width: "auto" } }} />
    </Link>
  );
};

export default SidebarLogo;
