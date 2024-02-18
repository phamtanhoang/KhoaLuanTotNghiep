import { AiOutlineClose } from "react-icons/ai";
import { IoMdExit } from "react-icons/io";

const DeleteJob = (props: any) => {
  const handleClose = props.handleClose;

  return (
    <form className="flex flex-col bg-white lg:w-[34rem] w-screen rounded-md">
      {/* header */}
      <div
        className="
        flex w-full bg-sky-500 rounded-t-md
        py-[12px] px-[16px] items-center font-semibold text-white
        text-lg justify-between

      "
      >
        <p>Xóa thư mục</p>
        <button
          className="hover:bg-slate-300 pl-2 pr-2 rounded-full"
          onClick={handleClose}
        >
          <AiOutlineClose />
        </button>
      </div>

      {/* content */}
      <div className="relative flex flex-col w-full h-[calc(100%-6rem)] overflow-auto p-4 text-sm styled-scrollbars space-y-4">
        {/* lines */}
        <div className="flex w-full h-max">
          <div className="flex flex-col w-full pr-0 h-max">
            <label className="mb-1">
              Xóa thư mục&nbsp;<span className="text-red-500">(*)</span>
            </label>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="flex w-full h-[3rem] footer rounded-b-md justify-end items-center pl-4 pr-4 text-sm space-x-4">
        <div className="flex w-max h-max space-x-3">
          <button
            className="
          flex items-center space-x-1 w-max h-max p-2 bg-slate-300 text-white rounded-md
          hover:bg-slate-200
        "
            onClick={handleClose}
          >
            <IoMdExit />
            <p>Đóng</p>
          </button>
        </div>
      </div>
    </form>
  );
};

export default DeleteJob;
