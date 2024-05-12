import { CiClock2 } from "react-icons/ci";
import { FaBookmark, FaBuilding, FaRegTrashCan } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import "react-tooltip/dist/react-tooltip.css";
import NONE_USER from "@/assets/images/non-user.jpg";

import { LuSendHorizonal } from "react-icons/lu";
import { TbVip } from "react-icons/tb";
import { PathConstants } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { jobsService } from "@/services";
import { SwalHelper } from "@/utils/helpers";
import { useContext } from "react";
import { LoadingContext } from "@/App";
interface JobCardProps {
  id?: string;
  image?: string;
  name?: string;
  employer?: string;
  salary?: string;
  location?: string;
  dateline?: string;
  isVip?: boolean;
  isSave?: boolean;
  fetchData: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  image,
  name,
  employer,
  salary,
  location,
  dateline,
  isVip,
  isSave,
  fetchData,
}) => {
  const context = useContext(LoadingContext);
  const urlLink = window.location.pathname;
  const navigate = useNavigate();

  const _onClickSave = (e: any) => {
    e.stopPropagation();
    context.handleOpenLoading();
    jobsService
      .saveJob(id!)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          fetchData();
          SwalHelper.MiniAlert(res.data.Message, "success");
        } else {
          SwalHelper.MiniAlert(res.data.Message, "error");
        }
      })
      .catch(() => {
        SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
      })
      .finally(() => {
        context.handleCloseLoading();
      });
  };
  const _onClickUnSave = (e: any) => {
    e.stopPropagation();
    context.handleOpenLoading();
    jobsService
      .unSaveJob(id!)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          fetchData();
          SwalHelper.MiniAlert(res.data.Message, "success");
        } else {
          SwalHelper.MiniAlert(res.data.Message, "error");
        }
      })
      .catch(() => {
        SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
      })
      .finally(() => {
        context.handleCloseLoading();
      });
  };
  return (
    <div
      className={`w-full cursor-pointer bg-white transition-all duration-300 rounded-l-md p-4 border-2 hover:shadow-md hover:border-orangetext ${
        isVip
          ? "border-orange-500 border-[3px]  border-r-[8px]"
          : "border-borderColor"
      } `}
    >
      <div className=" flex w-full gap-3 relative">
        {isVip && (
          <p
            className="text-2xl  px-1 text-white bg-orangetext absolute -top-3 -left-3 rounded-[2px] opacity-90"
            data-tooltip-id="tooltip"
            data-tooltip-content="Tin tuyển dụng VIP"
          >
            <TbVip />
          </p>
        )}
        <img
          className="w-[72px] h-[72px]  shadow-sm "
          src={image ? image : NONE_USER}
          alt={name}
        />
        <div className="w-full">
          <h1
            className="text-base uppercase font-semibold text-gray-700 line-clamp-2"
            data-tooltip-id="tooltip"
            data-tooltip-content={name}
          >
            {name}
          </h1>

          <div className="relative">
            <FaBuilding className="text-gray-600 absolute top-0 left-0 text-base mt-0.5" />
            <a
              className="text-gray-600 text-sm font-medium hover:text-gray-800 line-clamp-1 mt-1"
              data-tooltip-id="tooltip"
              data-tooltip-content={employer}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{employer}
            </a>
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-between mt-3">
        <div className="w-full flex flex-col gap-2 text-sm">
          <p className="flex gap-1 text-gray-500 font-lato font-normal">
            <CiClock2 className="my-auto" />

            <p className="line-clamp-1">
              &nbsp;Thời hạn:&nbsp;&nbsp;
              {dateline}
            </p>
          </p>
          <p className="flex gap-1 text-gray-500 font-lato font-normal">
            <MdOutlineAttachMoney className="my-auto" />

            <p className="line-clamp-1">&nbsp;Mức lương:&nbsp;&nbsp;{salary}</p>
          </p>

          <p className="flex gap-1 text-gray-500  font-lato font-normal">
            <IoLocationOutline className="text-sm my-auto" />

            <p
              className="line-clamp-1"
              data-tooltip-id="tooltip"
              data-tooltip-content={location}
            >
              &nbsp;Địa điểm:&nbsp;{location}
            </p>
          </p>
        </div>
        <div className="flex flex-col gap-2 justify-end">
          {urlLink !== PathConstants.CANDIDATE_PATHS.savedJobs ? (
            isSave ? (
              <button
                className="p-2 text-white rounded-full bg-orangetext"
                onClick={_onClickUnSave}
              >
                <FaBookmark />
              </button>
            ) : (
              <button
                className="p-2 text-orangetext rounded-full bg-orangebackground"
                onClick={_onClickSave}
              >
                <FaBookmark />
              </button>
            )
          ) : (
            <button
              className="p-2 text-orangetext rounded-full bg-orangebackground hover:text-orangebackground hover:bg-orangetext"
              onClick={_onClickUnSave}
            >
              <FaRegTrashCan />
            </button>
          )}
          <button
            className="p-2 text-orangetext rounded-full bg-orangebackground hover:text-orangebackground hover:bg-orangetext"
            onClick={() => {
              navigate(`${PathConstants.CANDIDATE_PATHS.jobs}/${id}`);
            }}
          >
            <LuSendHorizonal />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
