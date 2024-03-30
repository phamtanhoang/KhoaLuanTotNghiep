import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";

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

export default SidebarLinkAdmin;
