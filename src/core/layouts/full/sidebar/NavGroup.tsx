import { ListSubheader, styled } from "@mui/material";
import { useContext, type ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { CustomizerContext } from "@/core/context/CustomizerContext";
import { IconDots } from "@tabler/icons-react";
import type {
  NavGroupItemType,
  ListSubheaderStyleProps,
} from "./sidebar.interface";

/**
 * ListSubheaderStyle - Styled component for ListSubheader with dark mode support.
 */
const ListSubheaderStyle = styled(ListSubheader, {
  shouldForwardProp: (prop) => prop !== "dark",
})<ListSubheaderStyleProps>(({ theme, dark }) => ({
  ...theme.typography.overline,
  fontWeight: "700",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(0),
  color: dark ? "#ffffff" : theme.palette.text.primary,
  lineHeight: "26px",
  padding: "3px 12px",
}));

/**
 * NavGroup - Component for rendering a group of navigation items with a subheader.
 */
const NavGroup = ({ item, hideMenu }: NavGroupItemType): ReactElement => {
  const { activeMode, sidebarBackground } = useContext(CustomizerContext);
  const isSidebarDark =
    activeMode === "dark" || sidebarBackground === "colored";
  const { t } = useTranslation();

  return (
    <ListSubheaderStyle disableSticky dark={isSidebarDark}>
      {hideMenu ? <IconDots size="14" /> : t(`${item?.subheader}`)}
    </ListSubheaderStyle>
  );
};

export default NavGroup;
