import { CiClock2 } from "react-icons/ci";
import { FaBookmark, FaBuilding } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import { RiVipCrown2Line } from "react-icons/ri";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import NONE_USER from "@/assets/images/non-user.jpg";
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
  isHighlighted,
  isVip,
}) => {
  return (
    <div
      className={`w-full cursor-pointer bg-white transition-all duration-300 rounded-l-md p-5 border-2 hover:shadow-md hover:border-orangetext ${
        isHighlighted
          ? "border-orange-500 border-[3px]  border-r-[10px]"
          : "border-[#D9D9D9]"
      } `}
    >
      <div className=" flex w-full gap-3">
        <img
          className="w-20 h-20 border-2  border-gray-200 p-2 shadow-sm rounded"
          src={image ? image : NONE_USER}
          alt={name}
        />
        <div className="w-[80%]">
          <h1
            className="lg:truncate text-lg uppercase font-semibold text-gray-700 "
            data-tooltip-id="name-tooltip"
            data-tooltip-content={name}
          >
            {name}
          </h1>
          <Tooltip id="name-tooltip" />
          <div className="mt-1 relative">
            <FaBuilding className="text-gray-600 absolute top-0 left-0 text-lg " />
            <a className="text-gray-600 text-base font-medium hover:text-gray-800">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{employer}
            </a>
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-between mt-3">
        <div className="w-full flex flex-col gap-2.5">
          <p className="flex gap-1 text-gray-500 text-[0.95rem] font-lato font-normal">
            <IoLocationOutline className="text-[1.1rem] mt-0.5" />
            {location}
          </p>
          <p className="flex gap-1 text-gray-500 text-[0.95rem] font-lato font-normal">
            <MdOutlineAttachMoney className="text-[1.1rem] mt-0.5" />
            {salary}
          </p>
          <p className="flex gap-1 text-gray-500 text-[0.95rem] font-lato font-normal">
            <CiClock2 className="text-[1.1rem] mt-0.5" />
            {dateline}
          </p>
        </div>
        <div className="relative">
          {isVip && (
            <p
              className="absolute bottom-13 right-0 h-10 w-10 text-lg p-2.5 rounded-full  text-orangebackground bg-orangetext"
              data-tooltip-id="tooltip"
              data-tooltip-content="Tin tuyển dụng VIP"
            >
              <RiVipCrown2Line />
              <Tooltip id="tooltip" />
            </p>
          )}

          <button className="absolute bottom-0 right-0 h-10 w-10 text-lg p-2.5 text-orangetext rounded-full bg-orangebackground hover:text-orangebackground hover:bg-orangetext">
            <FaBookmark />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
