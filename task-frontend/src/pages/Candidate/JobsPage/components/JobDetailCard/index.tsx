import { GrFormNextLink } from "react-icons/gr";
import NONE_USER from "@/assets/images/non-user.jpg";
import ModalBase from "@/components/modal";
import { useState } from "react";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import { Link } from "react-router-dom";
interface JobDetailCardProps {
  image?: string;
  name?: string;
  employer?: string;
  category?: string;
  experience?: string;
  salary?: string;
  fromDate?: string;
  toDate?: string;
  location?: string;
  tags?: any;
  description?: string;
  _onClickApplyJob?: () => void;
  _onClickSaveJob?: () => void;
}

const JobDetailCard: React.FC<JobDetailCardProps> = ({
  image,
  name,
  employer,
  salary,
  experience,
  category,
  fromDate,
  toDate,
  location,
  tags,
  description,
  _onClickApplyJob,
  _onClickSaveJob,
}) => {
  return (
    <>
      <div className="bg-orangetext h-1.5"></div>
      <div
        className="bg-white border-2 border-t-0 border-borderColor rounded-md rounded-t-none"
        style={{ height: "calc(100vh - 90px)" }}
      >
        <div className="w-full h-max border-b-2 border-borderColor p-5 flex gap-5 justify-between">
          <div className="w-full relative">
            <h1
              className="text-xl uppercase font-bold text-gray-700 line-clamp-2"
              data-tooltip-id="tooltip"
              data-tooltip-content={name}
            >
              {name}
            </h1>
            <div className="mt-1 relative line-clamp-1">
              <Link
                to={""}
                className="text-gray-600 text-base font-medium hover:text-gray-800 decoration-clone underline mb-1"
                data-tooltip-id="tooltip"
                data-tooltip-content={employer}
              >
                {employer}
              </Link>
            </div>
            <div
              className="flex gap-3 w-full absolute bottom-0
            "
            >
              <button
                className="w-full lg:w-[65%] py-[6px] px-4  text-white rounded flex justify-center items-center min-w-max outline-none relative overflow-hidden duration-300 ease-linear
                              after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-500 hover:after:opacity-100 hover:after:scale-[2.5] bg-orangetext border-transparent hover:border-orange-500"
                onClick={_onClickApplyJob}
              >
                <span className="flex relative z-[1] font-medium gap-2 ">
                  Ứng tuyển ngay
                </span>
              </button>
              <button
                className="font-medium bg-transparent text-orangetext hover:text-orange-500 border-2 border-orangetext hover:border-orange-500 w-full lg:w-[35%] py-[6px] px-4 rounded flex  justify-center items-center min-w-max"
                onClick={_onClickSaveJob}
              >
                Lưu tin
              </button>
            </div>
          </div>
          <div className="w-[100px]">
            <img
              className=" border-2  border-gray-200 shadow-sm rounded"
              src={image ? image : NONE_USER}
              alt={name}
            />
            <div className="relative w-max text-center overflow-hidden flex items-center mt-2">
              <p className=" font-lato font-normal flex gap-2 text-gray-700 hover:text-orangetext transition-all duration-300 cursor-pointer relative before:absolute before:w-full before:h-0.5 before:bg-orangetext before:-left-36 before:bottom-0 before:opacity-0 hover:before:left-0 hover:before:opacity-100 hover:before:transition-all hover:before:duration-500">
                <span className="text-sm">Xem chi tiết</span>{" "}
                <GrFormNextLink className="text-xl" />
              </p>
            </div>
          </div>
        </div>

        <div
          className="scrollbar-custom overflow-y-scroll text-sm  my-2.5 mx-1 flex flex-col gap-3"
          style={{ height: "calc(100vh - 280px)", width: "calc(100%-8px)" }}
        >
          <div className="mx-4 flex flex-col gap-2">
            <div className="flex w-full font-lato gap-5 text-gray-800 font-semibold">
              <p className="w-1/2">
                <span className="font-normal text-gray-600">
                  Ngày đăng tuyển:
                </span>{" "}
                {fromDate}
              </p>
              <p className="w-1/2">
                <span className="font-normal text-gray-600">
                  Ngày kết thúc:
                </span>{" "}
                {toDate}
              </p>
            </div>
            <div className="flex w-full font-lato gap-5 text-gray-800 font-semibold">
              <p className="w-1/2">
                <span className="font-normal text-gray-600">
                  Loại công việc:
                </span>{" "}
                {category}
              </p>
              <p className="w-1/2">
                <span className="font-normal text-gray-600">Kinh nghiệm:</span>{" "}
                {experience}
              </p>
            </div>
            <div className="flex w-full font-lato gap-5 text-gray-800 font-semibold">
              <p className="w-1/2">
                <span className="font-normal text-gray-600">Mức lương:</span>{" "}
                {salary}
              </p>
              <p className="w-1/2">
                <span className="font-normal text-gray-600">Địa điểm:</span>{" "}
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
          <div className="mx-4 border-b-2 border-borderColor border-dashed"></div>
          <div className="mx-4 flex flex-col gap-3 uppercase">
            <label className="text-base font-semibold">Mô tả công việc</label>
            <div
              className=""
              dangerouslySetInnerHTML={{
                __html: description || "",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default JobDetailCard;
