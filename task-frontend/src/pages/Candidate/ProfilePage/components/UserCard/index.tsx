import NON_USER from "@/assets/images/non-user.jpg";
import { IoCameraSharp } from "react-icons/io5";
interface UserCardProps {
  image?: string;
  name?: string;
  job?: string;
  description?: string;
  _onClickChangeImage?: () => void;
  isFindJob?: boolean;
  _onClickFindJob?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  image,
  name,
  job,
  description,
  _onClickChangeImage,
  isFindJob,
  _onClickFindJob,
}) => {
  return (
    <div className="bg-white p-5 border-t-4 border-orangetext shadow-sm rounded-sm">
      <div className="overflow-hidden  flex justify-center">
        <div className="relative">
          <img
            className="h-[200px] w-[200px] rounded-full border-2 border-borderColor"
            src={image ? image : NON_USER}
            alt={name}
          />
          <button
            className="absolute bottom-2.5 right-2.5 text-2xl p-2 rounded-full bg-body hover:bg-body/90 text-black/90 hover:text-black ring-2 ring-white"
            onClick={_onClickChangeImage}
          >
            <IoCameraSharp />
          </button>
        </div>
      </div>
      <h1 className="text-gray-900 font-bold text-2xl leading-8 mt-3 text-center">
        {name}
      </h1>
      <h3 className="text-gray-600 font-xl text-semibold leading-6 text-center mt-2">
        {job}
      </h3>

      <p className="text-sm text-gray-500 hover:text-gray-600 leading-6 mt-3">
        &nbsp;&nbsp;&nbsp;&nbsp;{description}
      </p>
      <div className="mt-4">
        <div
          className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
          onClick={_onClickFindJob}
        >
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer ${
              isFindJob ? "right-0 border-orangetext" : "left-0"
            }`}
            checked={isFindJob}
            readOnly
          />
          <label
            htmlFor="toggle"
            className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
              isFindJob ? "bg-orangetext" : "bg-gray-300"
            }`}
          ></label>
        </div>
        <label
          className={`text-gray-400 text-base font-semibold ${
            isFindJob ? "text-orangetext" : "text-gray-300"
          }`}
        >
          {isFindJob
            ? "Đang bật tìm kiếm việc làm."
            : "Đã tắt tìm kiếm việc làm."}
        </label>
      </div>
    </div>
  );
};
export default UserCard;
