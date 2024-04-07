import { AiOutlineClose } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";

const ChangeInfoCandidate = (props: any) => {
  const handleClose = props.handleClose;

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

      <div className="overflow-auto scrollbar-custom h-max max-h-[75vh]">
        <div className="my-4 mx-4 text-gray-700 flex flex-col gap-2 lg:gap-4 text-sm">
          <div className="flex justify-between gap-3 lg:gap-4 content-center">
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">
                Họ&nbsp;<span className="text-red-500">*</span>
              </label>
              <input
                className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                type="text"
              />
            </div>
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">
                Tên <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                type="text"
              />
            </div>
          </div>
          <div className="flex justify-between gap-3 lg:gap-4 content-center">
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">
                Giới tính <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                type="text"
              />
            </div>
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">
                Ngày sinh <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                type="text"
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
              />
            </div>
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">
                Công việc
              </label>
              <input
                className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                type="text"
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
              />
            </div>
            <div className="content-center w-full">
              <label className="font-medium tracking-wide text-sm">
                Liên kết
              </label>
              <input
                className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                type="text"
              />
            </div>
          </div>
          <div className="content-center">
            <label className="font-medium tracking-wide text-sm">Địa chỉ</label>
            <input
              className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
              type="text"
            />
          </div>

          <div className="content-center">
            <label className="font-medium tracking-wide text-sm ">
              Mô tả bản thân&nbsp;
            </label>
            <textarea
              className="w-full content-center text-sm p-2 mt-1 border rounded focus:outline-none focus:border-orangetext h-24"
              // placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu, sở thích...)."
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 px-4 py-3 border-t  ">
        <button className="flex items-center gap-2 w-max h-max px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600/85 font-medium">
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
