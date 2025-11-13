import { Helmet } from "react-helmet";

type Props = {
  description?: string;
  children: any | any[];
  title?: string;
};

const PageContainer = ({ title, description, children }: Props) => (
  <div>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    {children}
  </div>
);

export default PageContainer;
