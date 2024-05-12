import { RiVipCrown2Line } from "react-icons/ri";
import NON_USER from "@/assets/images/non-user.jpg";
import NON_BG from "@/assets/images/non-bg.jpg";
import { IoCameraSharp } from "react-icons/io5";

interface BaseInfoProps {
  image?: string;
  backgroundImage?: string;
  name?: string;
  description?: string;
  address?: string;
  _onClickChangeImage?: () => void;
  _onClickChangeBackgroundImage?: () => void;
  isVip?: boolean;
}

const BaseInfo: React.FC<BaseInfoProps> = ({
  image,
  backgroundImage,
  name,
  description,
  address,
  _onClickChangeImage,
  _onClickChangeBackgroundImage,
  isVip,
}) => {
  return (
    <>
      <div className="w-full relative">
        <img
          src={backgroundImage ? backgroundImage : NON_BG}
          className="w-full h-full lg:rounded-t-lg"
        />
        <button
          className="font-medium  cursor-pointer flex gap-2 absolute top-5 right-5 px-4 py-2 rounded-lg  text-black/90 hover:text-black bg-white hover:bg-body z-1"
          onClick={_onClickChangeBackgroundImage}
        >
          <IoCameraSharp className="text-xl my-auto" />
          Đổi ảnh bìa
        </button>
      </div>
      <div className="flex flex-col items-center -mt-20 relative">
        <div className="relative">
          <img
            src={image ? image : NON_USER}
            className="w-40 h-40 border-4 border-white rounded-full bg-white"
          />
          <button
            className="absolute bottom-2 right-2 text-2xl p-2 rounded-full bg-body hover:bg-body/90 text-black/90 hover:text-black ring-2 ring-white"
            onClick={_onClickChangeImage}
          >
            <IoCameraSharp />
          </button>
        </div>

        <div className="flex items-center space-x-2 mt-2 font-medium">
          <p className="text-2xl">{name}</p>
          {isVip && (
            <p
              className=" p-2 rounded-full  text-orangebackground bg-orangetext"
              data-tooltip-id="tooltip"
              data-tooltip-content="Nhà tuyển dụng VIP"
            >
              <RiVipCrown2Line />
            </p>
          )}
        </div>

        <p className="text-sm text-gray-500 mt-2">{address}</p>
      </div>
      <div className="p-4 lg:p-8">
        <h4 className="text-xl text-gray-900 font-bold">Mô tả</h4>
        <p className="mt-2 text-gray-700">{description}</p>
      </div>
    </>
  );
};
export default BaseInfo;
