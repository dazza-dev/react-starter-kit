import { Suspense } from "react";
import { CustomizerContextProvider } from "@/core/context/CustomizerContextProvider";
import { QueryProvider } from "@/core/providers/QueryProvider";
import ReactDOM from "react-dom/client";
import App from "@/App";
import Spinner from "@/core/components/Spinner";
import "@/utils/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CustomizerContextProvider>
    <QueryProvider>
      <Suspense fallback={<Spinner />}>
        <App />
      </Suspense>
    </QueryProvider>
  </CustomizerContextProvider>
);
