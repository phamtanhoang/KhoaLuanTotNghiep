import { CiClock2 } from "react-icons/ci";
import { FaBuilding } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import { RiVipCrown2Line } from "react-icons/ri";
import "react-tooltip/dist/react-tooltip.css";
import NONE_USER from "@/assets/images/non-user.jpg";
import { AiFillEye } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { DataConstants } from "@/utils/constants/dataConstants";
import { PathConstants } from "@/utils/constants";
import { Link } from "react-router-dom";
import { TextHelper } from "@/utils/helpers";

interface JobAppliedCardProps {
  id?: string;
  image?: string;
  name?: string;
  employer?: string;
  employerId?: string;
  fromSalary?: string;
  toSalary?: string;
  location?: string;
  appliedDate?: string;
  category?: string;
  isVip?: boolean;
  state?: string;
  _onClickDetail?: () => void;
}

const JobAppliedCard: React.FC<JobAppliedCardProps> = ({
  id,
  image,
  name,
  employer,
  employerId,
  fromSalary,
  toSalary,
  location,
  appliedDate,
  category,
  isVip,
  state,
  _onClickDetail,
}) => {
  return (
    <div className="w-full cursor-pointer bg-white transition-all duration-300 rounded-l-md p-3 lg:p-4 border-2 hover:shadow-md hover:border-orangetext border-borderColor">
      <div className=" flex w-full gap-3">
        <img
          className="w-[4.5rem] h-[4.5rem] border-2  border-gray-200 shadow-sm rounded"
          src={image ? image : NONE_USER}
          alt={name}
        />
        <div className="w-[80%]">
          <p className="flex text-gray-500 text-sm font-lato font-normal">
            <CiClock2 className="my-auto" />
            &nbsp;Ngày ứng tuyển:&nbsp;&nbsp;
            {appliedDate}
          </p>
          <Link
            to={`${PathConstants.CANDIDATE_PATHS.jobs}/${id}`}
            className="text-base uppercase font-semibold text-gray-700 line-clamp-1 mt-1"
            data-tooltip-id="tooltip"
            data-tooltip-content={name}
          >
            {name}
          </Link>

          <div className="mt-1 relative flex text-sm">
            <FaBuilding className="text-gray-600 text-sm my-auto" />
            &nbsp;
            <Link
              to={`${PathConstants.CANDIDATE_PATHS.employers}/${employerId}`}
              className="line-clamp-1"
              data-tooltip-id="tooltip"
              data-tooltip-content={employer}
            >
              {employer}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-between mt-4">
        <div className="w-full flex flex-col gap-2 text-sm">
          <p className="flex gap-1 text-gray-500 font-lato font-normal">
            <MdOutlineAttachMoney className="text-base my-auto" />
            &nbsp;
            <p className="line-clamp-1">
              Mức lương:&nbsp;{TextHelper.SalaryText(fromSalary, toSalary)}
            </p>
          </p>
          <p className="flex gap-1 text-gray-500 font-lato font-normal">
            <BiCategoryAlt className="text-base my-auto" />
            &nbsp;
            <p className="line-clamp-1">Ngành nghề:&nbsp;{category}</p>
          </p>
          <p className="flex gap-1 text-gray-500  font-lato font-normal">
            <IoLocationOutline className="text-base my-auto" />
            &nbsp;
            <p className="line-clamp-1">Địa điểm:&nbsp;{location}</p>
          </p>
        </div>
        <div className="relative">
          {isVip && (
            <p
              className="absolute bottom-0 right-0 text-lg p-2 rounded-full  text-orangebackground bg-orangetext"
              data-tooltip-id="tooltip"
              data-tooltip-content="Tin tuyển dụng VIP"
            >
              <RiVipCrown2Line />
            </p>
          )}
        </div>
      </div>
      <hr className="my-1.5  lg:mt-3"></hr>
      <div className="flex justify-between gap-2">
        <p className="flex text-gray-500 text-base font-lato font-normal my-auto">
          Trạng thái:&nbsp;&nbsp;
          {DataConstants.APPLY_STATE_DROPDOWN.map(
            (item: any) =>
              state === item.id && (
                <span
                  key={item.id}
                  className="font-medium"
                  style={{ color: item.color }}
                >
                  {item.name}
                </span>
              )
          )}
        </p>
        <button
          className="text-xl p-2 text-orangetext rounded-full bg-orangebackground hover:text-orangebackground hover:bg-orangetext"
          onClick={_onClickDetail}
        >
          <AiFillEye />
        </button>
      </div>
    </div>
  );
};

export default JobAppliedCard;
