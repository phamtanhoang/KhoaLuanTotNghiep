import { ReactNode, useState } from "react";
import { Footer, Header, Sidebar } from "./components";
import { Outlet } from "react-router-dom";
import { BreadcumbsEmployer } from "@/components/ui";

const EmployerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-body dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="lg:hidden p-4">
            <BreadcumbsEmployer />
          </div>
          <main className="lg:pl-0 lg:p-4 w-full flex-1 flex flex-col gap-4">
            <Outlet />
          </main>
          {/* <div className="w-full py-4">
            <Footer />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default EmployerLayout;
