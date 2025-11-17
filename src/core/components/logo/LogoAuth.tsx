import { useContext } from "react";
import type { FC } from "react";
import { Link } from "react-router";
import LogoDark from "@/assets/images/logos/logo-dark.svg";
import LogoLight from "@/assets/images/logos/logo-light.svg";
import { CustomizerContext } from "@/core/context/CustomizerContext";

const Logo: FC = () => {
  const { activeMode } = useContext(CustomizerContext);

  return (
    <Link
      to="/"
      style={{
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img src={activeMode === "dark" ? LogoLight : LogoDark} alt="logo" />
    </Link>
  );
};

export default Logo;
