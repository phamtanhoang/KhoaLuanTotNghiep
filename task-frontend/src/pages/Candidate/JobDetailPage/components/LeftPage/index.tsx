import { GrFormNextLink } from "react-icons/gr";
import NONE_USER from "@/assets/images/non-user.jpg";
import { FaBuilding } from "react-icons/fa6";
import { CiClock2 } from "react-icons/ci";
import { RiVipCrown2Line } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import { BsCalendarCheck, BsCalendarX } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { IoMdHourglass } from "react-icons/io";
interface LeftPageCardProps {
  image?: string;
  name?: string;
  employer?: string;
  category?: string;
  experience?: string;
  salary?: string;
  fromDate?: string;
  toDate?: string;
  location?: string;
  description?: string;
  isVip?: boolean;
}

const LeftPage: React.FC<LeftPageCardProps> = ({
  image,
  name,
  employer,
  salary,
  experience,
  category,
  fromDate,
  toDate,
  location,
  description,
  isVip,
}) => {
  return (
    <>
      <div className="bg-white rounded-sm">
        <div className="w-full border-b-2 border-[#D9D9D9] px-5 lg:px-8 py-5 ">
          <div className="w-full flex gap-3 lg:gap-5 justify-between">
            <div className="flex gap-3 lg:gap-5">
              <img
                className="w-[80px] h-[80px] lg:w-[150px] lg:h-[150px] border-2  border-gray-200 shadow-sm rounded"
                src={image ? image : NONE_USER}
                alt={name}
              />
              <div>
                <div>
                  <h1 className=" text-lg lg:text-2xl uppercase font-bold text-gray-700 ">
                    {name}
                  </h1>

                  <div className="mt-1 relative">
                    <FaBuilding className="text-gray-600 absolute top-0 left-0 text-base lg:text-lg mt-1" />
                    <p className="cursor-pointer text-gray-600 text-base lg:text-lg font-medium hover:text-orangetext decoration-clone">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {employer}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <CiClock2 className=" text-lg lg:text-xl mt-2 lg:mt-1.5" />
                    <p className="text-gray-800  font-light mt-1 text-md lg:text-base">
                      {fromDate}
                    </p>
                  </div>
                </div>
                <div className="gap-3 mt-4 hidden lg:flex flex-wrap">
                  <button
                    className="w-max py-3 px-4 lg:px-12 text-white rounded flex  justify-center items-center min-w-max   h-10 outline-none relative overflow-hidden duration-300 ease-linear
                            after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-500 hover:after:opacity-100 hover:after:scale-[2.5] bg-orangetext border-transparent hover:border-orange-500"
                  >
                    <span className="flex relative z-[1] font-medium gap-2 ">
                      Ứng tuyển ngay
                    </span>
                  </button>
                  <button className="font-medium bg-transparent text-orangetext hover:text-orange-500 border-2 border-orangetext hover:border-orange-500 w-max py-3 px-4 lg:px-8 rounded flex  justify-center items-center min-w-max h-10">
                    Lưu tin
                  </button>
                </div>
              </div>
            </div>
            {isVip && (
              <div
                className="hidden lg:flex h-12 w-12 text-2xl p-2.5 rounded-full text-orangebackground bg-orangetext items-center justify-center"
                data-tooltip-id="tooltip"
                data-tooltip-content="Tin tuyển dụng VIP"
              >
                <RiVipCrown2Line />
              </div>
            )}
          </div>
          <div className="w-full gap-3 lg:gap-5 justify-between flex lg:hidden">
            <div className="gap-3 mt-4 flex lg:hidden flex-wrap">
              <button
                className="w-max py-3 px-4 lg:px-12 text-white rounded flex  justify-center items-center min-w-max   h-10 outline-none relative overflow-hidden duration-300 ease-linear
                            after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-500 hover:after:opacity-100 hover:after:scale-[2.5] bg-orangetext border-transparent hover:border-orange-500"
              >
                <span className="flex relative z-[1] font-medium gap-2 ">
                  Ứng tuyển ngay
                </span>
              </button>
              <button className="font-medium bg-transparent text-orangetext hover:text-orange-500 border-2 border-orangetext hover:border-orange-500 w-max py-3 px-4 lg:px-8 rounded flex  justify-center items-center min-w-max h-10">
                Lưu tin
              </button>
            </div>
            <div
              className="mt-auto flex lg:hidden h-10 w-10 text-2xl p-2.5 rounded-full text-orangebackground bg-orangetext items-center justify-center"
              data-tooltip-id="tooltip"
              data-tooltip-content="Tin tuyển dụng VIP"
            >
              <RiVipCrown2Line />
            </div>
          </div>
          <Tooltip id="tooltip" className="z-[100]" />
        </div>
        <div className="w-full">
          <div className="border-2 border-dotted border-orangetext bg-orange-50 rounded-md m-2 lg:m-5 p-4 lg:p-3 flex flex-col gap-3">
            <div className="flex flex-col lg:flex-row gap-3 w-full font-lato  lg:gap-5 text-gray-800 font-bold">
              <p className="lg:w-1/2 flex">
                <BsCalendarCheck className="text-lg mt-0.5 text-gray-600" />
                &nbsp;&nbsp;
                <span className="font-medium text-gray-600">
                  Ngày đăng: &nbsp;&nbsp;
                </span>
                {fromDate}
              </p>
              <p className="lg:w-1/2 flex">
                <BsCalendarX className="text-lg mt-0.5 text-gray-600" />
                &nbsp;&nbsp;
                <span className="font-medium text-gray-600">
                  Ngày kết thúc: &nbsp;&nbsp;
                </span>
                {toDate}
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 w-full font-lato  lg:gap-5 text-gray-800 font-bold">
              <p className="lg:w-1/2 flex">
                <BiCategoryAlt className="text-xl mt-0.5 text-gray-600" />
                &nbsp;&nbsp;
                <span className="font-medium text-gray-600">
                  Loại công việc: &nbsp;&nbsp;
                </span>
                {category}
              </p>
              <p className="lg:w-1/2 flex">
                <IoMdHourglass className="text-xl mt-0.5 text-gray-600" />
                &nbsp;&nbsp;
                <span className="font-medium text-gray-600">
                  Kinh nghiệm: &nbsp;&nbsp;
                </span>
                {experience}
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 w-full font-lato  lg:gap-5 text-gray-800 font-bold">
              <p className="lg:w-1/2 flex">
                <AiOutlineDollarCircle className="text-xl mt-0.5 text-gray-600" />
                &nbsp;&nbsp;
                <span className="font-medium text-gray-600">
                  Mức lương: &nbsp;&nbsp;
                </span>
                {salary}
              </p>
              <p className="lg:w-1/2 flex">
                <FiMapPin className="text-lg mt-0.5 text-gray-600" />
                &nbsp;&nbsp;
                <span className="font-medium text-gray-600">
                  Địa điểm: &nbsp;&nbsp;
                </span>
                {location}
              </p>
            </div>
          </div>
          <hr className="border  border-gray-300 border-dashed m-5 mt-3 lg:mt-5" />
          <div
            className="p-5 pt-0"
            dangerouslySetInnerHTML={{
              __html: description || "",
            }}
          />
        </div>
      </div>
    </>
  );
};
export default LeftPage;
