import {
  Breadcumbs,
  DropdownMessage,
  DropdownNotification,
  DropdownUser,
} from "@/components/ui";
import { AiOutlineMenu } from "react-icons/ai";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 lg:top-4 z-[98] flex bg-white lg:m-4 lg:ml-0 lg:rounded-xl max-lg:border-b  justify-between px-4 py-3 text-gray-800 lg:opacity-95">
      <div className="flex items-center">
        <button
          aria-controls="sidebar"
          onClick={(e) => {
            e.stopPropagation();
            props.setSidebarOpen(!props.sidebarOpen);
          }}
          className="z-[97] p-1.5 lg:hidden"
        >
          <AiOutlineMenu className="text-xl" />
        </button>
        <div className="max-lg:hidden">
          <Breadcumbs color="#f2994a" />
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-6">
        <ul className="flex items-center gap-2 lg:gap-3">
          {/* <DarkModeSwitcher /> */}

          <DropdownNotification />

          <DropdownMessage />
        </ul>

        <DropdownUser />
      </div>
    </header>
  );
};

export default Header;
