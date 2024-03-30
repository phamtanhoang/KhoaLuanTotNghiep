import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import LOGO from "@/assets/images/logo.png";
import { CANDIDATE_PATHS } from "@/utils/constants/pathConstants";
import { ModalController } from "@/App";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import NON_USER from "@/assets/images/non-user.jpg";

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  const dropdownRef = useRef<any>(null);
  const menuRef = useRef<any>(null);

  const context = useContext(ModalController);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 0 ? setSticky(true) : setSticky(false);
    });

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutsideMenu);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);

  const _onClickMenu = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenInfo(false);
      return;
    }
    setOpenInfo(true);
  };

  const handleClickOutsideMenu = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false);
      return;
    }
    setOpen(true);
  };

  const _onClickSignin = () => {
    context.setFuncs(MODAL_KEYS.signin);
    context.handleOpen();
  };
  const _onClickSignup = () => {
    context.setFuncs(MODAL_KEYS.signup);
    context.handleOpen();
  };
  const _onClickChangePassword = () => {
    context.setFuncs(MODAL_KEYS.changePassword);
    context.handleOpen();
  };

  return (
    <header
      className={`py-4 px-4 lg:px-28  w-full bg-white ${
        sticky && "fixed z-50  drop-shadow-md "
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="relative">
          <NavLink to={CANDIDATE_PATHS.default}>
            <img src={LOGO} alt="logo" className="h-9" />
          </NavLink>
        </div>
        <nav>
          <ul
            id="nav-menu"
            className="absolute top-16 border-t border-gray-300 left-0 bg-white w-full py-5 space-y-3 pl-4 transition-all duration-300 hidden sm:flex sm:top-1 sm:bg-transparent sm:border-none sm:items-center sm:space-y-0 sm:justify-center"
          >
            <li className="sm:mr-4 lg:mr-8 uppercase">
              <NavLink
                className="text-gray-800 hover:text-orangetext transition-colors duration-300 font-medium"
                to={CANDIDATE_PATHS.home}
              >
                Trang chủ
              </NavLink>
            </li>
            <li className="sm:mr-4 lg:mr-8 uppercase">
              <NavLink
                className="text-gray-800 hover:text-orangetext transition-colors duration-300 font-medium"
                to={CANDIDATE_PATHS.jobs}
              >
                Công việc
              </NavLink>
            </li>
            <li className="sm:mr-4 lg:mr-8 uppercase">
              <NavLink
                className="text-gray-800 hover:text-orangetext transition-colors duration-300 font-medium"
                to={CANDIDATE_PATHS.employers}
              >
                Nhà tuyển dụng
              </NavLink>
            </li>
          </ul>
          <div className="flex items-center  gap-5">
            <div className="flex gap-3">
              {/* <button
                className="relative hidden lg:block w-max px-4 py-1.5 text-orangetext transition duration-700 ease-out bg-white border-2 border-orangetext rounded-lg hover:border-orange-500 hover:text-orange-500"
                onClick={_onClickSignin}
              >
                Đăng nhập
              </button>
              <button
                className="relative hidden lg:block w-max px-4 py-1.5 text-white transition duration-500 ease-out bg-orangetext rounded-lg hover:bg-orange-500 hover:ease-in "
                onClick={_onClickSignup}
              >
                Đăng kí
              </button> */}
              <p className="hidden text-base px-2 pt-2 sm:block">
                Chào <span className="text-orangetext font-medium">Hoàng</span>{" "}
                !!!
              </p>
              <div className="relative" ref={dropdownRef}>
                <img
                  className="w-10 h-10 rounded-full "
                  src={NON_USER}
                  alt="candidate logo"
                />
                {openInfo && (
                  <div className="top-9 right-0 absolute my-4 text-base list-none  bg-[#fffefe] divide-y divide-gray-200 rounded-lg shadow-2xl z-[999]">
                    <div className="px-4 py-3 max-w-[200px]">
                      <span className="block text-sm text-gray-900 ">
                        Phạm Tấn Hoàng
                      </span>
                      <span className="block text-xs text-gray-500 truncate ">
                        phamtanoang3202@gmail.com
                      </span>
                    </div>
                    <ul className="py-2 w-[200px]">
                      <li>
                        <Link
                          to={CANDIDATE_PATHS.myProfile}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orangetext"
                        >
                          Quản lý hồ sơ
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={CANDIDATE_PATHS.appliedJobs}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orangetext"
                        >
                          Công việc đã ứng tuyển
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={CANDIDATE_PATHS.savedJobs}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orangetext"
                        >
                          Công việc đã lưu
                        </Link>
                      </li>
                      <li>
                        <a
                          className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orangetext"
                          onClick={_onClickChangePassword}
                        >
                          Đổi mật khẩu
                        </a>
                      </li>
                      <li>
                        <a
                          className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orangetext"
                          // onClick={LogoutHandle}
                        >
                          Đăng xuất
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <button
              className="cursor-pointer lg:hidden text-2xl text-orangetext"
              onClick={_onClickMenu}
            >
              {!open ? <AiOutlineMenu /> : <AiOutlineClose />}
            </button>
          </div>
        </nav>
      </div>
      <div
        ref={menuRef}
        className={`lg:hidden text-gray-700 absolute w-full
              py-10 font-medium bg-gray-50 top-19  duration-500 z-[999] px-10 ${
                open ? "left-0" : "-left-full"
              }`}
      >
        <ul className="flex flex-col justify-center h-full gap-10 text-lg text-center font-medium">
          <li className="px-5 hover:text-orangetext">
            <NavLink
              className="text-gray-800 hover:text-orangetext transition-colors duration-300 font-medium"
              to={CANDIDATE_PATHS.home}
            >
              Trang chủ
            </NavLink>
          </li>
          <li className="px-5 hover:text-orangetext">
            <NavLink
              className="text-gray-800 hover:text-orangetext transition-colors duration-300 font-medium"
              to={CANDIDATE_PATHS.jobs}
            >
              Công việc
            </NavLink>
          </li>
          <li className="px-5 hover:text-orangetext">
            <NavLink
              className="text-gray-800 hover:text-orangetext transition-colors duration-300 font-medium"
              to={CANDIDATE_PATHS.employers}
            >
              Nhà tuyển dụng
            </NavLink>
          </li>
          <li className="flex gap-5">
            <button
              className="w-full px-6 py-2 text-orangetext transition duration-700 ease-out bg-white border-2 border-orangetext rounded-lg hover:bg-orangetext hover:text-white"
              onClick={_onClickSignin}
            >
              Đăng nhập
            </button>
            <button
              className="w-full px-6 py-2 text-white transition duration-500 ease-out bg-orangetext rounded-lg hover:bg-orange-500 hover:ease-in "
              onClick={_onClickSignup}
            >
              Đăng kí
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Header;