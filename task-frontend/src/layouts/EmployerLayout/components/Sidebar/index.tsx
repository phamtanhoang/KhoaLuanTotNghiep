import { ReactNode, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LOGO from "@/assets/images/logo.png";
import { EMPLOYER_PATHS } from "@/utils/constants/pathConstants";
import { IoHome, IoNewspaper } from "react-icons/io5";

import { FaClipboardList, FaUsers } from "react-icons/fa6";
import { FaUsersCog } from "react-icons/fa";
import { RiUserSearchFill } from "react-icons/ri";
import { AiFillMessage, AiFillSchedule } from "react-icons/ai";
import { MdTimeline } from "react-icons/md";
import { AuthHelper } from "@/utils/helpers/authHelper";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

interface SidebarLinkProps {
  link: string;
  name: string;
  icon?: ReactNode;
  setSidebarOpen?: any;
}

const SidebarLink = ({
  link,
  name,
  icon,
  setSidebarOpen,
}: SidebarLinkProps) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <NavLink
      to={link}
      className={`group relative flex items-center gap-2.5 rounded-sm py-2.5 px-4 font-medium  duration-300 ease-in-out  ${
        pathname === link
          ? "bg-orangetext text-white"
          : "hover:bg-gray-500/10 text-gray-600"
      }`}
      onClick={() => {
        setSidebarOpen(false);
      }}
    >
      {icon}
      {name}
    </NavLink>
  );
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-[99] flex w-72 h-[100vh] lg:h-[calc(100vh-16px)] flex-col overflow-y-hidden bg-white duration-300 ease-linear lg:static lg:translate-x-0 lg:m-2 lg:rounded-xl  border-r lg:border border-borderColor ${
        sidebarOpen ? "translate-x-0" : "-translate-x-80"
      }`}
    >
      <div className="flex items-center justify-between px-12 py-3">
        <NavLink
          to={EMPLOYER_PATHS.dashboard}
          onClick={() => setSidebarOpen(false)}
        >
          <img src={LOGO} alt="Logo" className="w-full" />
        </NavLink>

        <button
          ref={trigger}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="hidden"
        ></button>
      </div>
      <hr className="border-t border-borderColor" />

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear scrollbar-custom my-4 mx-1">
        <nav className="px-2">
          <div>
            <h3 className="mb-2 ml-4 text-sm font-bold text-lightGray">
              CHỨC NĂNG
            </h3>

            <ul className="mb-4 flex flex-col gap-1.5">
              <li>
                <SidebarLink
                  link={EMPLOYER_PATHS.dashboard}
                  name="Trang chủ"
                  icon={<IoHome className="text-lg" />}
                  setSidebarOpen={setSidebarOpen}
                />
              </li>
              <li>
                <SidebarLink
                  link={EMPLOYER_PATHS.jobs}
                  name="Công việc"
                  icon={<FaClipboardList className="text-lg" />}
                  setSidebarOpen={setSidebarOpen}
                />
              </li>
              <li>
                <SidebarLink
                  link={EMPLOYER_PATHS.applys}
                  name="Đơn ứng tuyển"
                  icon={<IoNewspaper className="text-lg" />}
                  setSidebarOpen={setSidebarOpen}
                />
              </li>
              <li>
                <SidebarLink
                  link={EMPLOYER_PATHS.procedure}
                  name="Quy trình"
                  icon={<MdTimeline className="text-xl" />}
                  setSidebarOpen={setSidebarOpen}
                />
              </li>
              <li>
                <SidebarLink
                  link={EMPLOYER_PATHS.findCandidate}
                  name="Tìm ứng viên"
                  icon={<RiUserSearchFill className="text-lg" />}
                  setSidebarOpen={setSidebarOpen}
                />
              </li>
              {AuthHelper.isEmployer() && (
                <li>
                  <SidebarLink
                    link={EMPLOYER_PATHS.hr}
                    name="Bộ phận nhân sự"
                    icon={<FaUsers className="text-lg" />}
                    setSidebarOpen={setSidebarOpen}
                  />
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 ml-4 text-sm font-bold text-lightGray">KHÁC</h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <SidebarLink
                  link={EMPLOYER_PATHS.schedule}
                  name="Lịch"
                  icon={<AiFillSchedule className="text-xl" />}
                  setSidebarOpen={setSidebarOpen}
                />
              </li>
              <li>
                <SidebarLink
                  link={EMPLOYER_PATHS.chat}
                  name="Trò chuyện"
                  icon={<AiFillMessage className="text-lg" />}
                  setSidebarOpen={setSidebarOpen}
                />
              </li>

              {/* <li>
                <SidebarLink
                  link={EMPLOYER_PATHS.setting}
                  name="Phân quyền"
                  icon={<FaUsersCog className="text-xl" />}
                  setSidebarOpen={setSidebarOpen}
                />
              </li> */}
            </ul>
          </div>
        </nav>
      </div>
      <p className="px-2 py-3 text-center text-xs mt-auto border-t border-borderColor">
        Copyright &copy; {new Date().getFullYear()}, by{" "}
        <a
          href="https://github.com/phamtanhoang"
          className="font-medium hover:text-orangetext"
        >
          Hoang Pham
        </a>
      </p>
    </aside>
  );
};

export default Sidebar;
