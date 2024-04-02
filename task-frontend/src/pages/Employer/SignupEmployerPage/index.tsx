import { ModalController } from "@/App";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import { EMPLOYER_PATHS } from "@/utils/constants/pathConstants";
import { useContext } from "react";
import { Link } from "react-router-dom";

const SignupEmployerPage = () => {
  const context = useContext(ModalController);

  const _onClickRegisterEmployer = () => {
    context.setFuncs(MODAL_KEYS.registerEmployer);
    context.handleOpen();
  };

  return (
    <div className="w-full  flex-col items-center max-w-[420px] mx-auto max-sm:p-5">
      <h4 className="mb-2.5 text-4xl font-bold text-navy-700">
        Đăng kí thông tin nhà tuyển dụng.
      </h4>
      <p className="mb-9 ml-1 text-base text-gray-600">
        Hãy điền đầy đủ thông tin nhà tuyển dụng
      </p>

      <div className="relative">
        <label className="text-sm font-bold text-gray-700 tracking-wide">
          Email công ty <span className="text-red-500">*</span>
        </label>
        <input
          className=" w-full text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext"
          type="text"
          placeholder="employer@example.com"
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
          Nhập lại mật khẩu <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full content-center text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext"
          type="password"
          placeholder="**********"
          value=""
        />
      </div>

      <button
        className="linear mt-6 w-full rounded-xl py-[12px] text-base font-medium text-white transition duration-200 bg-orangetext hover:bg-orange-500"
        onClick={_onClickRegisterEmployer}
      >
        Tiếp tục
      </button>
      <div className="mt-4">
        <span className=" text-sm font-medium text-navy-700">
          Tôi đã có tài khoản?
        </span>
        <Link
          to={EMPLOYER_PATHS.signin}
          className="ml-1 text-sm font-medium text-gray-800 hover:text-orangetext"
        >
          Đăng nhập ngay!
        </Link>
      </div>
    </div>
  );
};
export default SignupEmployerPage;
