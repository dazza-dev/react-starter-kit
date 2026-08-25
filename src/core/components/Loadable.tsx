import { Suspense } from "react";
import Spinner from "@/core/components/Spinner";
import type { ComponentType, ReactElement, Attributes } from "react";

const Loadable =
  <P,>(Component: ComponentType<P>) =>
  (props: P & Attributes): ReactElement => (
    <Suspense fallback={<Spinner minHeight="calc(100vh - 170px)" />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
