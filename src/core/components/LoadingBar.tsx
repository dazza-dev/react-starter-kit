import { useState, useEffect } from "react";
import TopLoadingBar from "react-top-loading-bar";
import { useLocation } from "react-router";

function LoadingBar() {
  const [progress, setProgress] = useState(0);

  // page navigation.
  const location = useLocation();

  // Start loading
  const startLoading = () => {
    setProgress(10);
  };

  // Complete loading
  const finishLoading = () => {
    setProgress(100);
    setTimeout(() => setProgress(0), 10); // Reset progress after completion
  };

  // Trigger loading when route changes
  useEffect(() => {
    startLoading();
    setTimeout(() => {
      finishLoading(); // Complete the loader after 2 seconds (or after data load)
    }, 2000); // 2-second delay
  }, [location]); // trigger whenever the route changes

  return <TopLoadingBar color="#5D87FF" height={3} progress={progress} />;
}

export default LoadingBar;
