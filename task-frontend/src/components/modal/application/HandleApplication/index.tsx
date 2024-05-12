import { LoadingContext } from "@/App";
import applicationsService from "@/services/applicationsService";
import { SwalHelper } from "@/utils/helpers";
import { useContext, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";

const HandleApplication = (props: any) => {
  const handleClose = props.handleClose;
  const status = props.status;
  const _onClickUpDateStep = props._onClickUpDateStep;

  const [content, setContent] = useState<string>("");

  const _onClickSave = () => {
    _onClickUpDateStep(status, content);
    handleClose();
  };
  return (
    <>
      <div className="md:w-[50%] xl:w-[30%] w-screen bg-white relative lg:rounded">
        <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-orangetext lg:rounded-t">
          <h2 className="text-xl font-medium  line-clamp-1 my-auto">
            Đánh giá ứng viên
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
            <p className="font-semibold text-red-500 text-sm">
              Lưu ý: Thông tin đã gửi thì không được phép chỉnh sửa!
            </p>
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">
                Hành động:
              </label>
              <input
                className="w-full p-2 mt-1 border rounded focus:outline-none focus:border-orangetext text-sm"
                value={
                  status === "APPROVED"
                    ? "Duyệt"
                    : status === "REJECTED"
                    ? "Không duyệt"
                    : status === "PROCESSING"
                    ? "Chuyển bước"
                    : ""
                }
                disabled={true}
              />
            </div>
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">
                Đánh giá:
              </label>
              <textarea
                className="w-full p-2 mt-1 border rounded focus:outline-none focus:border-orangetext text-sm h-32"
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
            <p>Xác nhận</p>
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
export default HandleApplication;
