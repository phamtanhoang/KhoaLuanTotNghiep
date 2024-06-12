import { LoadingContext } from "@/App";
import { jobsService } from "@/services";
import { SwalHelper } from "@/utils/helpers";
import { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";


const ChangeDealine = (props: any) => {
  const handleClose = props.handleClose;
  const id = props.id;

  const fetchData = props.fetchData;
  const context = useContext(LoadingContext);


  const [startDate, setStartDate] = useState<string>("");

  const _onClickSave = () => {
    if (startDate === "") {
      SwalHelper.MiniAlert("Vui lòng nhập thời hạn mới!", "warning");
      return;
    }
    context.handleOpenLoading();
    jobsService
      .updateDateline(id,startDate)
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
          <h2 className="text-xl font-medium  line-clamp-1 my-auto">Gia hạn</h2>
          <button
            className="p-1 rounded-md text-lg hover:text-orangetext hover:bg-white"
            onClick={handleClose}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="h-max max-h-[75vh] my-2 mx-1 flex">
          <div className="ml-1  text-gray-700 flex flex-col gap-2 w-full">
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">
                Thời hạn mới:
              </label>
              <input
                className="w-full p-2 mt-1 border rounded focus:outline-none focus:border-orangetext text-sm"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="datetime-local"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 px-4 py-3 border-t  ">
          <button
            className="flex items-center gap-2 w-max h-max px-4 py-2 bg-bgBlue text-white rounded hover:bg-bgBlue/90 font-[450]"
            onClick={_onClickSave}
          >
            <FaRegSave className="text-base" />
            <p>Lưu</p>
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
export default ChangeDealine;
