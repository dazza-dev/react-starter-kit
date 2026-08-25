import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import TopLoadingBar from "react-top-loading-bar";
import type { LoadingBarRef } from "react-top-loading-bar";
import { useTheme } from "@mui/material";
import { useNavigation } from "react-router";

/**
 * Top progress bar shown while the router is navigating.
 */
export default function LoadingBar(): ReactElement {
  const theme = useTheme();
  const ref = useRef<LoadingBarRef>(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "loading") {
      ref.current?.continuousStart();
    } else {
      ref.current?.complete();
    }
  }, [navigation.state]);

  return <TopLoadingBar ref={ref} color={theme.palette.primary.main} height={3} />;
}
