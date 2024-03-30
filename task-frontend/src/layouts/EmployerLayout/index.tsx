import { useState } from "react";
import { Header, Sidebar } from "./components";
import { Outlet } from "react-router-dom";
import { Breadcumbs } from "@/components/ui";

const EmployerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-body dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="lg:hidden p-4">
            <Breadcumbs color="#f2994a" />
          </div>
          <main className="lg:pl-0 lg:p-4 w-full flex-1 flex flex-col gap-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default EmployerLayout;
