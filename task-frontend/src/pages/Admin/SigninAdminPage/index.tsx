import { LoadingContext } from "@/App";
import { authsService } from "@/services";
import { CLEAR_AUTH_DATA } from "@/store/reducers/authReducer";
import { PathConstants, DataConstants } from "@/utils/constants";
import { AuthHelper, SwalHelper } from "@/utils/helpers";
import { useCaptchaGenerator } from "@/utils/hooks";
import { useContext, useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SigninAdminPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useContext(LoadingContext);

  const { captchaText, canvasRef, reloadCaptcha } = useCaptchaGenerator();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [captcha, setCaptcha] = useState<string>("");
  const [error, setError] = useState<string>("");

  const _onClickSubmit = () => {
    setError("");
    if (!email) {
      reloadCaptcha();
      setError("Vui lòng nhập email!!!");
      return;
    }
    if (!password) {
      reloadCaptcha();
      setError("Vui lòng nhập mật khẩu!!!");
      return;
    }
    if (captcha !== captchaText) {
      reloadCaptcha();
      setError("Captcha không trùng khớp!");
      return;
    }

    context.handleOpenLoading();
    authsService
      .signin(email.trim(), password.trim(), DataConstants.ROLE_DATA.ADMIN)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(CLEAR_AUTH_DATA());
          AuthHelper.setAuthenticaton(res.data.Data.tokens, res.data.Data.user);
          navigate(PathConstants.ADMIN_PATHS.dashboard);
          SwalHelper.MiniAlert(res.data.Message, "success");
        } else {
          reloadCaptcha();
          setError(res.data.Message || "Đăng nhập không thành công");
        }
      })
      .catch(() => {
        reloadCaptcha();
        SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
      })
      .finally(() => {
        context.handleCloseLoading();
      });
  };
  useEffect(() => {
    reloadCaptcha();
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        _onClickSubmit();
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);
  return (
    <>
      <div className="min-h-screen flex items-center justify-center w-full bg-body">
        <div className="bg-white shadow-md rounded-lg px-5 py-10 lg:px-10 lg:py-10 max-w-md w-full lg:w-[40%]">
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-4 content-center">
              <label className="block text-base font-medium text-gray-700 mb-1">
                Captcha:
              </label>
              <div className="flex gap-3">
                <input
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-bgBlue focus:border-bgBlue"
                  type="text"
                  placeholder="Nhập mã captcha"
                  value={captcha}
                  onChange={(e) => {
                    setCaptcha(e.target.value);
                  }}
                />
                <div className="flex ">
                  <canvas
                    ref={canvasRef}
                    width="130"
                    height="40"
                    className="border-2 border-bgBlue rounded-l-lg border-r-0"
                  ></canvas>
                  <button
                    className="text-xl p-2 rounded-r-lg bg-bgBlue text-gray-100 hover:bg-bgBlue/85 cursor-pointer transition ease-in duration-300"
                    onClick={reloadCaptcha}
                  >
                    <IoReload />
                  </button>
                </div>
              </div>
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
