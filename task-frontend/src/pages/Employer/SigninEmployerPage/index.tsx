import { LoadingContext } from "@/App";
import ModalBase from "@/components/modal";
import { authsService } from "@/services";
import { CLEAR_CURRENT_CANDIDATE } from "@/store/reducers/candidateReducer";
import { DataConstants } from "@/utils/constants/dataConstants";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import { EMPLOYER_PATHS } from "@/utils/constants/pathConstants";
import { AuthHelper } from "@/utils/helpers/authHelper";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import useCaptchaGenerator from "@/utils/hooks/useCaptchaGenerator";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./module.style.css";
import LOGO from "@/assets/images/auth-logo.jpg";

const SigninEmployerPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useContext(LoadingContext);

  const [open, setOpen] = useState(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { captchaText, canvasRef, reloadCaptcha } = useCaptchaGenerator();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [captcha, setCaptcha] = useState<string>("");

  const _onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const _onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const _onChangeCaptcha = (e: ChangeEvent<HTMLInputElement>) => {
    setCaptcha(e.target.value);
  };

  useEffect(() => {
    reloadCaptcha();
  }, []);

  const _onClickSubmit = () => {
    if (!email) {
      reloadCaptcha();
      SwalHelper.MiniAlert("Vui lòng nhập email!", "error");
      return;
    }
    if (!password) {
      reloadCaptcha();
      SwalHelper.MiniAlert("Vui lòng nhập mật khẩu!", "error");
      return;
    }
    if (captcha !== captchaText) {
      reloadCaptcha();
      SwalHelper.MiniAlert("Captcha không trùng khớp!", "error");
      return;
    }

    context.handleOpenLoading();
    authsService
      .signin(email, password, DataConstants.ROLE_DATA.EMPLOYER)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(CLEAR_CURRENT_CANDIDATE());
          AuthHelper.setAuthenticaton(res.data.Data.tokens, res.data.Data.user);
          navigate(EMPLOYER_PATHS.dashboard);
          SwalHelper.MiniAlert(res.data.Message, "success");
        } else {
          reloadCaptcha();
          SwalHelper.MiniAlert(
            res.data.Message || "Đăng nhập không thành công!",
            "error"
          );
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
  const _onClickSignup = () => {
    setFuncs(MODAL_KEYS.registerEmployer);
    handleOpen();
  };

  return (
    <>
      <ModalBase open={open} funcs={funcs} handleClose={handleClose} />

      <section className=" min-h-screen w-full flex items-stretch bg-gradient-to-b from-orangetext to-orangebackground leading-5 ">
        <main className="flex w-full lg:w-1/2 relative items-center bg-white">
          <div className="w-full  flex-col items-center max-w-[420px] mx-auto max-sm:p-5 ">
            <h4 className="mb-2.5 text-4xl font-bold text-navy-700">
              Đăng nhập thông tin nhà tuyển dụng.
            </h4>
            <p className="mb-9 ml-1 text-base text-gray-600">
              Hãy nhập vào email và mật khẩu của bạn
            </p>

            <div className="relative">
              <label className="text-sm font-medium text-gray-700 tracking-wide">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className=" w-full text-base py-2  border-b  border-borderColor focus:outline-none focus:border-orangetext"
                type="text"
                placeholder="employer@example.com"
                value={email}
                onChange={_onChangeEmail}
              />
            </div>
            <div className="mt-4 content-center">
              <label className="text-sm font-medium text-gray-700 tracking-wide">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full content-center text-base py-2  border-b  border-borderColor focus:outline-none focus:border-orangetext"
                type="password"
                placeholder="**********"
                value={password}
                onChange={_onChangePassword}
              />
            </div>
            <div className="mt-4 content-center">
              <label className="text-sm font-medium text-gray-700 tracking-wide">
                Captcha <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-5">
                <input
                  className="w-full content-center text-base py-2  border-b  border-borderColor focus:outline-none focus:border-orangetext"
                  type="text"
                  placeholder="Nhập mã captcha"
                  value={captcha}
                  onChange={_onChangeCaptcha}
                />
                <div className="flex ">
                  <canvas
                    ref={canvasRef}
                    width="130"
                    height="40"
                    className="border-2 border-orangetext rounded-l-lg border-r-0"
                  ></canvas>
                  <button
                    className="text-xl p-2 rounded-r-lg bg-orangetext text-gray-100 hover:bg-orange-500 cursor-pointer transition ease-in duration-300"
                    onClick={reloadCaptcha}
                  >
                    <IoReload />
                  </button>
                </div>
              </div>
            </div>
            <div className="my-4 flex items-center justify-between px-2">
              <a
                className="text-sm font-medium text-gray-800 hover:text-orangetext"
                href=" "
              >
                Quên mật khẩu?
              </a>
            </div>
            <button
              className="linear mt-2 w-full rounded-xl py-[12px] text-base font-medium text-white transition duration-200 bg-orangetext hover:bg-orange-500"
              onClick={_onClickSubmit}
            >
              Đăng nhập
            </button>
            <div className="mt-4 flex">
              <span className=" text-sm font-medium text-navy-700">
                Tôi chưa có tài khoản?
              </span>
              <p
                className="ml-1 text-sm font-medium text-orangetext hover:text-orangetext/80 cursor-pointer"
                onClick={_onClickSignup}
              >
                Đăng kí nhà tuyển dụng!
              </p>
            </div>
          </div>
        </main>
        <div className="lg:flex w-1/2 hidden bg-transparent relative items-center">
          <div
            className="absolute  opacity-75 inset-0 z-0"
            style={{
              backgroundImage: `url(${LOGO})`,
            }}
          ></div>
          <div className="w-full max-w-[500px] mx-auto z-10 p-10 bg-white rounded-md opacity-90">
            <h1 className="my-3 xl:text-5xl font-bold leading-8 text-gray-900">
              Joobs tuyển dụng xin chào!
            </h1>
            <p className="lg:text-base text-gray-700 font-normal leading-tight">
              Joobs sẽ giúp bạn tìm được nhân sự phù hợp nhanh chóng và hiệu
              quả. Đăng ký tài khoản ngay để có thể quản lý tin đăng và thông
              tin ứng tuyển vào các vị trí của bạn.
            </p>
          </div>
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </section>
    </>
  );
};
export default SigninEmployerPage;
