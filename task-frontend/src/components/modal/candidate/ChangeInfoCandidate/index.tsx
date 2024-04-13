import { LoadingContext } from "@/App";
import candidatesService from "@/services/candidatesService";
import { DataConstants } from "@/utils/constants/dataConstants";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import { ChangeEvent, useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { useSelector } from "react-redux";

const ChangeInfoCandidate = (props: any) => {
  const context = useContext(LoadingContext);
  const { currentCandidate } = useSelector(
    (state: any) => state.candidateReducer
  );
  const handleClose = props.handleClose;
  const fetchData = props.fetchData;
  const email = currentCandidate?.email;
  const [firstName, setFirstName] = useState<string>(
    currentCandidate?.firstName
  );
  const [lastName, setLastName] = useState<string>(currentCandidate?.lastName);
  const [address, setAddress] = useState<string>(currentCandidate?.address);
  const [phoneNumber, setPhoneNumber] = useState<string>(
    currentCandidate?.phoneNumber
  );

  const [dateOfBirth, setDateOfBirth] = useState<string>(
    currentCandidate?.dateOfBirth.split("T")[0]
  );
  const [link, setLink] = useState<string>(currentCandidate?.link);
  const [job, setJob] = useState<string>(currentCandidate?.job);
  const [introduction, setIntroduction] = useState<string>(
    currentCandidate?.introduction
  );
  const [sex, setSex] = useState<string>(currentCandidate?.sex);

  const _onChangeIntroduction = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setIntroduction(e.target.value);
  };

  const _onChangeFirstName = (e: ChangeEvent<HTMLInputElement>): void => {
    setFirstName(e.target.value);
  };

  const _onChangeLastName = (e: ChangeEvent<HTMLInputElement>): void => {
    setLastName(e.target.value);
  };

  const _onChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>): void => {
    setPhoneNumber(e.target.value);
  };

  const _onChangeAddress = (e: ChangeEvent<HTMLInputElement>): void => {
    setAddress(e.target.value);
  };
  const _onChangeLink = (e: ChangeEvent<HTMLInputElement>): void => {
    setLink(e.target.value);
  };
  const _onChangeJob = (e: ChangeEvent<HTMLInputElement>): void => {
    setJob(e.target.value);
  };
  const _onChangeDateOfBirth = (e: ChangeEvent<HTMLInputElement>): void => {
    setDateOfBirth(e.target.value);
  };
  const _onChangeSex = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSex(e.target.value);
  };

  const _onClickSave = () => {
    context.handleOpenLoading();
    candidatesService
      .updateProfile(
        firstName,
        lastName,
        address,
        phoneNumber,
        dateOfBirth,
        link,
        job,
        introduction,
        sex
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

  return (
    <div className="lg:w-[45%] w-screen bg-white relative rounded">
      <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-orangetext rounded-t">
        <h2 className="text-xl font-semibold  line-clamp-1 my-auto">
          Chỉnh sửa thông tin
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
                Giới tính <span className="text-red-500">*</span>
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
                Ngày sinh <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                type="date"
                value={dateOfBirth}
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
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">
                Công việc
              </label>
              <input
                className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                type="text"
                value={job}
                onChange={_onChangeJob}
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
                disabled
                value={email}
              />
            </div>
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">
                Liên kết
              </label>
              <input
                className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                type="text"
                value={link}
                onChange={_onChangeLink}
              />
            </div>
          </div>
          <div className="content-center">
            <label className="font-medium tracking-wide text-sm">Địa chỉ</label>
            <input
              className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
              type="text"
              value={address}
              onChange={_onChangeAddress}
            />
          </div>

          <div className="content-center">
            <label className="font-medium tracking-wide text-sm ">
              Mô tả bản thân&nbsp;
            </label>
            <textarea
              className="w-full text-sm p-2 mt-1 border rounded focus:outline-none focus:border-orangetext h-24"
              placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu, sở thích...)."
              value={introduction}
              onChange={_onChangeIntroduction}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 px-4 py-3 border-t">
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
  );
};
export default ChangeInfoCandidate;
