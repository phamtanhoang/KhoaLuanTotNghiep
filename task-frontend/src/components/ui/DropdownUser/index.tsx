import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import NON_USER from "@/assets/images/non-user.jpg";
import { FaChevronDown } from "react-icons/fa6";
import { EMPLOYER_PATHS } from "@/utils/constants/pathConstants";
import { ModalController } from "@/App";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import Swal from "sweetalert2";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const context = useContext(ModalController);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const _onClickLogout = () => {
    Swal.fire({
      icon: "warning",
      title: "Bạn có muốn đăng xuất?",
      showCancelButton: true,
      cancelButtonText: "Hủy bỏ",
      confirmButtonText: "Đồng ý",

      customClass: {
        confirmButton: "confirm-button-class",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire("Thành công!", "Your item has been deleted.", "success");
      } else if (result.isDismissed) {
      }
    });
  };
  const _onClickChangePassword = () => {
    context.setFuncs(MODAL_KEYS.changePassword);
    context.handleOpen();
  };

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black ">
            Thomas Anree
          </span>
          <span className="block text-xs">UX Designer</span>
        </span>

        <span className="h-10 w-10 rounded-full">
          <img src={NON_USER} alt="User" />
        </span>

        <FaChevronDown
          className={`hidden fill-current lg:block ${
            dropdownOpen ? "rotate-180" : ""
          }`}
        />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`bg-white absolute -right-2 mt-2.5 lg:right-0  w-max h-max max-h-96 flex flex-col rounded-sm border border-borderColor ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col border-b border-borderColor w-[200px]">
          <li>
            <Link
              to={EMPLOYER_PATHS.profile}
              className="block px-5 py-2.5 text-base font-medium hover:bg-gray-500/10 hover:text-orangetext"
            >
              Quản lý tài khoản
            </Link>
          </li>
          <li>
            <Link
              to={EMPLOYER_PATHS.upgrade}
              className="block px-5 py-2.5 text-base font-medium hover:bg-gray-500/10 hover:text-orangetext"
            >
              Nâng cấp tài khoản
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col border-borderColor w-[200px]">
          <li>
            <div
              className="block px-5 py-2.5 text-base font-medium hover:bg-gray-500/10 hover:text-orangetext cursor-pointer"
              onClick={_onClickChangePassword}
            >
              Đổi mật khẩu
            </div>
          </li>
          <li>
            <div
              className="block px-5 py-2.5 text-base font-medium hover:bg-gray-500/10 hover:text-orangetext cursor-pointer"
              onClick={_onClickLogout}
            >
              Đăng xuất
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownUser;
