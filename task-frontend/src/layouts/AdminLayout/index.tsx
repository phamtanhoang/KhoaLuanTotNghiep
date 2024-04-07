import { Outlet } from "react-router-dom";
import { Header, SideBar } from "./components";
import { useState } from "react";
import { Breadcumbs } from "@/components/ui";

const AdminLayout = () => {
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const _onClickOpen = () => {
    setOpenSideBar(!openSideBar);
  };
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased  text-black ">
      <Header openSideBar={openSideBar} />
      <SideBar openSideBar={openSideBar} _onClickOpen={_onClickOpen} />
      <main className="h-full ml-14 lg:ml-64 mt-[65px] p-3 lg:p-5">
        <div className="mb-2 lg:mb-4">
          <Breadcumbs color="#0C56D0" />
        </div>
        <Outlet />
      </main>
    </div>
  );
};
export default AdminLayout;
