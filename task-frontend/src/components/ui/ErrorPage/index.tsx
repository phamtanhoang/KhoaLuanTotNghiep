const ErrorPage = () => {
  return (
    <>
      <div className="w-full bg-gradient-to-r from-purple-200 to-blue-200">
        <div className="md:w-4/5 lg:w-3/5 m-auto py-16 min-h-screen flex items-center justify-center">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
            <div className="border-t border-gray-200 text-center pt-8">
              <h1 className="text-8xl md:text-9xl font-bold text-purple-400">
                404
              </h1>
              <h1 className="text-4xl md:text-6xl font-medium py-8">
                Không tìm thấy trang!
              </h1>
              <p className="text-xl md:text-2xl pb-8 px-12 font-medium">
                Trang bạn đang tìm kiếm không tồn tại. Nó có thể có đã được di
                chuyển hoặc bị xóa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ErrorPage;
