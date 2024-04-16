import { LoadingContext } from "@/App";
import { authsService } from "@/services";
import { CLEAR_CURRENT_EMPLOYER } from "@/store/reducers/employerReducer";
import { DataConstants } from "@/utils/constants/dataConstants";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import { AuthHelper } from "@/utils/helpers/authHelper";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import useCaptchaGenerator from "@/utils/hooks/useCaptchaGenerator";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoReload } from "react-icons/io5";
import { useDispatch } from "react-redux";
const Signin = (props: any) => {
  const handleClose = props.handleClose;
  const setFuncs = props.setFuncs;
  const context = useContext(LoadingContext);
  const dispatch = useDispatch();

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

  const _onClickSignup = () => {
    setFuncs(MODAL_KEYS.signup);
  };
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
      .signin(email, password, DataConstants.ROLE_DATA.CANDIDATE)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(CLEAR_CURRENT_EMPLOYER());
          AuthHelper.setAuthenticaton(res.data.Data.tokens, res.data.Data.user);
          SwalHelper.MiniAlert(res.data.Message, "success", 1500);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
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
  return (
    <div className="sm:w-[30rem] w-screen p-8 bg-white sm:rounded-xl relative h-max max-h-[90%] overflow-auto scrollbar-custom">
      <button
        className="p-2 rounded-full absolute top-2 right-2 text-xl text-gray-800 hover:text-white hover:bg-orangetext"
        onClick={handleClose}
      >
        <AiOutlineClose />
      </button>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 uppercase">
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
          <label className="text-sm font-semibold text-gray-700 tracking-wide">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            className=" w-full text-base py-2  border-b  border-borderColor focus:outline-none focus:border-orangetext"
            type="text"
            placeholder="candidate@example.com"
            value={email}
            onChange={_onChangeEmail}
          />
        </div>
        <div className="mt-4 content-center">
          <label className="text-sm font-semibold text-gray-700 tracking-wide">
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
          <label className="text-sm font-semibold text-gray-700 tracking-wide">
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
            onClick={_onClickSubmit}
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
