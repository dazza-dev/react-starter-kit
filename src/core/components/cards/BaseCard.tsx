import { useContext } from "react";
import type { ReactNode, ReactElement } from "react";
import { Card, CardHeader, CardContent, Divider } from "@mui/material";
import { CustomizerContext } from "@/core/context/CustomizerContext";

type Props = {
  title: string;
  children: ReactNode;
};

const BaseCard = ({ title, children }: Props): ReactElement => {
  const { isCardShadow } = useContext(CustomizerContext);

  return (
    <Card
      sx={{ padding: 0 }}
      elevation={isCardShadow ? 9 : 0}
      variant={!isCardShadow ? "outlined" : undefined}
    >
      <CardHeader title={title} />
      <Divider />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default BaseCard;
