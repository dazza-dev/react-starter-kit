import { ListSubheader, styled } from "@mui/material";
import { IconDots } from "@tabler/icons-react";

type NavGroup = {
  navLabel?: boolean;
  subheader?: string;
};

interface ItemType {
  item: NavGroup;
  hideMenu: string | boolean;
}

const NavGroup = ({ item, hideMenu }: ItemType) => {
  const ListSubheaderStyle = styled((props: any) => (
    <ListSubheader disableSticky {...props} />
  ))(({ theme }) => ({
    ...theme.typography.overline,
    fontWeight: "700",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0),
    color: "text.Primary",
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
