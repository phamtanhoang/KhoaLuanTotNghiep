import { CiClock2 } from "react-icons/ci";
import { FaBookmark, FaBuilding, FaRegTrashCan } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import { RiVipCrown2Fill, RiVipCrown2Line } from "react-icons/ri";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import NONE_USER from "@/assets/images/non-user.jpg";
import { CANDIDATE_PATHS } from "@/utils/constants/pathConstants";
import { LuSendHorizonal } from "react-icons/lu";
import { TbVip } from "react-icons/tb";
interface JobCardProps {
  image?: string;
  name?: string;
  employer?: string;
  salary?: string;
  location?: string;
  dateline?: string;
  isHighlighted?: boolean;
  isVip?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
  image,
  name,
  employer,
  salary,
  location,
  dateline,
  isVip,
}) => {
  const urlLink = window.location.pathname;
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
            className="text-base uppercase font-semibold text-gray-700 max-lg:line-clamp-2"
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
          <p className="flex gap-1 text-gray-500  font-lato font-normal">
            <IoLocationOutline className="my-auto" /> Địa điểm: {location}
          </p>
          <p className="flex gap-1 text-gray-500 font-lato font-normal">
            <MdOutlineAttachMoney className="my-auto" />
            Mức lương: {salary}
          </p>
          <p className="flex gap-1 text-gray-500 font-lato font-normal">
            <CiClock2 className="my-auto" /> Thời hạn: {dateline}
          </p>
        </div>
        <div className="flex flex-col gap-2 justify-end">
          {urlLink !== CANDIDATE_PATHS.savedJobs ? (
            <button className="p-2 text-orangetext rounded-full bg-orangebackground hover:text-orangebackground hover:bg-orangetext">
              <FaBookmark />
            </button>
          ) : (
            <button className="p-2 text-orangetext rounded-full bg-orangebackground hover:text-orangebackground hover:bg-orangetext">
              <FaRegTrashCan />
            </button>
          )}
          <button className="p-2 text-orangetext rounded-full bg-orangebackground hover:text-orangebackground hover:bg-orangetext">
            <LuSendHorizonal />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
