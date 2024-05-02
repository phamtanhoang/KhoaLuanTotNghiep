import { LoadingContext } from "@/App";
import { humanResourcesService } from "@/services";
import { DataConstants } from "@/utils/constants";
import { DateHelper, SwalHelper } from "@/utils/helpers";
import { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";

const ChangeInfoHumanResource = (props: any) => {
  const context = useContext(LoadingContext);
  const handleClose = props.handleClose;
  const fetchData = props.fetchData;
  const hr = props.data;
  const [firstName, setFirstName] = useState<string>(hr?.firstName);
  const [lastName, setLastName] = useState<string>(hr?.lastName);
  const [phoneNumber, setPhoneNumber] = useState<string>(hr?.phoneNumber);
  const [dateOfBirth, setDateOfBirth] = useState<string>(
    hr?.dateOfBirth.split("T")[0]
  );
  const [sex, setSex] = useState<string>(hr?.sex);

  const _onClickSave = () => {
    context.handleOpenLoading();
    humanResourcesService
      .updateProfile(firstName, lastName, phoneNumber, dateOfBirth, sex)
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
              <label className="font-medium tracking-wide text-sm">Họ</label>
              <input
                className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">Tên</label>
              <input
                className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-2 lg:gap-4">
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">Email</label>
              <input
                className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                type="text"
                value={hr?.email}
                disabled
              />
            </div>
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">
                Số điện thoại
              </label>
              <input
                className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-2 lg:gap-4">
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">
                Giới tính
              </label>
              <select
                className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                onChange={(e) => setSex(e.target.value)}
                value={sex}
              >
                {DataConstants.SEX_DATA_DROPDOWN.map((item, index) => (
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
                className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
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
export default ChangeInfoHumanResource;
