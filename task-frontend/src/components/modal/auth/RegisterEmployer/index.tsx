import { LoadingContext } from "@/App";
import { authsService } from "@/services";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import { ChangeEvent, useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const RegisterEmployer = (props: any) => {
  const handleClose = props.handleClose;
  const email = props.email;
  const password = props.password;
  const context = useContext(LoadingContext);

  const [name, setName] = useState<string>("");
  const [businessCode, setBusinessCode] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const _onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const _onChangeBusinessCode = (e: ChangeEvent<HTMLInputElement>) => {
    setBusinessCode(e.target.value);
  };
  const _onChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };
  const _onChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  const _onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const _onClickSubmit = () => {
    if (!name || !businessCode || !phoneNumber || !address || !description) {
      SwalHelper.MiniAlert("Vui lòng nhập đầy đủ thông tin!", "error");
      return;
    }

    context.handleOpenLoading();
    authsService
      .signupEmployer(
        email,
        password,
        name,
        address,
        description,
        phoneNumber,
        businessCode
      )
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          handleClose();
          SwalHelper.MiniAlert(
            "Đăng kí thành công, vui lòng đăng nhập!",
            "success"
          );
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
    <div className="lg:w-[50%] w-screen py-10  p-4 lg:p-8 bg-white sm:rounded-xl relative">
      <button
        className="p-2 rounded-full absolute top-2 right-2 text-xl text-gray-800 hover:text-white hover:bg-orangetext"
        onClick={handleClose}
      >
        <AiOutlineClose />
      </button>
      <div className="text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 uppercase">
          Thông tin nhà tuyển dụng
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Hãy diền đầy đủ thông tin nhà tuyển dụng
        </p>
      </div>

      <div className="flex items-center justify-center mt-2 gap-3">
        <span className="h-px w-48 bg-gray-300"></span>
      </div>
      <div className="mt-6 overflow-auto scrollbar-custom h-max max-h-[57vh]">
        <div className="mt-4 content-center">
          <label className="text-sm font-semibold text-gray-700 tracking-wide">
            Tên công ty <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full content-center text-base p-2 border border-gray-300 focus:outline-none focus:border-orangetext mt-1 rounded"
            type="text"
            placeholder="Nhập tên công ty..."
            value={name}
            onChange={_onChangeName}
          />
        </div>
        <div className="mt-4 content-center lg:flex gap-4">
          <div className="w-full">
            <label className="text-sm font-semibold text-gray-700 tracking-wide">
              Mã số kinh doanh <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full content-center text-base p-2 border border-gray-300 focus:outline-none focus:border-orangetext mt-1 rounded"
              type="text"
              placeholder="Nhập MSKD công ty..."
              value={businessCode}
              onChange={_onChangeBusinessCode}
            />
          </div>
          <div className="w-full">
            <label className="text-sm font-semibold text-gray-700 tracking-wide">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full content-center text-base p-2 border border-gray-300 focus:outline-none focus:border-orangetext mt-1 rounded"
              type="password"
              placeholder="Nhập số điện thoại công ty..."
              value={phoneNumber}
              onChange={_onChangePhoneNumber}
            />
          </div>
        </div>
        <div className="mt-4 content-center">
          <label className="text-sm font-semibold text-gray-700 tracking-wide">
            Địa chỉ công ty (theo ĐKKD) <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full content-center text-base p-2 border border-gray-300 focus:outline-none focus:border-orangetext mt-1 rounded"
            type="text"
            placeholder="Nhập địa chỉ theo giấy tờ đăng kí..."
            value={address}
            onChange={_onChangeAddress}
          />
        </div>
        <div className="mt-4 content-center">
          <label className="text-sm font-semibold text-gray-700 tracking-wide">
            Mô tả ngắn gọn về công ty <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full text-base p-2 mt-2 border rounded border-gray-300 focus:outline-none focus:border-orangetext h-24"
            placeholder="Nhập mô tả ngắn gọn về công ty..."
            value={description}
            onChange={_onChangeDescription}
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="mt-6 w-full lg:w-1/2 mx-auto flex justify-center bg-orangetext text-gray-100 p-3  rounded-xl tracking-wide
                              font-semibold  focus:outline-none focus:shadow-outline hover:bg-orange-500 shadow-lg cursor-pointer transition ease-in duration-300"
          onClick={_onClickSubmit}
        >
          Đăng kí ngay
        </button>
      </div>
    </div>
  );
};
export default RegisterEmployer;
