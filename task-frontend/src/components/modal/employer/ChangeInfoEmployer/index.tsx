import { LoadingContext } from "@/App";
import employersService from "@/services/employersService";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import { ChangeEvent, useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";

const ChangeInfoEmployer = (props: any) => {
  const context = useContext(LoadingContext);
  const handleClose = props.handleClose;
  const fetchData = props.fetchData;
  const employer = props.data;
  const [name, setName] = useState<string>(employer?.name);
  const [phoneNumber, setPhoneNumber] = useState<string>(employer?.phoneNumber);
  const [businessCode, setBusinessCode] = useState<string>(
    employer?.businessCode
  );
  const [location, setLocation] = useState<string>(employer?.location);
  const [description, setDescription] = useState<string>(employer?.description);
  const _onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(e.target.value);
  };

  const _onChangeLocation = (e: ChangeEvent<HTMLInputElement>): void => {
    setLocation(e.target.value);
  };

  const _onChangeBusinessCode = (e: ChangeEvent<HTMLInputElement>): void => {
    setBusinessCode(e.target.value);
  };

  const _onChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>): void => {
    setPhoneNumber(e.target.value);
  };

  const _onChangeName = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const _onClickSave = () => {
    context.handleOpenLoading();
    employersService
      .updateProfile(name, description, location, businessCode, phoneNumber)
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

  return (
    <div className="md:w-[60%] xl:w-[50%] w-screen bg-white relative lg:rounded">
      <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-orangetext lg:rounded-t">
        <h2 className="text-xl font-medium  line-clamp-1 my-auto">
          Sửa thông tin
        </h2>
        <button
          className="p-1 rounded-md text-lg hover:text-orangetext hover:bg-white"
          onClick={handleClose}
        >
          <AiOutlineClose />
        </button>
      </div>

      <div className="overflow-auto scrollbar-custom h-max max-h-[75vh] my-4  mx-2">
        <div className="mx-2 text-gray-700 flex flex-col gap-2">
          <div className="flex flex-col lg:flex-row justify-between gap-2 lg:gap-4">
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">Email</label>
              <input
                className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                type="text"
                value={employer?.email}
                disabled
              />
            </div>
          </div>
          <div className="content-center">
            <label className="font-medium tracking-wide text-sm">
              Tên công ty
            </label>
            <input
              className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
              type="text"
              value={name}
              onChange={_onChangeName}
            />
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-2 lg:gap-4">
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">
                Số điện thoại
              </label>
              <input
                className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                type="text"
                value={phoneNumber}
                onChange={_onChangePhoneNumber}
              />
            </div>
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">
                Mã số kinh doanh
              </label>
              <input
                className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                type="text"
                value={businessCode}
                onChange={_onChangeBusinessCode}
              />
            </div>
          </div>
          <div className="content-center">
            <label className="font-medium tracking-wide text-sm">Địa chỉ</label>
            <input
              className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
              type="text"
              value={location}
              onChange={_onChangeLocation}
            />
          </div>
          <div className="content-center">
            <label className="font-medium tracking-wide text-sm">Mô tả</label>
            <textarea
              className="w-full  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext min-h-24"
              value={description}
              onChange={_onChangeDescription}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 px-4 py-3 border-t">
        <button
          className="flex items-center gap-2 w-max h-max px-4 py-2  text-white rounded-md bg-blue-600 hover:bg-blue-600/90 font-[450]"
          onClick={_onClickSave}
        >
          <FaRegSave className="text-base" />
          <p>Lưu</p>
        </button>

        <button
          className="flex items-center gap-2 w-max h-max px-4 py-2 bg-slate-300 text-white rounded-md hover:bg-slate-300/80 font-[450]"
          onClick={handleClose}
        >
          <IoMdExit className="text-lg" />
          <p>Đóng</p>
        </button>
      </div>
    </div>
  );
};
export default ChangeInfoEmployer;
