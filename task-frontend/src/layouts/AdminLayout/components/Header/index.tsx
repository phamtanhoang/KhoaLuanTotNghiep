import { LoadingContext } from "@/App";
import { authsService } from "@/services";
import { ONCHANGE_ROLE } from "@/store/reducers/authReducer";
import { ADMIN_PATHS } from "@/utils/constants/pathConstants";
import { AuthHelper } from "@/utils/helpers/authHelper";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import { useContext } from "react";
import { BiLogOut } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
interface HeaderProps {
  openSideBar: boolean;
}
const Header: React.FC<HeaderProps> = ({ openSideBar }) => {
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
        navigate(ADMIN_PATHS.signin);
        SwalHelper.MiniAlert("Đăng xuất thành công", "success");

        context.handleCloseLoading();
      },
      () => {}
    );
  };
  return (
    <header className="fixed top-0 bg-white shadow-md flex items-center justify-between py-0 z-10 w-full">
      <Link
        to={ADMIN_PATHS.dashboard}
        className={`flex items-center justify-start lg:justify-center lg:pl-0 pl-3 lg:w-64 h-16 bg-bgBlue text-white gap-2 transition-all duration-300 ${
          openSideBar ? "max-lg:w-56" : "max-lg:w-14"
        }`}
      >
        <RiAdminFill className="text-3xl" />
        <p
          className={`lg:block font-bold text-3xl uppercase ${
            !openSideBar && "max-lg:hidden"
          }`}
        >
          Joobs
          <span className="text-sm ml-1.5 bg-white text-bgBlue px-1.5 py-0.5 rounded">
            admin
          </span>
        </p>
      </Link>

      <div className="flex justify-between items-center h-16 header-right">
        <a
          href="#"
          className="flex items-center mr-5 hover:text-bgBlue "
          onClick={_onClickLogout}
        >
          <BiLogOut className="text-lg mr-1" />
          Đăng xuất
        </a>
      </div>
    </header>
  );
};
export default Header;
