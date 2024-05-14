import { LoadingContext } from "@/App";
import applicationsService from "@/services/applicationsService";
import { ModalConstants, PathConstants } from "@/utils/constants";
import { AuthHelper, DateHelper, SwalHelper } from "@/utils/helpers";
import { set } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { AiFillEye, AiOutlineClose } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdExit } from "react-icons/io";

const DetailStepSchedule = (props: any) => {
  const handleClose = props.handleClose;
  const id = props.stepId;
  const fetchData = props.fetchData;
  const context = useContext(LoadingContext);
  const setApplicationId = props.setApplicationId;
  const setFuncs = props.setFuncs;

  const [step, setStep] = useState<any>();
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<number>(0);
  const [color, setColor] = useState<string>("#3498DB");
  const [startDate, setStartDate] = useState<string>("");

  const [hour, setHour] = useState<number>(0);
  useEffect(() => {
    context.handleOpenLoading();
    applicationsService
      .detailStepSchedule(id)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setStep(res.data.Data);
          setName(res.data.Data?.name);
          setColor(res.data.Data?.color);
          setStartDate(res.data.Data?.startDate);
          setHour(
            DateHelper.calculateHours(
              res.data.Data?.startDate,
              res.data.Data?.endDate
            )
          );
          setNumber(res.data.Data?.stepNumber);
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
  }, [id]);

  const _onClickSave = () => {
    if (name === "" || color === "" || startDate === "" || hour === 0) {
      SwalHelper.MiniAlert("Vui lòng nhập đầy đủ thông tin!", "warning");
      return;
    }

    context.handleOpenLoading();
    applicationsService
      .updateStepSchedule(id, name, startDate, hour, color)
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
  const _onClickDelete = () => {
    SwalHelper.Confirm(
      "Xác nhận xóa lịch hẹn?",
      "question",
      () => {
        context.handleOpenLoading();
        applicationsService
          .deleteStepSchedule(id)
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
      },
      () => {}
    );
  };
  const currentStep = step?.job?.process?.steps?.find(
    (item: any) => item.number == step.stepNumber
  );

  const _onClickDetail = () => {
    setApplicationId(step?.application.id);
    setFuncs(ModalConstants.APPLICATION_KEYS.applycationDetail);
  };
  return (
    <>
      <div className="md:w-[50%] xl:w-[30%] w-screen bg-white relative lg:rounded">
        <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-orangetext lg:rounded-t">
          <h2 className="text-xl font-medium  line-clamp-1 my-auto">
            Chi tiết lịch hẹn
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
            <div className="text-sm font-semibold text-black bg-body2 pl-1 pr-1 pt-1.5 pb-1.5 rounded-sm shadow-sm w-full truncate flex justify-between gap-3">
              <p>
                Bước {currentStep?.number + 1}: {currentStep?.name}
              </p>
              {(PathConstants.CANDIDATE_PATHS.schedule ||
                PathConstants.EMPLOYER_PATHS.schedule) && (
                <button onClick={_onClickDetail}>
                  <AiFillEye className="text-gray-700 hover:text-orangetext text-xl" />
                </button>
              )}
            </div>
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">
                Tiêu đề:
              </label>
              <input
                className="w-full p-2 mt-1 border rounded focus:outline-none focus:border-orangetext text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                disabled={AuthHelper.isCandidate()}
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
                disabled={AuthHelper.isCandidate()}
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
                type="number"
                min={0}
                disabled={AuthHelper.isCandidate()}
              />
            </div>
            <div
              className={`content-center ${
                AuthHelper.isCandidate() && "flex gap-3"
              }`}
            >
              <label className="font-medium tracking-wide text-sm">
                Màu sắc:
              </label>

              {AuthHelper.isCandidate() ? (
                <div
                  className="w-20 h-6 rounded block "
                  style={{ backgroundColor: color }}
                ></div>
              ) : (
                <div className="flex justify-center text-sm">
                  <HexColorPicker
                    color={color}
                    onChange={(color) => setColor(color)}
                    className="w-[6rem] h-[6rem]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4 px-4 py-3 border-t  ">
          <div>
            {!AuthHelper.isCandidate() && (
              <button
                className="flex items-center gap-2 w-max h-max px-4 py-2 bg-red-500 text-white rounded hover:bg-red-500/90 font-[450]"
                onClick={_onClickDelete}
              >
                <FaRegTrashCan className="text-base" />
                <p>Xóa</p>
              </button>
            )}
          </div>
          <div className="flex gap-4 justify-end">
            {!AuthHelper.isCandidate() && (
              <button
                className="flex items-center gap-2 w-max h-max px-4 py-2 bg-bgBlue text-white rounded hover:bg-bgBlue/90 font-[450]"
                onClick={_onClickSave}
              >
                <FaRegSave className="text-base" />
                <p>Lưu</p>
              </button>
            )}
            <button
              className="flex items-center gap-2 w-max h-max px-4 py-2 bg-slate-300 text-white rounded hover:bg-slate-300/80 font-[450]"
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
export default DetailStepSchedule;
