import { ModalController } from "@/App";
import { SEX_DATA } from "@/utils/constants/dataConstants";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Signup = (props: any) => {
  const context = useContext(ModalController);
  const handleClose = props.handleClose;
  const _onClickSignin = () => {
    context.setFuncs(MODAL_KEYS.signin);
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
          Đăng kí tài khoản ngay hôm nay.
        </p>
      </div>

      <div className="flex items-center justify-center mt-2 gap-3">
        <span className="h-px w-32 bg-gray-300"></span>
      </div>
      <div className="mt-8">
        <div className="content-center flex gap-5">
          <div className="w-1/2">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Họ
            </label>
            <input
              className=" w-full text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext"
              type="text"
              placeholder="Nguyễn Văn"
              value=""
            />
          </div>
          <div className="w-1/2">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Tên
            </label>
            <input
              className=" w-full text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext"
              type="text"
              placeholder="A"
              value=""
            />
          </div>
        </div>
        <div className="mt-4 content-center flex gap-5">
          <div className="w-1/2">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Ngày sinh
            </label>
            <input
              className=" w-full text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext"
              type="date"
              value=""
            />
          </div>
          <div className="w-1/2">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Giới tính
            </label>
            <select className=" w-full text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext">
              {SEX_DATA.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 content-center">
          <label className="text-sm font-bold text-gray-700 tracking-wide">
            Email
          </label>
          <input
            className=" w-full text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext"
            type=""
            placeholder="candidate@example.com"
            value=""
          />
        </div>
        <div className="mt-4 content-center flex gap-5">
          <div className="w-1/2">
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
          <div className="w-1/2">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Nhập lại mật khẩu
            </label>
            <input
              className="w-full content-center text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext"
              type="password"
              placeholder="**********"
              value=""
            />
          </div>
        </div>

        {/* <button id="submit-button" onClick={handleCaptchaSubmit}>
            Submit
          </button> */}

        <div>
          <button
            type="submit"
            className="mt-4 w-full flex justify-center bg-orangetext text-gray-100 p-3  rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-orange-500 shadow-lg cursor-pointer transition ease-in duration-300"
          >
            Đăng kí
          </button>
        </div>
        <p className="flex flex-col items-center justify-center mt-4 text-center text-md text-gray-500">
          <span>
            Tôi đã có tài khoản?
            <a
              onClick={_onClickSignin}
              className="ml-1 text-orangetext hover:text-orangetextno-underline hover:underline cursor-pointer transition ease-in duration-300"
            >
              Đăng nhập
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
