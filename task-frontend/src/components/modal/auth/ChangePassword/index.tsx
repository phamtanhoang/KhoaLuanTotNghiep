import { LoadingContext } from "@/App";
import { authsService } from "@/services";
import { CLEAR_AUTH_DATA } from "@/store/reducers/authReducer";
import { ModalConstants } from "@/utils/constants";
import { AuthHelper, SwalHelper } from "@/utils/helpers";
import { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const ChangePassword = (props: any) => {
  const handleClose = props.handleClose;
  const setFuncs = props.setFuncs;
  const context = useContext(LoadingContext);
  const dispatch = useDispatch();
  const location = useLocation();
  const isAdminPath = location.pathname.includes("/admin/");

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const _onClickSubmit = () => {
    if (!currentPassword || !confirmNewPassword || !newPassword) {
      SwalHelper.MiniAlert("Vui lòng nhập đầy đủ thông tin!", "warning");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      SwalHelper.MiniAlert("Mật khẩu không khớp!", "warning");
      return;
    }

    SwalHelper.Confirm(
      "Xác nhận đổi mật khẩu?",
      "question",
      () => {
        context.handleOpenLoading();
        authsService
          .changePassword(currentPassword, newPassword)
          .then((res) => {
            if (res.status === 200 && res.data.Status === 200) {
              dispatch(CLEAR_AUTH_DATA());
              AuthHelper.removeAuthenticaton();
              SwalHelper.MiniAlert(
                "Đổi mật khẩu thành công, vui lòng đăng nhập lại!",
                "success"
              );
              setFuncs(ModalConstants.AUTH_KEYS.signin);
            } else {
              SwalHelper.MiniAlert(
                res.data.Message || "Đổi mật khẩu không thành công!",
                "error"
              );
            }
          })
          .catch(() => {
            SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
          })
          .finally(() => {
            context.handleCloseLoading();
          });
      },
      () => {}
    );
  };
  return (
    <div className="sm:w-[30rem] w-screen p-8 bg-white sm:rounded-xl relative h-max max-h-[90%] overflow-auto scrollbar-custom">
      <button
        className={`p-2 rounded-full absolute top-2 right-2 text-xl text-gray-800 hover:text-white ${
          isAdminPath ? "hover:bg-bgBlue" : "hover:bg-orangetext"
        } `}
        onClick={handleClose}
      >
        <AiOutlineClose />
      </button>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 uppercase">
          Joobs Cập Nhật!
        </h2>
        <p className="mt-2 text-base text-gray-600">
          Cập nhật mật khẩu để tăng cường bảo mật tài khoản.
        </p>
      </div>

      <div className="flex items-center justify-center mt-2 gap-3">
        <span className="h-px w-32 bg-gray-300"></span>
      </div>
      <div className="mt-8">
        <div className="mt-4 content-center">
          <label className="text-sm font-semibold text-gray-700 tracking-wide">
            Mật khẩu hiện tại
          </label>
          <input
            className={`w-full content-center text-base py-2  border-b  border-gray-300 focus:outline-none ${
              isAdminPath ? "focus:border-bgBlue" : "focus:border-orangetext"
            }`}
            type="password"
            placeholder="**********"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="mt-4 content-center">
          <label className="text-sm font-semibold text-gray-700 tracking-wide">
            Mật khẩu mới
          </label>
          <input
            className={`w-full content-center text-base py-2  border-b  border-gray-300 focus:outline-none ${
              isAdminPath ? "focus:border-bgBlue" : "focus:border-orangetext"
            }`}
            type="password"
            placeholder="**********"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mt-4 content-center">
          <label className="text-sm font-semibold text-gray-700 tracking-wide">
            Nhập lại mật khẩu mới
          </label>
          <input
            className={`w-full content-center text-base py-2  border-b  border-gray-300 focus:outline-none ${
              isAdminPath ? "focus:border-bgBlue" : "focus:border-orangetext"
            }`}
            type="password"
            placeholder="**********"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            className={`mt-4 w-full flex justify-center ${
              isAdminPath ? "bg-bgBlue" : "bg-orangetext"
            } text-gray-100 p-3  rounded-full tracking-wide
                            font-semibold  focus:outline-none focus:shadow-outline ${
                              isAdminPath
                                ? "hover:bg-bgBlue/80"
                                : "hover:bg-orangetext/85"
                            } shadow-lg cursor-pointer transition ease-in duration-300`}
            onClick={_onClickSubmit}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChangePassword;
