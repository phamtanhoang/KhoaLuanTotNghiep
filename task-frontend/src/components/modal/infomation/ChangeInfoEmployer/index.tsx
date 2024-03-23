import { AiOutlineClose } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";

const ChangeInfoEmployer = (props: any) => {
  const handleClose = props.handleClose;
  return (
    <div className="lg:w-[50%] w-screen p-8 bg-white sm:rounded-xl relative max-h-[90%] overflow-auto">
      <button
        className="p-2 rounded-full absolute top-2 right-2 text-xl text-gray-800 hover:text-white hover:bg-gray-300"
        onClick={handleClose}
      >
        <AiOutlineClose />
      </button>
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold text-gray-800 uppercase">
          Sửa Thông tin nhà tuyển dụng
        </h2>
        <p className="mt-2 text-base text-gray-600">
          Hãy diền đầy đủ thông tin nhà tuyển dụng
        </p>
      </div>

      <div className="flex items-center justify-center mt-2 gap-3">
        <span className="h-px w-32 bg-gray-300"></span>
      </div>
      <div className="mt-6">
        <div className="mt-4 content-center">
          <label className="text-sm font-bold text-gray-700 tracking-wide">
            Tên doanh nghiệp <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full content-center text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext"
            type="text"
            placeholder="Nhập tên doanh nghiệp..."
            value=""
          />
        </div>
        <div className="mt-4 content-center lg:flex gap-5">
          <div className="w-1/2">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Mã số kinh doanh <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full content-center text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext"
              type="text"
              placeholder="Nhập MSKD doanh nghiệp..."
              value=""
            />
          </div>
          <div className="w-1/2">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full content-center text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext"
              type="password"
              placeholder="Nhập số điện thoại doanh nghiệp..."
              value=""
            />
          </div>
        </div>
        <div className="mt-4 content-center lg:flex gap-5">
          <div className="w-1/2">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Địa chỉ doanh nghiệp (theo ĐKKD){" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full content-center text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext"
              type="text"
              placeholder="Nhập địa chỉ theo giấy tờ đăng kí..."
              value=""
            />
          </div>
          <div className="w-1/2">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Quy mô doanh nghiệp
            </label>
            <input
              className="w-full content-center text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext"
              type="password"
              placeholder="Nhập quy mô doanh nghiệp..."
              value=""
            />
          </div>
        </div>
        <div className="mt-4 content-center">
          <label className="text-sm font-bold text-gray-700 tracking-wide">
            Mô tả ngắn gọn về doanh nghiệp{" "}
            <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full content-center text-base p-2 mt-2 border rounded-lg border-gray-300 focus:outline-none focus:border-orangetext h-24"
            placeholder="Nhập mô tả ngắn gọn về doanh nghiệp..."
            value=""
          />
        </div>
        <div className="flex justify-end items-center gap-5 text-lg font-medium mt-8">
          <button
            className="flex items-center gap-2.5 w-max h-max px-5 py-2 bg-gray-300 text-white rounded-md hover:bg-gray-300/85 font-base"
            onClick={handleClose}
          >
            <IoExitOutline className="text-xl" />
            <p>Đóng</p>
          </button>
          <button className="flex items-center gap-2.5 w-max h-max px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600/85 font-base">
            <FaRegSave className="text-lg" />
            <p>Lưu</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChangeInfoEmployer;
