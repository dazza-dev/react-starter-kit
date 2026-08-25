import { ListSubheader, styled } from "@mui/material";
import { type ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { IconDots } from "@tabler/icons-react";
import type { NavGroupItemType, ListSubheaderStyleProps } from "./sidebar.interface";

const ListSubheaderStyle = styled(ListSubheader, {
  shouldForwardProp: (prop) => prop !== "dark",
})<ListSubheaderStyleProps>(({ theme }) => ({
  ...theme.typography.overline,
  fontWeight: "700",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(0),
  color: theme.palette.sidebar.text,
  lineHeight: "26px",
  padding: "3px 12px",
}));

/**
 * Subheader for a group of sidebar items.
 */
const NavGroup = ({ item, hideMenu }: NavGroupItemType): ReactElement => {
  const { t } = useTranslation();

  return (
    <ListSubheaderStyle disableSticky dark={false}>
      {hideMenu ? <IconDots size="14" /> : t(`${item?.subheader}`)}
    </ListSubheaderStyle>
  );
};

export default NavGroup;
