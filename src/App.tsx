import { ThemeSettings } from "@/core/theme/Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router";
import router from "@/routes/Router";

function App() {
  const theme = ThemeSettings();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
