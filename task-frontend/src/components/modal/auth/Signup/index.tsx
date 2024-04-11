import { LoadingContext } from "@/App";
import { authsService } from "@/services";
import { DataConstants } from "@/utils/constants/dataConstants";

import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import { ChangeEvent, useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Signup = (props: any) => {
  const handleClose = props.handleClose;
  const setFuncs = props.setFuncs;
  const context = useContext(LoadingContext);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dob, setDOB] = useState<Date>();
  const [sex, setSex] = useState<string>(DataConstants.SEX_DATA[0].id);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const _onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const _onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const _onChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };
  const _onChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const _onChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const _onChangeDOB = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDOB = event.target.valueAsDate;
    setDOB(newDOB || undefined);
  };
  const _onChangeSex = (e: ChangeEvent<HTMLSelectElement>) => {
    setSex(e.target.value);
  };

  const _onClickSignin = () => {
    setFuncs(MODAL_KEYS.signin);
  };

  const _onClickSubmit = () => {
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !dob ||
      !setSex
    ) {
      SwalHelper.MiniAlert("Vui lòng nhập đầy đủ thông tin!", "error");
      return;
    }
    if (password !== confirmPassword) {
      SwalHelper.MiniAlert("Mật khẩu không khớp!", "error");
      return;
    }

    context.handleOpenLoading();
    authsService
      .signupCandiDate(firstName, lastName, dob, sex, email, password)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setFuncs(MODAL_KEYS.signin);
          SwalHelper.MiniAlert(
            "Đăng kí thành công, vui lòng đăng nhập lại!",
            "success"
          );
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
  return (
    <div className="sm:w-[33rem] w-screen p-8 bg-white sm:rounded-xl relative h-max max-h-[90%] overflow-auto scrollbar-custom">
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
          Đăng kí tài khoản ngay hôm nay.
        </p>
      </div>

      <div className="flex items-center justify-center mt-2 gap-3">
        <span className="h-px w-32 bg-gray-300"></span>
      </div>
      <div className="mt-8">
        <div className="content-center flex gap-5">
          <div className="w-1/2">
            <label className="text-sm font-semibold text-gray-700 tracking-wide">
              Họ <span className="text-red-500">*</span>
            </label>
            <input
              className=" w-full text-base py-2  border-b  border-borderColor focus:outline-none focus:border-orangetext"
              type="text"
              placeholder="Nguyễn Văn"
              value={firstName}
              onChange={_onChangeFirstName}
            />
          </div>
          <div className="w-1/2">
            <label className="text-sm font-semibold text-gray-700 tracking-wide">
              Tên <span className="text-red-500">*</span>
            </label>
            <input
              className=" w-full text-base py-2  border-b  border-borderColor focus:outline-none focus:border-orangetext"
              type="text"
              placeholder="A"
              value={lastName}
              onChange={_onChangeLastName}
            />
          </div>
        </div>
        <div className="mt-4 content-center flex gap-5">
          <div className="w-1/2">
            <label className="text-sm font-semibold text-gray-700 tracking-wide">
              Ngày sinh <span className="text-red-500">*</span>
            </label>
            <input
              className=" w-full text-base py-2  border-b  border-borderColor focus:outline-none focus:border-orangetext"
              type="date"
              value={dob ? dob.toISOString().split("T")[0] : ""}
              onChange={_onChangeDOB}
            />
          </div>
          <div className="w-1/2">
            <label className="text-sm font-semibold text-gray-700 tracking-wide">
              Giới tính <span className="text-red-500">*</span>
            </label>
            <select
              className=" w-full text-base py-2  border-b  border-borderColor focus:outline-none focus:border-orangetext"
              onChange={_onChangeSex}
              value={sex}
            >
              {DataConstants.SEX_DATA.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 content-center">
          <label className="text-sm font-semibold text-gray-700 tracking-wide">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            className=" w-full text-base py-2  border-b  border-borderColor focus:outline-none focus:border-orangetext"
            type=""
            placeholder="candidate@example.com"
            value={email}
            onChange={_onChangeEmail}
          />
        </div>
        <div className="mt-4 content-center flex gap-5">
          <div className="w-1/2">
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
          <div className="w-1/2">
            <label className="text-sm font-semibold text-gray-700 tracking-wide">
              Nhập lại mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full content-center text-base py-2  border-b  border-borderColor focus:outline-none focus:border-orangetext"
              type="password"
              placeholder="**********"
              value={confirmPassword}
              onChange={_onChangeConfirmPassword}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="mt-4 w-full flex justify-center bg-orangetext text-gray-100 p-3  rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-orange-500 shadow-lg cursor-pointer transition ease-in duration-300"
            onClick={_onClickSubmit}
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
