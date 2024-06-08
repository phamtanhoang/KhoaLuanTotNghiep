import { CiClock2 } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import NONE_USER from "@/assets/images/non-user.jpg";
import { useNavigate } from "react-router-dom";
import { PathConstants } from "@/utils/constants";
import { jobsService } from "@/services";
import { SwalHelper } from "@/utils/helpers";
import { useContext, useState } from "react";
import { LoadingContext } from "@/App";
interface JobCardV2Props {
  id?: string;
  isSave?: boolean;
  dateline?: string;
  location?: string;
  salary?: string;
  image?: string;
  name?: string;
  employer?: string;
  employerId?: string;
}
const JobCardV2: React.FC<JobCardV2Props> = ({
  id,
  isSave,
  dateline,
  location,
  salary,
  image,
  name,
  employer,
  employerId,
}) => {
  const navigate = useNavigate();
  const context = useContext(LoadingContext);
  const [save, setSave] = useState<boolean>(isSave || false);
  //   alert(isSave);
  const _onClickSave = (e: any) => {
    e.stopPropagation();
    context.handleOpenLoading();
    jobsService
      .saveJob(id!)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setSave(true);
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
          setSave(false);
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
    <div className="w-full mx-auto bg-white hover:shadow-sm rounded-lg border-2 border-borderColor hover:border-orangetext cursor-default p-5 group">
      <div className="w-full flex justify-between gap-2 items-center mb-3">
        <h2
          className="text-lg font-semibold text-gray-700 uppercase line-clamp-1 group-hover:text-orangetext/85 cursor-pointer"
          onClick={() =>
            navigate(PathConstants.CANDIDATE_PATHS.jobs + `/${id}`)
          }
        >
          {name}
        </h2>

        {save ? (
          <button
            className="p-1.5 text-white rounded-full bg-orangetext "
            onClick={_onClickUnSave}
          >
            <FaBookmark />
          </button>
        ) : (
          <button
            className="p-1.5 text-orangetext rounded-full bg-orangebackground "
            onClick={_onClickSave}
          >
            <FaBookmark />
          </button>
        )}
      </div>
      <div>
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
      <div className="flex items-start justify-start whitespace-normal gap-3 mt-3">
        <img
          src={image ? image : NONE_USER}
          className={`w-8 h-8 ${!image && "rounded-full"}`}
        />
        <div
          className="my-auto font-medium line-clamp-1 text-right cursor-pointer"
          data-tooltip-id="tooltip"
          data-tooltip-content={employer}
          onClick={() =>
            navigate(PathConstants.CANDIDATE_PATHS.employers + `/${employerId}`)
          }
        >
          {employer}
        </div>
      </div>
    </div>
  );
};
export default JobCardV2;
