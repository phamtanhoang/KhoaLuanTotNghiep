import NON_USER from "@/assets/images/non-user.jpg";
import { IoCameraSharp } from "react-icons/io5";
interface UserCardProps {
  image?: string;
  name?: string;
  job?: string;
  description?: string;
  _onClickChangeImage?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  image,
  name,
  job,
  description,
  _onClickChangeImage,
}) => {
  return (
    <div className="bg-white p-5 border-t-4 border-orangetext shadow-sm rounded-sm">
      <div className="overflow-hidden  flex justify-center">
        <div className="relative">
          <img
            className="h-[200px] w-[200px] rounded-full"
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
    </div>
  );
};
export default UserCard;
