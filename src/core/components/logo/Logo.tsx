import { useContext } from "react";
import type { FC } from "react";
import { Link } from "react-router";
import LogoDark from "@/assets/images/logos/logo-dark.svg";
import LogoLight from "@/assets/images/logos/logo-light.svg";
import config from "@/core/context/config";
import { CustomizerContext } from "@/core/context/CustomizerContext";

const Logo: FC = () => {
  const { isCollapse, isSidebarHover, activeMode, sidebarBackground } =
    useContext(CustomizerContext);

  // Calculate the height of the top bar
  const TopBarHeight = config.topBarHeight;
  const computedWidth =
    isCollapse == "mini-sidebar" && !isSidebarHover ? "40px" : "180px";

  return (
    <Link
      to="/"
      style={{
        height: TopBarHeight,
        width: computedWidth,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        src={
          activeMode === "dark" || sidebarBackground === "colored"
            ? LogoLight
            : LogoDark
        }
        alt="logo"
      />
    </Link>
  );
};

export default Logo;
