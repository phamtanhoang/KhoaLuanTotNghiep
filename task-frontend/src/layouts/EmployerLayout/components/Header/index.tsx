import { Breadcumbs } from "@/components/ui";
import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineMenu, AiOutlineMessage } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import NON_USER from "@/assets/images/non-user.jpg";
import { IoNotificationsOutline } from "react-icons/io5";
import { EMPLOYER_PATHS } from "@/utils/constants/pathConstants";
import { FaChevronDown } from "react-icons/fa6";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import ModalBase from "@/components/modal";
import { LoadingContext } from "@/App";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import { authsService } from "@/services";
import { AuthHelper } from "@/utils/helpers/authHelper";
import { useDispatch } from "react-redux";
import { ONCHANGE_ROLE } from "@/store/reducers/authReducer";

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
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

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="relative flex items-center justify-center rounded-full  hover:text-orangetext p-0.5"
        to="#"
      >
        <span className="absolute top-[0.175rem] right-[0.25rem] h-2 w-2 rounded-full bg-red-500 ">
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60"></span>
        </span>

        <AiOutlineMessage className="text-2xl" />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`bg-white absolute -right-1 mt-2.5 lg:right-0  w-72 lg:w-80 h-max max-h-96 flex flex-col rounded-sm border border-borderColor ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3">
          <h5 className="text-sm font-medium text-lightGray">Messages</h5>
        </div>

        <ul className="flex h-max flex-col overflow-y-auto journal-scroll">
          <li>
            <Link
              className="flex gap-4 border-t px-4 py-3 hover:bg-body2"
              to="/messages"
            >
              <img
                src={NON_USER}
                alt="User"
                className="h-14 w-14 rounded-full"
              />

              <div>
                <h6 className="text-sm font-medium text-black">
                  Mariya Desoja
                </h6>
                <p className="text-sm line-clamp-1">
                  I like your confidence 💪 I like your confidence 💪
                </p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t px-4 py-3 hover:bg-body2"
              to="/messages"
            >
              <img
                src={NON_USER}
                alt="User"
                className="h-14 w-14 rounded-full"
              />

              <div>
                <h6 className="text-sm font-medium text-black">
                  Mariya Desoja
                </h6>
                <p className="text-sm line-clamp-1">
                  I like your confidence 💪 I like your confidence 💪
                </p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t px-4 py-3 hover:bg-body2"
              to="/messages"
            >
              <img
                src={NON_USER}
                alt="User"
                className="h-14 w-14 rounded-full"
              />

              <div>
                <h6 className="text-sm font-medium text-black">
                  Mariya Desoja
                </h6>
                <p className="text-sm line-clamp-1">
                  I like your confidence 💪 I like your confidence 💪
                </p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t px-4 py-3 hover:bg-body2"
              to="/messages"
            >
              <img
                src={NON_USER}
                alt="User"
                className="h-14 w-14 rounded-full"
              />

              <div>
                <h6 className="text-sm font-medium text-black">
                  Mariya Desoja
                </h6>
                <p className="text-sm line-clamp-1">
                  I like your confidence 💪 I like your confidence 💪
                </p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t px-4 py-3 hover:bg-body2"
              to="/messages"
            >
              <img
                src={NON_USER}
                alt="User"
                className="h-14 w-14 rounded-full"
              />

              <div>
                <h6 className="text-sm font-medium text-black">
                  Mariya Desoja
                </h6>
                <p className="text-sm line-clamp-1">
                  I like your confidence 💪 I like your confidence 💪
                </p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
};

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

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

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        to="#"
        className="relative flex items-center justify-center rounded-full  hover:text-orangetext p-0.5"
      >
        <span className="absolute top-[0.175rem] right-[0.25rem] h-2 w-2 rounded-full bg-red-500 ">
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60"></span>
        </span>
        <IoNotificationsOutline className="text-2xl" />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`bg-white absolute -right-5 mt-2.5 lg:right-0  w-72 lg:w-80 h-max max-h-96 flex flex-col rounded-sm border border-borderColor ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3">
          <h5 className="text-sm font-medium text-lightGray">Thông báo</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto scrollbar-custom">
          <li>
            <Link
              className="flex flex-col gap-2.5 border-t border-borderColor px-4 py-3 hover:bg-body2"
              to="#"
            >
              <p className="text-sm text-black line-clamp-3">
                Edit your information in a swipe Sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim.Edit
                your information in a swipe Sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim.
              </p>

              <p className="text-xs">12 May, 2025</p>
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
};

interface DropdownUserProps {
  _onClickChangePassword: () => void;
  _onClickLogout: () => void;
}
const DropdownUser: React.FC<DropdownUserProps> = ({
  _onClickChangePassword,
  _onClickLogout,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

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

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const navigate = useNavigate();
  const context = useContext(LoadingContext);
  const dispatch = useDispatch();

  const _onClickLogout = () => {
    SwalHelper.Confirm(
      "Bạn có muốn đăng xuất?",
      "question",
      () => {
        context.handleOpenLoading();

        AuthHelper.removeTokens();
        dispatch(ONCHANGE_ROLE(""));
        navigate(EMPLOYER_PATHS.signin);
        SwalHelper.MiniAlert("Đăng xuất thành công", "success");
        context.handleCloseLoading();
      },
      () => {}
    );
  };

  const _onClickChangePassword = () => {
    setFuncs(MODAL_KEYS.changePassword);
    handleOpen();
  };
  return (
    <>
      <ModalBase
        open={openModal}
        handleClose={handleClose}
        funcs={funcs}
        setFuncs={setFuncs}
      />
      <header className="sticky top-0 lg:top-2 z-[98] flex bg-white lg:m-2 lg:ml-0  lg:rounded-xl max-lg:border-b  justify-between px-4 py-3 text-gray-800 lg:opacity-95">
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

          <DropdownUser
            _onClickChangePassword={_onClickChangePassword}
            _onClickLogout={_onClickLogout}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
