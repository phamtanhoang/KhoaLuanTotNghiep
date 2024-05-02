/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiFillHome } from "react-icons/ai";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaClipboardList, FaUserGraduate, FaUserTie } from "react-icons/fa";
import { RiVipDiamondFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineReadMore } from "react-icons/md";
import { FaTags } from "react-icons/fa6";
import { NavLink, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { PathConstants } from "@/utils/constants";

interface SideBarProps {
  openSideBar: boolean;
  _onClickOpen: () => void;
}

interface SidebarLinkAdminProps {
  link: string;
  name: string;
  icon: ReactNode;
  openSideBar: boolean;
}

const SidebarLinkAdmin = ({
  link,
  name,
  icon,
  openSideBar,
}: SidebarLinkAdminProps) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <NavLink
      to={link}
      className={`relative flex flex-row items-center  hover:text-bgBlue hover:bg-white rounded mx-2 p-2  ${
        pathname === link && "bg-white text-bgBlue"
      }`}
    >
      <p className={`flex gap-2  ${!openSideBar && "max-lg:mx-auto"}`}>
        {icon}
        <span
          className={`text-base tracking-wide truncate  ${
            openSideBar ? "block" : "max-lg:hidden"
          }`}
        >
          {name}
        </span>
      </p>
    </NavLink>
  );
};

const SideBar: React.FC<SideBarProps> = ({ openSideBar, _onClickOpen }) => {
  return (
    <aside
      className={`fixed flex flex-col top-16 left-0 w-14 lg:w-64 text-white transition-all duration-300 z-10 bg-bgBlue ${
        openSideBar ? "max-lg:w-56" : "max-lg:w-14"
      }`}
      style={{ height: "calc(100vh - 64px)" }}
    >
      <hr className="w-full"></hr>

      <div className="overflow-y-auto flex flex-col flex-grow scrollbar-custom py-2">
        <div className="lg:pt-4">
          <p className="px-3 lg:block  text-sm tracking-wide uppercase font-semibold mb-2 max-lg:hidden text-gray-300">
            Quản lý
          </p>
          <ul className="flex flex-col gap-1.5">
            <li>
              <SidebarLinkAdmin
                link={PathConstants.ADMIN_PATHS.dashboard}
                name="Trang chủ"
                icon={<AiFillHome className="text-2xl lg:text-xl m-auto" />}
                openSideBar={openSideBar}
              />
            </li>

            <li>
              <SidebarLinkAdmin
                link={PathConstants.ADMIN_PATHS.jobs}
                name="Tin tuyển dụng"
                icon={<FaClipboardList className="text-xl lg:text-lg m-auto" />}
                openSideBar={openSideBar}
              />
            </li>

            <li>
              <SidebarLinkAdmin
                link={PathConstants.ADMIN_PATHS.employers}
                name="Nhà tuyển dụng"
                icon={<FaUserTie className="text-xl lg:text-lg m-auto" />}
                openSideBar={openSideBar}
              />
            </li>
            <li>
              <SidebarLinkAdmin
                link={PathConstants.ADMIN_PATHS.candidates}
                name="Ứng viên"
                icon={<FaUserGraduate className="text-xl lg:text-lg m-auto" />}
                openSideBar={openSideBar}
              />
            </li>
            <li>
              <SidebarLinkAdmin
                link={PathConstants.ADMIN_PATHS.services}
                name="Gói dịch vụ"
                icon={
                  <RiVipDiamondFill className="text-xl lg:text-lg m-auto" />
                }
                openSideBar={openSideBar}
              />
            </li>
          </ul>
        </div>

        <div className="lg:pt-4">
          <p className="px-3 lg:block  text-sm tracking-wide uppercase font-semibold mb-2 max-lg:hidden text-gray-300">
            Chức năng
          </p>
          <ul className="flex flex-col gap-1.5">
            <li>
              <SidebarLinkAdmin
                link={PathConstants.ADMIN_PATHS.categories}
                name="Danh mục"
                icon={
                  <BiSolidCategoryAlt className="text-2xl lg:text-xl m-auto" />
                }
                openSideBar={openSideBar}
              />
            </li>
            <li>
              <SidebarLinkAdmin
                link={PathConstants.ADMIN_PATHS.tags}
                name="Nhãn"
                icon={<FaTags className="text-lg lg:text-lg m-auto" />}
                openSideBar={openSideBar}
              />
            </li>
            <li>
              <SidebarLinkAdmin
                link={PathConstants.ADMIN_PATHS.setting}
                name="Thiết lập"
                icon={<IoMdSettings className="text-2xl lg:text-xl m-auto" />}
                openSideBar={openSideBar}
              />
            </li>
          </ul>
        </div>
      </div>
      <hr className="lg:hidden w-full"></hr>
      <div className="flex justify-between lg:justify-center">
        <p
          className={`px-2.5 lg:p-3 text-center text-xs my-auto ${
            !openSideBar && "max-lg:hidden"
          }`}
        >
          Copyright &copy; {new Date().getFullYear()}, by{" "}
          <a href="https://github.com/phamtanhoang" className="font-medium">
            Hoang Pham
          </a>
        </p>
        <button
          className={`lg:hidden text-center text-4xl flex justify-center p-2.5  ${
            openSideBar && "rotate-180  "
          }`}
          onClick={_onClickOpen}
        >
          <MdOutlineReadMore />
        </button>
      </div>
    </aside>
  );
};
export default SideBar;
