import BANNER_SEARCH from "@/assets/images/banner-search.png";
import { useState } from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
import { MdWork } from "react-icons/md";

const Search = () => {
  const sectionStyle = {
    backgroundImage: `url(${BANNER_SEARCH})`,
  };

  const [hideFilter, setHideFilter] = useState<boolean>(false);

  const _onClickHideFilter = () => {
    setHideFilter(!hideFilter);
  };
  return (
    <section
      style={sectionStyle}
      className={`w-full bg-cover bg-center bg-no-repeat`}
    >
      <div className="h-full py-12 w-full lg:w-[80%] mx-auto ">
        <div className="text-2xl lg:text-3xl text-gray-800 font-bold mb-5 text-center px-5 lg:px-0 tracking-wide leading-7">
          Khám Phá <span className="text-orangetext"> Cơ Hội Việc Làm</span>{" "}
          Trên Website Của Chúng Tôi.
        </div>
        <div className="  p-2 lg:p-5 py-10 lg:py-5 grid grid-cols-1 gap-5 shadow-lg bg-orange-200 lg:rounded-lg w-full">
          <div className="bg-white p-4 lg:p-2 rounded lg:rounded-lg lg:flex w-full gap-5">
            <div></div>
            <div className="flex gap-1 w-full lg:w-[60%] bg-white text-left mb-3 lg:mb-0 py-2 lg:py-0 lg:border-r-2 border-orange-300">
              <MdWork className="text-orangetext h-full text-2xl" />
              <input
                className="w-full bg-transparent ml-2 text-gray-800 focus:outline-none"
                type="text"
                placeholder="Nhập tên công việc..."
              />
            </div>
            <div className="flex gap-1 w-full lg:w-[40%] bg-white text-left mb-3 lg:mb-0 py-2 lg:py-0">
              <FaLocationCrosshairs className="text-orangetext h-full text-2xl" />
              <select className="bg-transparent ml-2 text-gray-800 focus:outline-none w-full">
                <option className="w-full" value="">
                  Afganistan
                </option>
              </select>
            </div>

            <button
              className="w-full lg:w-max py-3 px-4 lg:px-14 text-white rounded lg:rounded-full flex  justify-center items-center min-w-max   h-10 outline-none relative overflow-hidden duration-300 ease-linear
                            after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-500 hover:after:opacity-100 hover:after:scale-[2.5] bg-orangetext border-transparent hover:border-orange-500"
            >
              <span className="flex relative z-[1] font-medium">Tìm kiếm</span>
            </button>
          </div>
          <button
            className="w-full lg:w-max py-3 px-4 lg:px-14 text-white rounded flex  justify-center items-center min-w-max   h-10 outline-none relative overflow-hidden duration-300 ease-linear
                            after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-500 hover:after:opacity-100 hover:after:scale-[2.5] bg-orangetext border-transparent hover:border-orange-500"
            onClick={_onClickHideFilter}
          >
            <span className="flex relative z-[1] font-medium gap-2 ">
              <IoFilter className="self-center text-xl" />
              Lọc nâng cao
            </span>
          </button>

          {hideFilter && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 border border-white p-2 rounded ">
                <div className="flex rounded bg-white items-center p-2 ">
                  <svg
                    className="fill-current text-gray-800 mr-2 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      className="heroicon-ui"
                      d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter text here..."
                    className="bg-white max-w-full focus:outline-none text-gray-700"
                  />
                </div>
                <div className="flex rounded bg-white items-center p-2 ">
                  <svg
                    className="fill-current text-gray-800 mr-2 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      className="heroicon-ui"
                      d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM5.68 7.1A7.96 7.96 0 0 0 4.06 11H5a1 1 0 0 1 0 2h-.94a7.95 7.95 0 0 0 1.32 3.5A9.96 9.96 0 0 1 11 14.05V9a1 1 0 0 1 2 0v5.05a9.96 9.96 0 0 1 5.62 2.45 7.95 7.95 0 0 0 1.32-3.5H19a1 1 0 0 1 0-2h.94a7.96 7.96 0 0 0-1.62-3.9l-.66.66a1 1 0 1 1-1.42-1.42l.67-.66A7.96 7.96 0 0 0 13 4.06V5a1 1 0 0 1-2 0v-.94c-1.46.18-2.8.76-3.9 1.62l.66.66a1 1 0 0 1-1.42 1.42l-.66-.67zM6.71 18a7.97 7.97 0 0 0 10.58 0 7.97 7.97 0 0 0-10.58 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter text here..."
                    className="bg-white max-w-full focus:outline-none text-gray-700"
                  />
                </div>

                <div className="flex rounded bg-white items-center p-2 ">
                  <svg
                    className="fill-current text-gray-800 mr-2 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      className="heroicon-ui"
                      d="M14 5.62l-4 2v10.76l4-2V5.62zm2 0v10.76l4 2V7.62l-4-2zm-8 2l-4-2v10.76l4 2V7.62zm7 10.5L9.45 20.9a1 1 0 0 1-.9 0l-6-3A1 1 0 0 1 2 17V4a1 1 0 0 1 1.45-.9L9 5.89l5.55-2.77a1 1 0 0 1 .9 0l6 3A1 1 0 0 1 22 7v13a1 1 0 0 1-1.45.89L15 18.12z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter text here..."
                    className="bg-white max-w-full focus:outline-none text-gray-700"
                  />
                </div>
                <div className="flex rounded bg-white items-center p-2 ">
                  <svg
                    className="fill-current text-gray-800 mr-2 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      className="heroicon-ui"
                      d="M13.04 14.69l1.07-2.14a1 1 0 0 1 1.2-.5l6 2A1 1 0 0 1 22 15v5a2 2 0 0 1-2 2h-2A16 16 0 0 1 2 6V4c0-1.1.9-2 2-2h5a1 1 0 0 1 .95.68l2 6a1 1 0 0 1-.5 1.21L9.3 10.96a10.05 10.05 0 0 0 3.73 3.73zM8.28 4H4v2a14 14 0 0 0 14 14h2v-4.28l-4.5-1.5-1.12 2.26a1 1 0 0 1-1.3.46 12.04 12.04 0 0 1-6.02-6.01 1 1 0 0 1 .46-1.3l2.26-1.14L8.28 4zm7.43 5.7a1 1 0 1 1-1.42-1.4L18.6 4H16a1 1 0 0 1 0-2h5a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V5.41l-4.3 4.3z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter text here..."
                    className="bg-white max-w-full focus:outline-none text-gray-700"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
export default Search;
