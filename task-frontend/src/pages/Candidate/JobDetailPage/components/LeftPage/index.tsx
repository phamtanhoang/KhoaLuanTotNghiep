import NONE_USER from "@/assets/images/non-user.jpg";
import { FaBuilding } from "react-icons/fa6";
import { BsCalendarCheck, BsCalendarX } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { IoMdHourglass } from "react-icons/io";
import { TbVip } from "react-icons/tb";
import { TextHelper } from "@/utils/helpers/textHelper";
import parse from "html-react-parser";
import { IoWarning } from "react-icons/io5";
import { AuthHelper } from "@/utils/helpers";
import { FaInfoCircle } from "react-icons/fa";
interface LeftPageCardProps {
  id: string;
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
  isTimeUp?: boolean;
  isApplied?: boolean;
  isSaved?: boolean;
  _onClickApplyJob: () => void;
  _onClickSaveJob: () => void;
  _onClickUnSaveJob: () => void;
  _onClickLogin: () => void;
}

const LeftPage: React.FC<LeftPageCardProps> = ({
  id,
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
  isTimeUp,
  isApplied,
  isSaved,
  _onClickApplyJob,
  _onClickSaveJob,
  _onClickUnSaveJob,
  _onClickLogin,
}) => {
  return (
    <>
      <div className="bg-white rounded-sm">
        <div className="w-full border-b-2 border-borderColor p-2 lg:p-5 relative">
          {isVip && (
            <p
              className="text-2xl lg:py-0.5 px-1 lg:px-2 text-white bg-orangetext absolute top-1 lg:top-2 left-1 lg:left-2 rounded-[2px] opacity-90"
              data-tooltip-id="tooltip"
              data-tooltip-content="Tin tuyển dụng VIP"
            >
              <TbVip />
            </p>
          )}
          <div className="w-full flex gap-3 lg:gap-5 justify-between">
            <div className="flex gap-3 lg:gap-5">
              <img
                className="w-[80px] h-[80px] lg:w-[130px] lg:h-[130px] border-2  border-gray-200 shadow-sm rounded"
                src={image ? image : NONE_USER}
                alt={name}
              />
              <div className="w-full relative">
                <h1
                  className=" text-base lg:text-xl uppercase font-bold text-gray-700 lg:line-clamp-2"
                  data-tooltip-id="tooltip"
                  data-tooltip-content={name}
                >
                  {name}
                </h1>

                <div className="mt-1 relative lg:line-clamp-1">
                  <FaBuilding className="text-gray-600 absolute top-0 left-0 text-sm lg:text-base mt-1" />
                  <p
                    className="text-gray-600 text-sm lg:text-base font-medium decoration-clone"
                    data-tooltip-id="tooltip"
                    data-tooltip-content={employer}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{employer}
                  </p>
                </div>
                {!AuthHelper.isCandidate() ? (
                  <div
                    className="flex gap-2 bg-yellow-100 rounded px-4 py-2 text-sm text-yellow-700 w-full mt-2.5 max-lg:hidden"
                    role="alert"
                  >
                    <IoWarning className="text-xl" />
                    <div>
                      Vui lòng&nbsp;
                      <span
                        className="font-medium cursor-pointer"
                        onClick={_onClickLogin}
                      >
                        Đăng Nhập
                      </span>
                      &nbsp;để ứng tuyển!
                    </div>
                  </div>
                ) : isTimeUp ? (
                  <div
                    className="flex gap-2 bg-red-100 rounded px-4 py-2 text-sm text-red-700 w-full mt-2.5 max-lg:hidden"
                    role="alert"
                  >
                    <IoWarning className="text-xl" />
                    <div className="font-medium">Công việc đã hết hạn!</div>
                  </div>
                ) : isApplied ? (
                  <div
                    className="flex gap-2 bg-blue-100 rounded px-4 py-2 text-sm text-blue-700 w-full mt-2.5 max-lg:hidden"
                    role="alert"
                  >
                    <FaInfoCircle className="text-xl" />
                    <div className="font-medium">
                      Bạn đã ứng tuyển công việc này!
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3 w-full absolute bottom-0 max-lg:hidden">
                    <button
                      className="lg:w-[65%] py-[6px] px-4  text-white rounded flex justify-center items-center min-w-max outline-none relative overflow-hidden duration-300 ease-linear
                              after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-500 hover:after:opacity-100 hover:after:scale-[2.5] bg-orangetext border-transparent hover:border-orange-500"
                      onClick={() => _onClickApplyJob()}
                    >
                      <span className="flex relative z-[1] font-medium gap-2 ">
                        Ứng tuyển ngay
                      </span>
                    </button>
                    {!isSaved ? (
                      <button
                        className="font-medium bg-transparent text-orangetext hover:text-orange-500 border-2 border-orangetext hover:border-orange-500 w-full lg:w-[35%] py-[6px] px-4 rounded flex  justify-center items-center min-w-max"
                        onClick={() => _onClickUnSaveJob()}
                      >
                        Bỏ lưu
                      </button>
                    ) : (
                      <button
                        className="font-medium bg-transparent text-orangetext hover:text-orange-500 border-2 border-orangetext hover:border-orange-500 w-full lg:w-[35%] py-[6px] px-4 rounded flex  justify-center items-center min-w-max"
                        onClick={() => _onClickSaveJob()}
                      >
                        Lưu tin
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {!AuthHelper.isCandidate() ? (
            <div
              className="flex gap-2 bg-yellow-100 rounded px-4 py-2 text-sm text-yellow-700 w-full mt-2 lg:hidden"
              role="alert"
            >
              <IoWarning className="text-xl" />
              <div>
                Vui lòng&nbsp;
                <span
                  className="font-medium cursor-pointer"
                  onClick={_onClickLogin}
                >
                  Đăng Nhập
                </span>
                &nbsp;để ứng tuyển!
              </div>
            </div>
          ) : isTimeUp ? (
            <div
              className="flex gap-2 bg-red-100 rounded px-4 py-2 text-sm text-red-700 w-full mt-2 lg:hidden"
              role="alert"
            >
              <IoWarning className="text-xl" />
              <div className="font-medium">Công việc đã hết hạn!</div>
            </div>
          ) : isApplied ? (
            <div
              className="flex gap-2 bg-blue-100 rounded px-4 py-2 text-sm text-blue-700 w-full mt-2 lg:hidden"
              role="alert"
            >
              <FaInfoCircle className="text-xl" />
              <div className="font-medium">Bạn đã ứng tuyển công việc này!</div>
            </div>
          ) : (
            <div className="flex gap-3 w-full lg:hidden mt-3">
              <button
                className="w-[65%] py-[6px] px-4  text-white rounded flex justify-center items-center min-w-max outline-none relative overflow-hidden duration-300 ease-linear
                              after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-500 hover:after:opacity-100 hover:after:scale-[2.5] bg-orangetext border-transparent hover:border-orange-500"
                onClick={() => _onClickApplyJob()}
              >
                <span className="flex relative z-[1] font-medium gap-2 ">
                  Ứng tuyển ngay
                </span>
              </button>
              {isSaved ? (
                <button
                  className="font-medium bg-transparent text-orangetext hover:text-orange-500 border-2 border-orangetext hover:border-orange-500 w-[35%] py-[6px] px-4 rounded flex  justify-center items-center min-w-max"
                  onClick={() => _onClickUnSaveJob()}
                >
                  Bỏ lưu
                </button>
              ) : (
                <button
                  className="font-medium bg-transparent text-orangetext hover:text-orange-500 border-2 border-orangetext hover:border-orange-500 w-[35%] py-[6px] px-4 rounded flex  justify-center items-center min-w-max"
                  onClick={() => _onClickSaveJob()}
                >
                  Lưu tin
                </button>
              )}
            </div>
          )}
        </div>
        <div className="w-full">
          <div className="border-2 border-dotted border-orangetext/50 bg-orange-50/40 rounded-md m-2 lg:m-5 p-4 lg:p-3 flex flex-col gap-3">
            <div className="flex flex-col lg:flex-row gap-3 w-full font-lato  lg:gap-5 text-gray-800 font-medium">
              <p className="lg:w-1/2 flex">
                <BsCalendarCheck className="text-lg mt-0.5 text-gray-600" />
                &nbsp;&nbsp;
                <span className="font-normal text-gray-600">
                  Ngày đăng:&nbsp;&nbsp;
                </span>
                {fromDate}
              </p>
              <p className="lg:w-1/2 flex">
                <BsCalendarX className="text-lg mt-0.5 text-gray-600" />
                &nbsp;&nbsp;
                <span className="font-normal text-gray-600">
                  Ngày kết thúc:&nbsp;&nbsp;
                </span>
                {toDate}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-3 w-full font-lato  lg:gap-5 text-gray-800 font-medium">
              <p className="lg:w-1/2 flex">
                <AiOutlineDollarCircle className="text-xl mt-0.5 text-gray-600" />
                &nbsp;&nbsp;
                <span className="font-normal text-gray-600">
                  Mức lương: &nbsp;&nbsp;
                </span>
                {salary}
              </p>
              <p className="lg:w-1/2 flex">
                <IoMdHourglass className="text-xl mt-0.5 text-gray-600" />
                &nbsp;&nbsp;
                <span className="font-normal text-gray-600">
                  Kinh nghiệm:&nbsp;&nbsp;
                </span>
                {experience}
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 w-full font-lato  lg:gap-5 text-gray-800 font-medium">
              <p className="lg:w-full flex">
                <BiCategoryAlt className="text-xl mt-0.5 text-gray-600" />
                &nbsp;&nbsp;
                <span className="font-normal text-gray-600">
                  Ngành nghề:&nbsp;&nbsp;
                </span>
                {category}
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 w-full font-lato  lg:gap-5 text-gray-800 font-medium">
              <p className="w-full flex">
                <FiMapPin className="text-lg mt-0.5 text-gray-600" />
                &nbsp;&nbsp;
                <span className="font-normal text-gray-600">
                  Địa điểm:&nbsp;&nbsp;
                </span>
                {location}
              </p>
            </div>
          </div>

          <div className="m-5 flex flex-col gap-1 ">
            <label className="text-lg font-semibold uppercase border-l-4 border-orangetext pl-2">
              Thông tin chi tiết
            </label>
            <div className="mt-1 text-sm">
              {parse(description || "", TextHelper.OptionParses)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LeftPage;
