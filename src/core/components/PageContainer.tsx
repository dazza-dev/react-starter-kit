import { Helmet } from "react-helmet";
import type { ReactNode, ReactElement } from "react";

type Props = {
  description?: string;
  children: ReactNode;
  title?: string;
};

const PageContainer = ({
  title,
  description,
  children,
}: Props): ReactElement => (
  <div>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    {children}
  </div>
);

export default PageContainer;
