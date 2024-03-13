import { EMPLOYER_PATHS } from "@/utils/constants/pathConstants";
import useCaptchaGenerator from "@/utils/hooks/useCaptchaGenerator";
import { useEffect } from "react";
import { IoReload } from "react-icons/io5";
import { Link } from "react-router-dom";

const SigninEmployerPage = () => {
  const { captchaText, canvasRef, reloadCaptcha } = useCaptchaGenerator();
  useEffect(() => {
    reloadCaptcha();
  }, []);

  return (
    <div className="w-full  flex-col items-center max-w-[420px] mx-auto max-sm:p-5">
      <h4 className="mb-2.5 text-4xl font-bold text-navy-700">
        Đăng nhập thông tin nhà tuyển dụng.
      </h4>
      <p className="mb-9 ml-1 text-base text-gray-600">
        Hãy nhập vào email và mật khẩu của bạn
      </p>

      <div className="relative">
        <label className="text-sm font-bold text-gray-700 tracking-wide">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          className=" w-full text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext"
          type="text"
          placeholder="candidate@example.com"
          value=""
        />
      </div>
      <div className="mt-4 content-center">
        <label className="text-sm font-bold text-gray-700 tracking-wide">
          Mật khẩu <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full content-center text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext"
          type="password"
          placeholder="**********"
          value=""
        />
      </div>
      <div className="mt-4 content-center">
        <label className="text-sm font-bold text-gray-700 tracking-wide">
          Captcha <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-5">
          <input
            className="w-full content-center text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext"
            type="text"
            placeholder="Nhập mã captcha"
            value=""
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
      <button className="linear mt-2 w-full rounded-xl py-[12px] text-base font-medium text-white transition duration-200 bg-orangetext hover:bg-orange-500">
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
