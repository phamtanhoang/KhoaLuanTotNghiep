import { GrFormNextLink } from "react-icons/gr";
import NONE_USER from "@/assets/images/non-user.jpg";
import { Link, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { AuthHelper, TextHelper } from "@/utils/helpers";
import { DataConstants, PathConstants } from "@/utils/constants";
import { IoWarning } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
interface JobDetailCardProps {
  id: string;
  image?: string;
  status?: string;
  name?: string;
  employerName?: string;
  employerId?: string;
  category?: string;
  experience?: string;
  salary?: string;
  fromDate?: string;
  toDate?: string;
  location?: string;
  tags?: any;
  description?: string;
  totalStep?: number;
  isLoading?: boolean;
  isTimeUp?: boolean;
  isApply?: boolean;
  isSave?: boolean;
  _onClickApplyJob: (id: string) => void;
  _onClickSaveJob: (id: string) => void;
  _onClickUnSaveJob: (id: string) => void;
  _onClickLogin: () => void;
}

const JobDetailCard: React.FC<JobDetailCardProps> = ({
  id,
  image,
  status,
  name,
  employerName,
  employerId,
  salary,
  experience,
  category,
  fromDate,
  toDate,
  location,
  tags,
  description,
  totalStep,
  _onClickApplyJob,
  _onClickSaveJob,
  _onClickUnSaveJob,
  _onClickLogin,
  isLoading,
  isTimeUp,
  isApply,
  isSave,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-orangetext h-1.5"></div>
      <div
        className="bg-white border-2 border-t-0 border-borderColor"
        style={{ height: "calc(100vh - 78px)" }}
      >
        {!isLoading ? (
          <>
            <div className="w-full h-max border-b-2 border-borderColor p-5 flex gap-5 justify-between ">
              <div className="w-full relative">
                <h1
                  className="text-lg uppercase font-bold text-gray-700 line-clamp-2"
                  data-tooltip-id="tooltip"
                  data-tooltip-content={name}
                >
                  {name}
                </h1>
                <div className="mt-1 relative line-clamp-1">
                  <Link
                    to={`${PathConstants.CANDIDATE_PATHS.employerDetails}/${employerId}`}
                    className="text-gray-600 text-base font-medium hover:text-gray-800 decoration-clone underline mb-1"
                    data-tooltip-id="tooltip"
                    data-tooltip-content={employerName}
                  >
                    {employerName}
                  </Link>
                </div>
                <div className="flex gap-3 w-full absolute bottom-0">
                  {!AuthHelper.isCandidate() ? (
                    <div
                      className="flex gap-2 bg-yellow-100 rounded px-4 py-2 text-sm text-yellow-700 w-full"
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
                  ) : status == DataConstants.STATUS_DATA.PAUSED ? (
                    <div
                      className="flex gap-2 bg-red-100 rounded px-4 py-2 text-sm text-red-700 w-full"
                      role="alert"
                    >
                      <IoWarning className="text-xl" />
                      <div className="font-medium">
                        Công việc đã ngưng tuyển dụng!
                      </div>
                    </div>
                  ) : isTimeUp ? (
                    <div
                      className="flex gap-2 bg-red-100 rounded px-4 py-2 text-sm text-red-700 w-full"
                      role="alert"
                    >
                      <IoWarning className="text-xl" />
                      <div className="font-medium">Công việc đã hết hạn!</div>
                    </div>
                  ) : isApply ? (
                    <div
                      className="flex gap-2 bg-blue-100 rounded px-4 py-2 text-sm text-blue-700 w-full"
                      role="alert"
                    >
                      <FaInfoCircle className="text-xl" />
                      <div className="font-medium">
                        Bạn đã ứng tuyển công việc này!
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        className="w-full lg:w-[65%] py-[6px] px-4  text-white rounded flex justify-center items-center min-w-max outline-none relative overflow-hidden duration-300 ease-linear
                              after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-500 hover:after:opacity-100 hover:after:scale-[2.5] bg-orangetext border-transparent hover:border-orange-500"
                        onClick={() => _onClickApplyJob(id)}
                      >
                        <span className="flex relative z-[1] font-medium gap-2 ">
                          Ứng tuyển ngay
                        </span>
                      </button>
                      {isSave ? (
                        <button
                          className="font-medium bg-transparent text-orangetext hover:text-orange-500 border-2 border-orangetext hover:border-orange-500 w-full lg:w-[35%] py-[6px] px-4 rounded flex  justify-center items-center min-w-max"
                          onClick={() => _onClickUnSaveJob(id)}
                        >
                          Bỏ lưu
                        </button>
                      ) : (
                        <button
                          className="font-medium bg-transparent text-orangetext hover:text-orange-500 border-2 border-orangetext hover:border-orange-500 w-full lg:w-[35%] py-[6px] px-4 rounded flex  justify-center items-center min-w-max"
                          onClick={() => _onClickSaveJob(id)}
                        >
                          Lưu tin
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="w-[100px]">
                <img
                  className=" border-2  border-gray-200 shadow-sm rounded"
                  src={image ? image : NONE_USER}
                  alt={name}
                />
                <div className="relative w-max text-center overflow-hidden flex items-center mt-2">
                  <p
                    className="pb-1 font-lato font-normal flex gap-2 text-gray-700 hover:text-orangetext transition-all duration-300 cursor-pointer relative before:absolute before:w-full before:h-0.5 before:bg-orangetext before:-left-36 before:bottom-0 before:opacity-0 hover:before:left-0 hover:before:opacity-100 hover:before:transition-all hover:before:duration-500"
                    onClick={() => {
                      navigate(`${PathConstants.CANDIDATE_PATHS.jobs}/${id}`);
                    }}
                  >
                    <span className="text-sm">Xem chi tiết</span>
                    <GrFormNextLink className="text-xl" />
                  </p>
                </div>
              </div>
            </div>

            <div
              className="scrollbar-custom overflow-y-scroll text-sm flex flex-col gap-3"
              style={{ height: "calc(100vh - 260px)", width: "calc(100%-8px)" }}
            >
              <div className="mx-5 flex flex-col gap-2 mt-3">
                <div className="flex w-full font-lato gap-5 text-gray-800 font-semibold">
                  <p className="w-1/2">
                    <span className="font-normal text-gray-600">
                      Ngày đăng tuyển:
                    </span>
                    &nbsp;&nbsp;
                    {fromDate}
                  </p>
                  <p className="w-1/2">
                    <span className="font-normal text-gray-600">
                      Ngày kết thúc:
                    </span>
                    &nbsp;&nbsp;
                    {toDate}
                  </p>
                </div>
                <div className="flex w-full font-lato gap-5 text-gray-800 font-semibold">
                  <p className="w-1/2">
                    <span className="font-normal text-gray-600">
                      Ngành nghề:
                    </span>
                    &nbsp;&nbsp;
                    {category}
                  </p>
                  <p className="w-1/2">
                    <span className="font-normal text-gray-600">
                      Kinh nghiệm:
                    </span>
                    &nbsp;&nbsp;
                    {experience}
                  </p>
                </div>
                <div className="flex w-full font-lato gap-5 text-gray-800 font-semibold">
                  <p className="w-1/2">
                    <span className="font-normal text-gray-600">
                      Mức lương:
                    </span>
                    &nbsp;&nbsp;
                    {salary}
                  </p>
                  <p className="w-1/2">
                    <span className="font-normal text-gray-600">
                      Số bước ứng tuyển:&nbsp;&nbsp;
                    </span>
                    {totalStep} bước
                  </p>
                </div>
                <div className="flex w-full font-lato gap-5 text-gray-800 font-semibold">
                  <p className="w-full">
                    <span className="font-normal text-gray-600">Địa điểm:</span>
                    &nbsp;&nbsp;
                    {location}
                  </p>
                </div>
                <div className="flex w-full font-lato text-gray-800 font-semibold gap-1.5 mt-1">
                  {tags &&
                    tags.map((tag: any) => (
                      <div
                        className="inline-block relative py-1 text-xs"
                        key={tag.id}
                      >
                        <div
                          className="absolute inset-0 flex"
                          style={{ color: tag.color }}
                        >
                          <svg height="100%" viewBox="0 0 50 100">
                            <path
                              d="M49.9,0a17.1,17.1,0,0,0-12,5L5,37.9A17,17,0,0,0,5,62L37.9,94.9a17.1,17.1,0,0,0,12,5ZM25.4,59.4a9.5,9.5,0,1,1,9.5-9.5A9.5,9.5,0,0,1,25.4,59.4Z"
                              fill="currentColor"
                            />
                          </svg>
                          <div
                            className="flex-grow h-full -ml-px  rounded-md rounded-l-none"
                            style={{ backgroundColor: tag.color }}
                          ></div>
                        </div>
                        <span className="relative text-white uppercase font-semibold">
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          {tag.name}
                          <span>&nbsp;&nbsp;&nbsp;</span>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
              <div className="mx-5 border-b-2 border-borderColor border-dashed"></div>
              <div className="mx-5 flex flex-col gap-3">
                <label className="text-base font-semibold uppercase">
                  Thông tin chi tiết{" "}
                </label>
                <div className="text-sm">
                  {parse(description || "", TextHelper.OptionParses)}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div
            className="flex flex-col items-center justify-center h-max"
            style={{ height: "calc(100vh - 260px)" }}
          >
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-white"></div>
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 animate-spin border-orangetext mt-4"></div>
          </div>
        )}
      </div>
    </>
  );
};
export default JobDetailCard;
