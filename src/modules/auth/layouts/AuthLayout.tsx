import AuthLayoutBoxed from "@/modules/auth/layouts/AuthLayoutBoxed";
import AuthLayoutSide from "@/modules/auth/layouts/AuthLayoutSide";

type Props = {
  type: "boxed" | "side";
  title?: string;
  description?: string;
  children: any | any[];
};

const AuthLayout = ({ type, title, description, children }: Props) =>
  type === "boxed" ? (
    <AuthLayoutBoxed title={title} description={description}>
      {children}
    </AuthLayoutBoxed>
  ) : (
    <AuthLayoutSide title={title} description={description}>
      {children}
    </AuthLayoutSide>
  );

export default AuthLayout;
