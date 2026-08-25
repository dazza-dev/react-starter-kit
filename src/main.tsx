import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { CustomizerContextProvider } from "@/core/context/CustomizerContextProvider";
import { QueryProvider } from "@/core/providers/QueryProvider";
import App from "@/App";
import "@/core/utils/i18n";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <CustomizerContextProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </CustomizerContextProvider>
  </StrictMode>,
);
