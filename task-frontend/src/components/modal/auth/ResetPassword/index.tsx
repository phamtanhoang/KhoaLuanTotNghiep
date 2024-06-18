import { LoadingContext } from "@/App";
import { authsService } from "@/services";
import { SwalHelper } from "@/utils/helpers";
import { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const ResetPassword = (props: any) => {
  const context = useContext(LoadingContext);
  const handleClose = props.handleClose;

  const [email, setEmail] = useState<string>("");
  const _onClickSubmit = () => {
    context.handleOpenLoading();
    authsService
      .forgotPassword(email)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          handleClose();
          SwalHelper.MiniAlert(res.data.Message, "success");
        } else {
          SwalHelper.MiniAlert(res.data.Message, "error");
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
    <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-md dark:bg-gray-950 dark:text-gray-200 relative">
      <button
        className="p-2 rounded-full absolute top-2 right-2 text-xl text-gray-800 hover:text-white hover:bg-orangetext"
        onClick={handleClose}
      >
        <AiOutlineClose />
      </button>
      <h1 className="text-3xl font-semibold text-center mb-4">
        Quên mật khẩu!
      </h1>
      <p className="text-gray-700 text-center mb-4">
        Vui lòng nhập email tài khoản!
      </p>
      <div className="content-center mb-4">
        <label className="text-base font-medium text-gray-700 tracking-wide">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          className=" mb-2 w-full content-center p-2 border border-borderColor focus:outline-none focus:border-orangetext text-base mt-1 rounded"
          type="text"
          placeholder="employer@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        className="w-full px-4 py-3 text-base font-medium text-white bg-orangetext rounded-md hover:bg-orangetext/85"
        onClick={_onClickSubmit}
      >
        Xác nhận
      </button>
    </div>
  );
};
export default ResetPassword;
