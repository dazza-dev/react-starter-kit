import { useContext } from "react";
import type { FC } from "react";
import { IconButton, useMediaQuery } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { IconMenu2 } from "@tabler/icons-react";
import { CustomizerContext } from "@/core/context/CustomizerContext";

const SidebarToggle: FC = () => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const { setIsCollapse, isCollapse, isMobileSidebar, setIsMobileSidebar } =
    useContext(CustomizerContext);

  const handleClick = () => {
    if (lgUp) {
      if (isCollapse === "full-sidebar") {
        setIsCollapse("mini-sidebar");
      } else {
        setIsCollapse("full-sidebar");
      }
    } else {
      setIsMobileSidebar(!isMobileSidebar);
    }
  };

  return (
    <IconButton color="inherit" aria-label="menu" onClick={handleClick}>
      <IconMenu2 size="20" />
    </IconButton>
  );
};

export default SidebarToggle;
