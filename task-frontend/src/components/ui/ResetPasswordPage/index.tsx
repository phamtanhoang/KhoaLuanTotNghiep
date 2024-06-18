import { LoadingContext } from "@/App";
import { authsService } from "@/services";
import { CLEAR_AUTH_DATA } from "@/store/reducers/authReducer";
import { DataConstants, PathConstants } from "@/utils/constants";
import { AuthHelper, SwalHelper } from "@/utils/helpers";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useContext(LoadingContext);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPasword, setConfirmPassword] = useState("");

  console.log(token);
  useEffect(() => {
    if (!token) {
      navigate(PathConstants.CANDIDATE_PATHS.home);
    }
  }, []);

  const _onclick = () => {
    if (!password || !confirmPasword) {
      SwalHelper.MiniAlert("Vui lòng nhập đầy đủ thông tin!", "warning");
      return;
    }
    if (password !== confirmPasword) {
      SwalHelper.MiniAlert("Mật khẩu không khớp!", "warning");
      return;
    }
    context.handleOpenLoading();
    authsService
      .resetPassword(password, token!)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(CLEAR_AUTH_DATA());
          AuthHelper.removeAuthenticaton();
          SwalHelper.MiniAlert("Đổi mật khẩu thành công!", "success");
          if (
            res.data.Data.role === DataConstants.ROLE_DATA.EMPLOYER ||
            res.data.Data.role === DataConstants.ROLE_DATA.HR
          ) {
            navigate(PathConstants.EMPLOYER_PATHS.signin);
          } else {
            navigate(PathConstants.CANDIDATE_PATHS.home);
          }
        } else {
          SwalHelper.MiniAlert(res.data.Message, "error");
        }
      })
      .catch(() => {
        SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
      })
      .finally(() => {
        context.handleCloseLoading();
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-body">
      <div className="bg-white shadow-md rounded-lg px-5 py-10 lg:px-10 lg:py-10 max-w-md w-full lg:w-[40%]">
        <h1 className="text-3xl font-bold text-center mb-4 uppercase">
          Khôi phục mật khẩu
        </h1>
        <div>
          <div className="mb-4">
            <label className="block text-base font-medium text-gray-700 mb-1">
              Mật khẩu:
            </label>
            <input
              type="password"
              value={password}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-orangetext focus:border-orangetext"
              placeholder="********"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-medium text-gray-700 mb-1">
              Nhập lại mật khẩu:
            </label>
            <input
              type="password"
              value={confirmPasword}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-orangetext focus:border-orangetext"
              placeholder="********"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="mt-8 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orangetext hover:bg-orangetext/85 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orangetext"
            onClick={_onclick}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};
export default ResetPasswordPage;
