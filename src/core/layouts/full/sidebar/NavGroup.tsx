import { ListSubheader, styled } from "@mui/material";
import { useContext } from "react";
import { CustomizerContext } from "@/core/context/CustomizerContext";
import { IconDots } from "@tabler/icons-react";
import type { NavGroupItemType } from "./sidebar.type";

const NavGroup = ({ item, hideMenu }: NavGroupItemType) => {
  const { activeMode, sidebarBackground } = useContext(CustomizerContext);
  const isSidebarDark =
    activeMode === "dark" || sidebarBackground === "colored";

  const ListSubheaderStyle = styled((props: any) => (
    <ListSubheader disableSticky {...props} />
  ))(({ theme }) => ({
    ...theme.typography.overline,
    fontWeight: "700",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0),
    color: isSidebarDark ? "#ffffff" : theme.palette.text.primary,
    lineHeight: "26px",
    padding: "3px 12px",
  }));

  return (
    <ListSubheaderStyle>
      {hideMenu ? <IconDots size="14" /> : item?.subheader}
    </ListSubheaderStyle>
  );
};

export default NavGroup;
