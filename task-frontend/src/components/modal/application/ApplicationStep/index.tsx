import { AiOutlineClose } from "react-icons/ai";
import { IoMdExit } from "react-icons/io";

const ApplicationStep = (props: any) => {
  const handleClose = props.handleClose;

  return (
    <>
      <div className="md:w-[50%] xl:w-[35%] w-screen bg-white relative lg:rounded">
        <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-orangetext lg:rounded-t">
          <h2 className="text-xl font-medium  line-clamp-1 my-auto">
            Lịch hẹn
          </h2>
          <button
            className="p-1 rounded-md text-lg hover:text-orangetext hover:bg-white"
            onClick={handleClose}
          >
            <AiOutlineClose />
          </button>
        </div>

        {/* <div className="h-max max-h-[75vh] my-2 mx-1 flex">
          <div className="ml-1  text-gray-700 flex flex-col gap-2 w-full">
            <p className="font-semibold text-black bg-body2 pl-1 pr-1 pt-1.5 pb-1.5 rounded-sm shadow-sm w-full truncate">
              Bước 1: Phỏng vấn online
            </p>
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">
                Mô tả:
              </label>
              <textarea
                className="w-full p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                //   value={firstName}
                //   onChange={_onChangeFirstName}
              />
            </div>
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">
                Thời gian:
              </label>
              <textarea
                className="w-full p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                // type="text"
                //   value={firstName}
                //   onChange={_onChangeFirstName}
              />
            </div>
          </div>
        </div> */}

        <div className="flex justify-end gap-4 px-4 py-3 border-t  ">
          <button
            className="flex items-center gap-2 w-max h-max px-4 py-2 bg-slate-300 text-white rounded-md hover:bg-slate-300/80 font-[450]"
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
export default ApplicationStep;
