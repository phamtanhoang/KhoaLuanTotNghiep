import { ModalController } from "@/App";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import useCaptchaGenerator from "@/utils/hooks/useCaptchaGenerator";
import { useContext, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoReload } from "react-icons/io5";
const Signin = (props: any) => {
  const context = useContext(ModalController);
  const handleClose = props.handleClose;

  const { captchaText, canvasRef, reloadCaptcha } = useCaptchaGenerator();
  useEffect(() => {
    reloadCaptcha();
  }, []);
  const _onClickSignup = () => {
    context.setFuncs(MODAL_KEYS.signup);
  };
  return (
    <div className="sm:w-[30rem] w-screen p-8 bg-white sm:rounded-xl relative max-h-[90%] overflow-auto">
      <button
        className="p-2 rounded-full absolute top-2 right-2 text-xl text-gray-800 hover:text-white hover:bg-orangetext"
        onClick={handleClose}
      >
        <AiOutlineClose />
      </button>
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold text-gray-800 uppercase">
          Joobs xin chào!
        </h2>
        <p className="mt-2 text-base text-gray-600">
          Hãy đăng nhập tài khoản của bạn
        </p>
      </div>

      <div className="flex items-center justify-center mt-2 gap-3">
        <span className="h-px w-32 bg-gray-300"></span>
      </div>
      <div className="mt-8">
        <div className="relative">
          <label className="text-sm font-bold text-gray-700 tracking-wide">
            Email
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
            Mật khẩu
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
            Captcha
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

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-orangetext hover:text-orange-500"
            >
              Quên mật khẩu!
            </a>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="mt-4 w-full flex justify-center bg-orangetext text-gray-100 p-3  rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-orange-500 shadow-lg cursor-pointer transition ease-in duration-300"
          >
            Đăng nhập
          </button>
        </div>
        <p className="flex flex-col items-center justify-center mt-4 text-center text-md text-gray-500">
          <span>
            Tôi chưa có tài khoản?
            <a
              onClick={_onClickSignup}
              className="ml-1 text-orangetext hover:text-orangetextno-underline hover:underline cursor-pointer transition ease-in duration-300"
            >
              Đăng kí
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
