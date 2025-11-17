import { Outlet } from "react-router";
import LoadingBar from "@/core/components/LoadingBar";

const BlankLayout = () => (
  <>
    <LoadingBar />
    <Outlet />
  </>
);

export default BlankLayout;
