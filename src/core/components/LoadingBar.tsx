import { useState, useEffect } from "react";
import type { ReactElement } from "react";
import TopLoadingBar from "react-top-loading-bar";
import { useLocation } from "react-router";

function LoadingBar(): ReactElement {
  const [progress, setProgress] = useState(0);

  // page navigation.
  const location = useLocation();

  const startLoading = (): void => {
    setProgress(10);
  };

  const finishLoading = (): void => {
    setProgress(100);
    setTimeout(() => setProgress(0), 10);
  };

  useEffect(() => {
    const startId = setTimeout(() => {
      startLoading();
    }, 0);

    const finishId = setTimeout(() => {
      finishLoading();
    }, 2000);

    return () => {
      clearTimeout(startId);
      clearTimeout(finishId);
    };
  }, [location]);

  return <TopLoadingBar color="#5D87FF" height={3} progress={progress} />;
}

export default LoadingBar;
