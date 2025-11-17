import { Card } from "@mui/material";
import { useContext } from "react";
import type { ReactNode, ReactElement } from "react";
import { useTheme } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import { CustomizerContext } from "@/core/context/CustomizerContext";

type Props = {
  className?: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
};

const BlankCard = ({ children, className, sx }: Props): ReactElement => {
  const { isCardShadow } = useContext(CustomizerContext);

  const theme = useTheme();
  const borderColor = theme.palette.grey[100];

  return (
    <Card
      sx={[
        {
          p: 0,
          border: !isCardShadow ? `1px solid ${borderColor}` : "none",
          position: "relative",
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      className={className}
      elevation={isCardShadow ? 9 : 0}
      variant={!isCardShadow ? "outlined" : undefined}
    >
      {children}
    </Card>
  );
};

export default BlankCard;
