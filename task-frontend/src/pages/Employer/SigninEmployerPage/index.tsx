import { LoadingContext } from "@/App";
import { authsService } from "@/services";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import { EMPLOYER_PATHS } from "@/utils/constants/pathConstants";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import useCaptchaGenerator from "@/utils/hooks/useCaptchaGenerator";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import { Link } from "react-router-dom";

const SigninEmployerPage = () => {
  const context = useContext(LoadingContext);

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
      SwalHelper.MiniAlert("Vui lòng nhập email!", "error");
      return;
    }
    if (!password) {
      SwalHelper.MiniAlert("Vui lòng nhập mật khẩu!", "error");
      return;
    }
    if (captcha !== captchaText) {
      SwalHelper.MiniAlert("Captcha không trùng khớp!", "error");
      return;
    }

    context.handleOpenLoading();
    authsService
      .signin(email, password)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          if (res.data.Data.employer) {
            const tokenData = JSON.stringify(res.data.data);
            localStorage.setItem("Token", tokenData);
            SwalHelper.MiniAlert(res.data.Message, "success");
          } else {
            SwalHelper.MiniAlert(
              "Vui lòng đăng nhập tài khoản nhà tuyển dụng!",
              "error"
            );
          }
        } else {
          SwalHelper.MiniAlert(
            res.data.Message || "Đăng nhập không thành công!",
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
  };

  return (
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
          className=" w-full text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext"
          type="text"
          placeholder="candidate@example.com"
          value={email}
          onChange={_onChangeEmail}
        />
      </div>
      <div className="mt-4 content-center">
        <label className="text-sm font-medium text-gray-700 tracking-wide">
          Mật khẩu <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full content-center text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext"
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
            className="w-full content-center text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext"
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
      <div className="mt-4">
        <span className=" text-sm font-medium text-navy-700">
          Tôi chưa có tài khoản?
        </span>
        <Link
          to={EMPLOYER_PATHS.signup}
          className="ml-1 text-sm font-medium text-gray-800 hover:text-orangetext"
        >
          Đăng kí ngay!
        </Link>
      </div>
    </div>
  );
};
export default SigninEmployerPage;
