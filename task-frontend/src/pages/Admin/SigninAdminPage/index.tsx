import { LoadingContext } from "@/App";
import { LoadingSpiner } from "@/components/ui";
import { authsService } from "@/services";
import { ADMIN_PATHS } from "@/utils/constants/pathConstants";
import { AuthHelper } from "@/utils/helpers/authHelper";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const SigninAdminPage = () => {
  const context = useContext(LoadingContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const _onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const _onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const _onClickSubmit = () => {
    setError("");
    if (!email) {
      setError("Vui lòng nhập email!!!");
      return;
    }
    if (!password) {
      setError("Vui lòng nhập mật khẩu!!!");
      return;
    }

    context.handleOpenLoading();
    authsService
      .signin(email.trim(), password.trim())
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          if (res.data.Data.admin) {
            console.log(
              " res.data.Data.tokens.token, ",
              res.data.Data.tokens.token
            );
            AuthHelper.setTokens(
              res.data.Data.tokens.token,
              res.data.Data.tokens.token
            );
            navigate(ADMIN_PATHS.dashboard);
            SwalHelper.MiniAlert(res.data.Message, "success");
          } else {
            setError("Bạn không có quyền truy cập!");
          }
        } else {
          setError(res.data.Message || "Đăng nhập không thành công");
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
    <>
      <div className="min-h-screen flex items-center justify-center w-full bg-body">
        <div
          className="bg-white shadow-md rounded-lg px-5 py-10 lg:px-10 lg:py-10 max-w-md w-full lg:w-[40%]"
          // onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-bold text-center mb-2 uppercase">
            Đăng nhập
          </h1>
          <p className="text-center text-base font-normal text-gray-700 mb-6">
            Đăng nhập tài khoản quản trị viên!
          </p>
          <div>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div className="mb-4">
              <label className="block text-base font-medium text-gray-700 mb-1">
                Email:
              </label>
              <input
                type="email"
                value={email}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-bgBlue focus:border-bgBlue"
                placeholder="your@email.com"
                required
                onChange={_onChangeEmail}
              />
            </div>
            <div className="mb-4">
              <label className="block text-base font-medium text-gray-700 mb-1">
                Mật khẩu:
              </label>
              <input
                type="password"
                value={password}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-bgBlue focus:border-bgBlue"
                placeholder="********"
                required
                onChange={_onChangePassword}
              />
            </div>

            <button
              type="submit"
              className="mt-8 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-bgBlue hover:bg-bgBlue/85 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bgBlue"
              onClick={_onClickSubmit}
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SigninAdminPage;
