import { AiOutlineClose } from "react-icons/ai";

const RegisterEmployer = (props: any) => {
  const handleClose = props.handleClose;
  return (
    <div className="lg:w-[50%] w-screen p-8 bg-white sm:rounded-xl relative max-h-[90%] overflow-auto">
      <button
        className="p-2 rounded-full absolute top-2 right-2 text-xl text-gray-800 hover:text-white hover:bg-orangetext"
        onClick={handleClose}
      >
        <AiOutlineClose />
      </button>
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold text-gray-800 uppercase">
          Thông tin nhà tuyển dụng
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
            Tên công ty <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full content-center text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext"
            type="text"
            placeholder="Nhập tên công ty..."
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
              placeholder="Nhập MSKD công ty..."
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
              placeholder="Nhập số điện thoại công ty..."
              value=""
            />
          </div>
        </div>
        <div className="mt-4 content-center">
          <label className="text-sm font-bold text-gray-700 tracking-wide">
            Địa chỉ công ty (theo ĐKKD) <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full content-center text-base py-2  border-b  border-gray-300 focus:outline-none focus:border-orangetext"
            type="text"
            placeholder="Nhập địa chỉ theo giấy tờ đăng kí..."
            value=""
          />
        </div>
        <div className="mt-4 content-center">
          <label className="text-sm font-bold text-gray-700 tracking-wide">
            Mô tả ngắn gọn về công ty <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full content-center text-base p-2 mt-2 border rounded-lg border-gray-300 focus:outline-none focus:border-orangetext h-24"
            placeholder="Nhập mô tả ngắn gọn về công ty..."
            value=""
          />
        </div>
        <div>
          <button
            type="submit"
            className="mt-6 w-full lg:w-1/2 mx-auto flex justify-center bg-orangetext text-gray-100 p-3  rounded-full tracking-wide
                              font-semibold  focus:outline-none focus:shadow-outline hover:bg-orange-500 shadow-lg cursor-pointer transition ease-in duration-300"
          >
            Đăng kí ngay
          </button>
        </div>
      </div>
    </div>
  );
};
export default RegisterEmployer;