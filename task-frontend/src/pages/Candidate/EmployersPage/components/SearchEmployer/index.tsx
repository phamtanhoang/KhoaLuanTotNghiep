import BANNER_SEARCH from "@/assets/images/banner-search.png";
import { FaBuilding } from "react-icons/fa6";

const SearchEmployer = () => {
  const sectionStyle = {
    backgroundImage: `url(${BANNER_SEARCH})`,
  };
  return (
    <section
      style={sectionStyle}
      className="w-full bg-cover bg-center bg-no-repeat"
    >
      <div className="h-full py-12 w-full lg:w-[80%] mx-auto ">
        <div className="text-2xl lg:text-3xl text-gray-800 font-bold mb-5 text-center px-5 lg:px-0 tracking-wide leading-7">
          Khám Phá{" "}
          <span className="text-orangetext"> Những Nhà Tuyển Dụng</span> Phù Hợp
          Với Bạn.
        </div>
        <p className="text-center mx-auto font-normal text-base m-4 text-gray-600 px-5">
          Tìm hiểu về những nhà tuyển dụng phù hợp và cơ hội nghề nghiệp đang
          chờ đợi bạn ngay hôm nay.
        </p>
        <div className="p-2 lg:p-5 py-10 lg:py-5 grid grid-cols-1 gap-5 shadow-lg bg-orange-200 lg:rounded-lg w-full lg:w-[80%] mx-auto">
          <div className="bg-white p-4 lg:p-2 rounded lg:rounded-lg lg:flex w-full gap-5">
            <div className="flex gap-1 w-full bg-white text-left mb-3 lg:mb-0 py-2 lg:py-0">
              <FaBuilding className="text-orangetext h-full text-xl mt-0.5 lg:mt-0 lg:text-base lg:ml-3" />
              <input
                className="w-full bg-transparent ml-2 text-gray-800 focus:outline-none"
                type="text"
                placeholder="Nhập tên nhà tuyển dụng..."
              />
            </div>

            <button
              className="w-full lg:w-max py-3 px-4 lg:px-14 text-white rounded lg:rounded-full flex  justify-center items-center min-w-max   h-10 outline-none relative overflow-hidden duration-300 ease-linear
                            after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-500 hover:after:opacity-100 hover:after:scale-[2.5] bg-orangetext border-transparent hover:border-orange-500"
            >
              <span className="flex relative z-[1] font-medium">Tìm kiếm</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SearchEmployer;
