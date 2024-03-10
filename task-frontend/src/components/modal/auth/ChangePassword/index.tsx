import { ModalController } from "@/App";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";

const ChangePassword = (props: any) => {
  const context = useContext(ModalController);
  const handleClose = props.handleClose;
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
          Joobs Cập Nhật!
        </h2>
        <p className="mt-2 text-base text-gray-600">
          Cập nhật mật khẩu để tăng cường bảo mật tài khoản.
        </p>
      </div>

      <div className="flex items-center justify-center mt-2 gap-3">
        <span className="h-px w-32 bg-gray-300"></span>
      </div>
      <div className="mt-8">
        <div className="mt-4 content-center">
          <label className="text-sm font-bold text-gray-700 tracking-wide">
            Mật khẩu cũ
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
            Mật khẩu mới
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
            Nhập lại mật khẩu mới
          </label>
          <input
            className="w-full content-center text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext"
            type="password"
            placeholder="**********"
            value=""
          />
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
      </div>
    </div>
  );
};
export default ChangePassword;
