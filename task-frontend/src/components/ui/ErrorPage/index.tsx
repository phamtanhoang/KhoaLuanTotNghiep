import { useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.includes("/admin/");
  return (
    <>
      <div
        className={`w-full bg-gradient-to-r ${
          isAdminPath
            ? "from-bgBlue/40 to-bgBlue"
            : "from-orangetext/30 to-orangetext"
        } `}
      >
        <div className="w-full lg:w-3/5 m-auto py-16 min-h-screen flex items-center justify-center">
          <div className="bg-body2 shadow overflow-hidden sm:rounded-lg px-4 lg:px-16 py-8  text-center">
            <h1
              className={`text-8xl lg:text-9xl font-bold ${
                isAdminPath ? "text-bgBlue" : "text-orangetext"
              }`}
            >
              404
            </h1>
            <h1 className="text-3xl lg:text-5xl font-bold py-4 lg:py-8 text-gray-700">
              Không tìm thấy trang!
            </h1>
            <p className="text-lg lg:text-xl pb-4 lg:pb-8 font-medium text-gray-600">
              Trang bạn đang tìm kiếm không tồn tại. Nó có thể có đã được di
              chuyển hoặc bị xóa.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default ErrorPage;
