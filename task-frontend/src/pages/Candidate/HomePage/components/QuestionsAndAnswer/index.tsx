import { FaQuestion } from "react-icons/fa6";

const QuestionsAndAnswer = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="w-11/12 mx-auto md:w-10/12">
        <h1 className="text-3xl text-center font-bold">Hỏi & Trả Lời</h1>
        <p className="text-base text-gray-500 text-center my-4">
          Tìm kiếm tất cả các vị trí công việc trống trên web. Nhận ước lượng
          lương cá nhân của bạn. Đọc đánh giá về hơn 30000+ công ty trên toàn
          thế giới.
        </p>
        <div className="mt-14 space-y-5">
          <div className="1st space-y-5 md:flex md:justify-between md:items-center md:space-y-0">
            <div className="lg:basis-1/2">
              <h1 className="text-xl font-medium flex">
                <span className="mt-0.5">
                  <FaQuestion className="h-6 w-6 p-1 border-2 border-orangetext text-orangetext rounded-full text-center mr-1 mb-2" />
                </span>
                <span className="text-orangetext pr-1">Joobs</span> - Nền tảng
                thông minh hoạt động như thế nào?
              </h1>
              <p className="text-base text-gray-400 ml-8 lg:pr-16 mt-1">
                Tìm hiểu về cách Joobs hoạt động và mang lại giải pháp thông
                minh cho việc tìm kiếm việc làm. Chúng tôi không chỉ làm điều
                đó, mà còn tạo ra trải nghiệm tìm việc linh hoạt và hiệu quả.
                Bởi vì chúng tôi hiểu rằng quá trình tìm kiếm việc làm cần phải
                đơn giản và đáp ứng đúng nhu cầu của bạn.
              </p>
            </div>
            <div className="lg:basis-1/2">
              <h1 className="text-xl font-medium flex">
                <span className="mt-0.5">
                  <FaQuestion className="h-6 w-6 p-1 border-2 border-orangetext text-orangetext rounded-full text-center mr-1 mb-2" />
                </span>
                Cách tạo hồ sơ ứng viên ấn tượng trên
                <span className="text-orangetext pl-1">Joobs?</span>
              </h1>
              <p className="text-base text-gray-400 ml-8 lg:pr-16 mt-1">
                Tận dụng các tính năng tối ưu hóa hồ sơ cá nhân để thu hút sự
                chú ý của nhà tuyển dụng và tăng cơ hội nhận được lời mời phỏng
                vấn.
              </p>
            </div>
          </div>
          <div className="2nd space-y-5 md:flex md:justify-between md:items-center md:space-y-0">
            <div className="lg:basis-1/2">
              <h1 className="text-xl font-medium flex">
                <span className="mt-0.5">
                  <FaQuestion className="h-6 w-6 p-1 border-2 border-orangetext text-orangetext rounded-full text-center mr-1 mb-2" />
                </span>
                Làm thế nào để cập nhật thông tin cá nhân trên
                <span className="text-orangetext pl-1">Joobs?</span>
              </h1>
              <p className="text-base text-gray-400 ml-8 lg:pr-16 mt-1">
                Hướng dẫn chi tiết về cách quản lý và cập nhật thông tin cá nhân
                của bạn để luôn giữ cho hồ sơ của bạn được cập nhật và chuyên
                nghiệp.
              </p>
            </div>
            <div className="lg:basis-1/2">
              <h1 className="text-xl font-medium flex">
                <span className="mt-0.5">
                  <FaQuestion className="h-6 w-6 p-1 border-2 border-orangetext text-orangetext rounded-full text-center mr-1 mb-2" />
                </span>
                <span className="text-orangetext pr-1">Joobs </span> có an toàn
                khi sử dụng với tài khoản của tôi không?
              </h1>
              <p className="text-base text-gray-400 ml-8 lg:pr-16 mt-1">
                Joobs cam kết bảo vệ thông tin cá nhân của bạn thông qua biện
                pháp an ninh tài khoản mạnh mẽ, quản lý dữ liệu cá nhân an toàn
                và kết nối được bảo vệ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default QuestionsAndAnswer;
