import { useEffect } from "react";
import type { ReactNode, ReactElement } from "react";
import { useAppName } from "@/core/store/configStore";

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
};

/**
 * Page wrapper that sets the document title.
 */
const PageContainer = ({ title, children }: Props): ReactElement => {
  const appName = useAppName();

  useEffect(() => {
    document.title = title ? `${title} - ${appName}` : appName;
  }, [title, appName]);

  return <div>{children}</div>;
};

export default PageContainer;
