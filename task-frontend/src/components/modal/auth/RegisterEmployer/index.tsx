import { LoadingContext } from "@/App";
import { authsService } from "@/services";
import { SwalHelper } from "@/utils/helpers";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ModalBase from "../..";
import { ModalConstants } from "@/utils/constants";

const RegisterEmployer = (props: any) => {
  const [openSub, setOpenSub] = useState<boolean>(false);
  const [funcsSub, setFuncsSub] = useState<string>("");
  const handleOpenSub = () => setOpenSub(true);
  const handleCloseSub = () => setOpenSub(false);

  const handleClose = props.handleClose;
  const context = useContext(LoadingContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [businessCode, setBusinessCode] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const _onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const _onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const _onChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };
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
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !name ||
      !businessCode ||
      !phoneNumber ||
      !address ||
      !description
    ) {
      SwalHelper.MiniAlert("Vui lòng nhập đầy đủ thông tin!", "warning");
      return;
    }
    if (password !== confirmPassword) {
      SwalHelper.MiniAlert("Mật khẩu không khớp!", "warning");
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
          setFuncsSub(ModalConstants.AUTH_KEYS.verifyEmail);
          handleOpenSub();
        } else {
          SwalHelper.MiniAlert(
            res.data.Message || "Đăng kí không thành công!",
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
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        _onClickSubmit();
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);
  const _onRegisterSuccess = () => {
    handleClose();
  };

  return (
    <>
      <ModalBase
        id={email}
        open={openSub}
        handleClose={handleCloseSub}
        funcs={funcsSub}
        fetchData={_onRegisterSuccess}
      />
      <div className="lg:w-[50%] w-screen py-4 lg:py-6 bg-white sm:rounded-xl relative">
        <button
          className="p-2 rounded-full absolute top-2 right-2 text-xl text-gray-800 hover:text-white hover:bg-orangetext"
          onClick={handleClose}
        >
          <AiOutlineClose />
        </button>
        <div className="text-center  ">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 uppercase">
            Đăng kí nhà tuyển dụng
          </h2>
          <p className="mt-1 text-sm text-gray-600 mb-3">
            Hãy diền đầy đủ thông tin nhà tuyển dụng
          </p>
        </div>

        <div className="my-2 mx-1 overflow-auto scrollbar-custom h-max max-h-[70vh]">
          <div className="mx-3">
            <div className="mt-1 content-center">
              <label className="text-sm font-medium text-gray-700 tracking-wide">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full content-center p-2 border border-borderColor focus:outline-none focus:border-orangetext text-sm mt-1 rounded"
                type="text"
                placeholder="employer@example.com"
                value={email}
                onChange={_onChangeEmail}
              />
            </div>
            <div className="mt-1 content-center lg:flex gap-4">
              <div className="w-full">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Mật khẩu <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full content-center p-2 border border-borderColor focus:outline-none focus:border-orangetext text-sm mt-1 rounded"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={_onChangePassword}
                />
              </div>
              <div className="w-full">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Nhập lại mật khẩu <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full content-center p-2 border border-borderColor focus:outline-none focus:border-orangetext text-sm mt-1 rounded"
                  type="password"
                  placeholder="********"
                  value={confirmPassword}
                  onChange={_onChangeConfirmPassword}
                />
              </div>
            </div>
            <div className="mt-1 content-center">
              <label className="text-sm font-medium text-gray-700 tracking-wide">
                Tên công ty <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full content-center p-2 border border-borderColor focus:outline-none focus:border-orangetext text-sm mt-1 rounded"
                type="text"
                placeholder="Nhập tên công ty..."
                value={name}
                onChange={_onChangeName}
              />
            </div>
            <div className="mt-1 content-center lg:flex gap-4">
              <div className="w-full">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Mã số kinh doanh <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full content-center p-2 border border-borderColor focus:outline-none focus:border-orangetext text-sm mt-1 rounded"
                  type="text"
                  placeholder="Nhập MSKD công ty..."
                  value={businessCode}
                  onChange={_onChangeBusinessCode}
                />
              </div>
              <div className="w-full">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full content-center p-2 border border-borderColor focus:outline-none focus:border-orangetext text-sm mt-1 rounded"
                  type="text"
                  placeholder="Nhập số điện thoại công ty..."
                  value={phoneNumber}
                  onChange={_onChangePhoneNumber}
                />
              </div>
            </div>
            <div className="mt-1 content-center">
              <label className="text-sm font-medium text-gray-700 tracking-wide">
                Địa chỉ công ty (theo ĐKKD){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full content-center p-2 border border-borderColor focus:outline-none focus:border-orangetext text-sm mt-1 rounded"
                type="text"
                placeholder="Nhập địa chỉ theo giấy tờ đăng kí..."
                value={address}
                onChange={_onChangeAddress}
              />
            </div>
            <div className="mt-1 content-center">
              <label className="text-sm font-medium text-gray-700 tracking-wide">
                Mô tả ngắn gọn về công ty{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full p-2 mt-1 border rounded border-borderColor focus:outline-none focus:border-orangetext text-sm h-24"
                placeholder="Nhập mô tả ngắn gọn về công ty..."
                value={description}
                onChange={_onChangeDescription}
              />
            </div>
          </div>
        </div>
        <div className="px-4 lg:px-6 lg:-mb-2 ">
          <button
            type="submit"
            className="mt-4 w-full lg:w-1/2 mx-auto flex justify-center bg-orangetext text-gray-100 p-2.5  rounded tracking-wide
                              font-semibold  focus:outline-none focus:shadow-outline hover:bg-orange-500 shadow-lg cursor-pointer transition ease-in duration-300"
            onClick={_onClickSubmit}
          >
            Đăng kí ngay
          </button>
        </div>
      </div>
    </>
  );
};
export default RegisterEmployer;
