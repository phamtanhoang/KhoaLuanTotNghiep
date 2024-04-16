import { LoadingContext } from "@/App";
import humanResourcesService from "@/services/humanResourcesService";
import { DataConstants } from "@/utils/constants/dataConstants";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import ModalBase from "../..";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import { IoCameraSharp } from "react-icons/io5";
import NON_USER from "@/assets/images/non-user.jpg";
import { ImageHelper } from "@/utils/helpers/imageHelper";
const UpdateHumanResource = (props: any) => {
  const context = useContext(LoadingContext);
  const handleClose = props.handleClose;
  const id = props.id;

  const [openSub, setOpenSub] = useState(false);
  const [funcsSub, setFuncsSub] = useState<string>("");
  const handleOpenSub = () => setOpenSub(true);
  const handleCloseSub = () => setOpenSub(false);

  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [sex, setSex] = useState<string>(DataConstants.SEX_DATA[0].id);
  const [avatar, setAvatar] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [croppedImg, setCroppedImg] = useState<string | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [created, setCreated] = useState<Date | null>(null);
  const [updated, setUpdated] = useState<Date | null>(null);
  const [status, setStatus] = useState<string>("");

  const _onChangeFirstName = (e: ChangeEvent<HTMLInputElement>): void => {
    setFirstName(e.target.value);
  };

  const _onChangeLastName = (e: ChangeEvent<HTMLInputElement>): void => {
    setLastName(e.target.value);
  };

  const _onChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>): void => {
    setPhoneNumber(e.target.value);
  };

  const _onChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };
  const _onChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };
  const _onChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setConfirmPassword(e.target.value);
  };
  const _onChangeSex = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSex(e.target.value);
  };
  const _onChangeDateOfBirth = (e: ChangeEvent<HTMLInputElement>): void => {
    setDateOfBirth(e.target.value);
  };
  const _onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setCroppedImg(null);
    }

    handleOpenSub();
    setFuncsSub(MODAL_KEYS.chooseImage);
  };

  const _onChangeStatus = () => {
    setStatus(
      status === DataConstants.USER_STATUS_DATA.ACTIVE
        ? DataConstants.USER_STATUS_DATA.INACTIVE
        : DataConstants.USER_STATUS_DATA.ACTIVE
    );
  };

  const _onClickSave = () => {
    if (!firstName || !lastName || !email) {
      SwalHelper.MiniAlert("Vui lòng nhập đầy đủ thông tin!", "warning");
      return;
    }
    if (password !== confirmPassword) {
      SwalHelper.MiniAlert("Mật khẩu không khớp!", "warning");
      return;
    }

    context.handleOpenLoading();
    humanResourcesService
      .update(
        firstName,
        lastName,
        email,
        password,
        sex,
        phoneNumber,
        dateOfBirth,
        img
      )
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          SwalHelper.MiniAlert(res.data.Message, "success");
          fetchData();
          handleClose();
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

  const _onClickUploadFile = () => {
    document.getElementById("fileInput")?.click();
  };

  const fetchData = () => {
    context.handleOpenLoading();
    humanResourcesService
      .getbyId(id)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setFirstName(res?.data?.Data?.firstName);
          setLastName(res?.data?.Data?.lastName);
          setAvatar(res?.data?.Data?.avatar);
          setSex(res?.data?.Data?.sex);
          setDateOfBirth(res?.data?.Data?.dateOfBirth);
          setPhoneNumber(res?.data?.Data?.phoneNumber);
          setEmail(res?.data?.Data?.email);
          setCreated(res?.data?.Data?.created);
          setUpdated(res?.data?.Data?.updated);
          setStatus(res?.data?.Data?.status);
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

  useEffect(() => {
    fetchData();
  }, []);

  console.log("status, ", status);
  return (
    <>
      <ModalBase
        open={openSub}
        handleClose={handleCloseSub}
        funcs={funcsSub}
        image={image}
        setCroppedImg={setCroppedImg}
      />
      <div className="lg:w-[45%] w-screen bg-white relative rounded">
        <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-orangetext rounded-t">
          <h2 className="text-xl font-semibold  line-clamp-1 my-auto">
            Sửa cán bộ
          </h2>
          <button
            className="p-1 rounded-md text-lg hover:text-orangetext hover:bg-white"
            onClick={handleClose}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="overflow-auto scrollbar-custom h-max max-h-[75vh] my-2 mr-1">
          <div className="my-4 mx-4 text-gray-700 flex flex-col gap-2 lg:gap-4 text-sm">
            <div className="flex justify-between gap-3 lg:gap-4 content-center">
              <div className="content-center w-full">
                <div className="relative  w-max mx-auto">
                  <img
                    src={avatar ? avatar : NON_USER}
                    className="w-40 h-40 border-2 border-borderColor rounded-full"
                  />
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={_onChangeImage}
                  />
                  <button
                    className="absolute bottom-2 right-2 text-2xl p-2 rounded-full bg-body hover:bg-body/90 text-black/90 hover:text-black ring-2 ring-white"
                    onClick={_onClickUploadFile}
                  >
                    <IoCameraSharp />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-3 lg:gap-4 content-center mt-5">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Họ&nbsp;<span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  value={firstName}
                  onChange={_onChangeFirstName}
                />
              </div>
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Tên <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  value={lastName}
                  onChange={_onChangeLastName}
                />
              </div>
            </div>
            <div className="flex justify-between gap-3 lg:gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Giới tính
                </label>
                <select
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  onChange={_onChangeSex}
                  value={sex}
                >
                  {DataConstants.SEX_DATA.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Ngày sinh
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="date"
                  value={dateOfBirth?.split("T")[0]}
                  onChange={_onChangeDateOfBirth}
                />
              </div>
            </div>
            <div className="flex justify-between gap-3 lg:gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Số điện thoại
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  value={phoneNumber}
                  onChange={_onChangePhoneNumber}
                />
              </div>
            </div>

            <div className="lg:flex justify-between gap-3 lg:gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  value={email}
                  onChange={_onChangeEmail}
                />
              </div>
            </div>
            <div className="flex justify-between gap-3 lg:gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Mật khẩu&nbsp;
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  value={password}
                  onChange={_onChangePassword}
                />
              </div>
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Nhập lại mật khẩu
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  value={confirmPassword}
                  onChange={_onChangeConfirmPassword}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4 px-4 py-3 border-t">
          <div className="flex gap-2 my-auto bg-slate-100 px-2 py-1">
            <input
              type="checkbox"
              className="border-borderColor focus:ring-3 h-5 w-5 rounded mt-0.5 cursor-pointer"
              checked={status === DataConstants.USER_STATUS_DATA.ACTIVE}
              onChange={_onChangeStatus}
            />

            <label className="text-base font-bold text-gray-600 uppercase">
              Sử dụng hệ thống
            </label>
          </div>
          <div className="flex justify-end gap-4">
            <button
              className="flex items-center gap-2 w-max h-max px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600/85 font-medium"
              onClick={_onClickSave}
            >
              <FaRegSave className="text-lg" />
              <p>Lưu</p>
            </button>
            <button
              className="flex items-center gap-2 w-max h-max px-4 py-2 bg-slate-300 text-white rounded-md hover:bg-slate-300/90 font-medium"
              onClick={handleClose}
            >
              <IoMdExit className="text-lg" />
              <p>Đóng</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default UpdateHumanResource;
