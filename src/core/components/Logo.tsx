import { useContext } from "react";
import type { FC } from "react";
import { Link } from "react-router";
import LogoDark from "@/assets/images/logos/logo-dark.svg";
import LogoLight from "@/assets/images/logos/logo-light.svg";
import { styled } from "@mui/material";
import config from "@/core/context/config";
import { CustomizerContext } from "@/core/context/CustomizerContext";

const Logo: FC = () => {
  const { isCollapse, isSidebarHover, activeMode } =
    useContext(CustomizerContext);
  const TopBarHeight = config.topBarHeight;

  const LinkStyled = styled(Link)(() => ({
    height: TopBarHeight,
    width: isCollapse == "mini-sidebar" && !isSidebarHover ? "40px" : "180px",
    overflow: "hidden",
    display: "block",
  }));

  return (
    <LinkStyled
      to="/"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <img src={activeMode === "dark" ? LogoLight : LogoDark} alt="logo" />
    </LinkStyled>
  );
};

export default Logo;
