import { AiOutlineClose } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { IoExitOutline } from "react-icons/io5";

const CreateJob = (props: any) => {
  const handleClose = props.handleClose;
  return (
    <div className="sm:w-[50%] w-screen  bg-white sm:rounded-xl relative max-h-[90%] overflow-auto">
      <div className="flex justify-between items-center p-4 lg:px-8 text-gray-800 border-borderColor border-b">
        <h2 className="text-2xl font-semibold text-black">Thêm công việc</h2>
        <button
          className="p-1.5 rounded text-lg font-bold text-gray-800 hover:bg-red-500 hover:text-white"
          onClick={handleClose}
        >
          <AiOutlineClose />
        </button>
      </div>

      <div className="p-4 lg:px-8"></div>
      <div className="flex justify-end items-center gap-5 p-4 lg:px-8 border-borderColor border-t">
        <button
          className="flex items-center gap-2.5 w-max h-max px-5 py-2 bg-gray-300 text-white rounded-md hover:bg-gray-300/85 font-base"
          onClick={handleClose}
        >
          <IoExitOutline className="text-xl" />
          <p>Đóng</p>
        </button>
        <button className="flex items-center gap-2.5 w-max h-max px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-500/85 font-base">
          <FiFilter className="text-base" />
          <p>Thêm</p>
        </button>
      </div>
    </div>
  );
};
export default CreateJob;
