import { Suspense, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { useBuildTheme } from "@/core/theme/Theme";
import { useAppName, useConfigStore } from "@/core/store/configStore";
import { useCustomizer } from "@/core/context/CustomizerContext";
import { THEME_NAMES } from "@/core/types/theme.types";
import type { ThemeName } from "@/core/types/theme.types";
import Spinner from "@/core/components/Spinner";
import router from "@/core/routes/Router";

function App() {
  const theme = useBuildTheme();
  const appName = useAppName();
  const fetchSettings = useConfigStore((state) => state.fetchSettings);
  const appTheme = useConfigStore((state) => state.settings.appTheme) as ThemeName | undefined;
  const { setActiveTheme } = useCustomizer();

  // Settings feed the app name and logo; loaded once on startup.
  useEffect(() => {
    void fetchSettings();
  }, [fetchSettings]);

  // The palette served by the backend overrides the one saved in the browser.
  useEffect(() => {
    if (appTheme && THEME_NAMES.includes(appTheme)) setActiveTheme(appTheme);
  }, [appTheme, setActiveTheme]);

  useEffect(() => {
    document.title = appName;
  }, [appName]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer
        position="top-center"
        theme="colored"
        autoClose={5000}
        limit={3}
        newestOnTop
      />
      <Suspense fallback={<Spinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
