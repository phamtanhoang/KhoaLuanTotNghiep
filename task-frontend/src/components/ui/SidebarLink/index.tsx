import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";

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
      className={`group relative flex items-center gap-2.5 rounded-sm py-[0.6rem] px-4 font-medium  duration-300 ease-in-out  ${
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

export default SidebarLink;
