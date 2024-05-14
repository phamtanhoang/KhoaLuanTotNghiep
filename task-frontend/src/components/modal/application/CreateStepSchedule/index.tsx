import { LoadingContext } from "@/App";
import applicationsService from "@/services/applicationsService";
import { SwalHelper } from "@/utils/helpers";
import { useContext, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { useSelector } from "react-redux";

const CreateStepSchedule = (props: any) => {
  const handleClose = props.handleClose;
  const applicationId = props.id;
  const stepId = props.stepId;
  const fetchData = props.fetchData;
  const context = useContext(LoadingContext);

  const { steps } = useSelector((state: any) => state.listDataReducer);

  const step = steps.find((step: any) => step.id === stepId);

  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("#3498DB");
  const [startDate, setStartDate] = useState<string>("");
  const [hour, setHour] = useState<number>(0);

  const _onClickSave = () => {
    if (name === "" || color === "" || startDate === "" || hour === 0) {
      SwalHelper.MiniAlert("Vui lòng nhập đầy đủ thông tin!", "warning");
      return;
    }
    context.handleOpenLoading();
    applicationsService
      .createStepSchedule(
        applicationId,
        name,
        startDate,
        hour,
        color,
        step?.number
      )
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          handleClose();
          fetchData();
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
    <>
      <div className="md:w-[50%] xl:w-[30%] w-screen bg-white relative lg:rounded">
        <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-orangetext lg:rounded-t">
          <h2 className="text-xl font-medium  line-clamp-1 my-auto">
            Tạo lịch hẹn
          </h2>
          <button
            className="p-1 rounded-md text-lg hover:text-orangetext hover:bg-white"
            onClick={handleClose}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="h-max max-h-[75vh] my-2 mx-1 flex">
          <div className="ml-1  text-gray-700 flex flex-col gap-2 w-full">
            <p className="text-sm font-semibold text-black bg-body2 pl-1 pr-1 pt-1.5 pb-1.5 rounded-sm shadow-sm w-full truncate">
              Bước {step?.number + 1}: {step?.name}
            </p>
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">
                Tiêu đề:
              </label>
              <input
                className="w-full p-2 mt-1 border rounded focus:outline-none focus:border-orangetext text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </div>
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">
                Ngày hẹn:
              </label>
              <input
                className="w-full p-2 mt-1 border rounded focus:outline-none focus:border-orangetext text-sm"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="datetime-local"
              />
            </div>
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">
                Thời gian (giờ):
              </label>
              <input
                className="w-full p-2 mt-1 border rounded focus:outline-none focus:border-orangetext text-sm"
                value={hour}
                onChange={(e) => setHour(parseFloat(e.target.value))}
                type="number" // type="number"
                min={0}
              />
            </div>
            <div className="content-center">
              <label className="font-medium tracking-wide text-sm">
                Màu sắc <span className="text-red-500">*</span>
              </label>
              <div className="flex justify-center text-sm">
                <HexColorPicker
                  color={color}
                  onChange={(color) => setColor(color)}
                  className="w-[6rem] h-[6rem]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 px-4 py-3 border-t  ">
          <button
            className="flex items-center gap-2 w-max h-max px-4 py-2 bg-bgBlue text-white rounded hover:bg-bgBlue/90 font-[450]"
            onClick={_onClickSave}
          >
            <FaRegSave className="text-base" />
            <p>Tạo</p>
          </button>
          <button
            className="flex items-center gap-2 w-max h-max px-4 py-2 bg-slate-300 text-white rounded hover:bg-slate-300/80 font-[450]"
            onClick={handleClose}
          >
            <IoMdExit className="text-lg" />
            <p>Đóng</p>
          </button>
        </div>
      </div>
    </>
  );
};
export default CreateStepSchedule;
