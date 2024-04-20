import NONE_USER from "@/assets/images/non-user.jpg";
import NONE_BACKGROUND from "@/assets/images/image-background.png";
import { RiVipCrown2Line } from "react-icons/ri";

interface EmployerCardProps {
  image: string;
  banner: string;
  name: string;
  address: string;
  description: string;
  isVip: boolean;
  _onClickDetail: () => void;
}

const EmployerCard: React.FC<EmployerCardProps> = ({
  image,
  banner,
  name,
  address,
  description,
  isVip,
  _onClickDetail,
}) => {
  return (
    <div
      className="transition-all duration-150 flex cursor-pointer border border-gray-300 rounded-lg relative"
      onClick={_onClickDetail}
    >
      <div className="flex flex-col items-stretch duration-150 bg-white rounded-lg  transition-all hover:shadow-lg  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
        <div className="md:flex-shrink-0">
          <img
            src={banner ? banner : NONE_BACKGROUND}
            alt={banner}
            className="object-fill w-full rounded-lg rounded-b-none"
          />
        </div>
        <hr className="border-gray-300" />
        <div className="p-3 pt-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1 w-full gap-3">
              <img
                className="object-cover h-[70px] w-[70px] rounded-full -mt-6 border-2 border-white"
                src={image ? image : NONE_USER}
                alt={name}
              />
              <div className="flex flex-col">
                <h1 className="font-semibold text-gray-700 text-base truncate">
                  {name}
                </h1>
                <span className="text-xs text-gray-600 truncate italic">
                  {address}
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-300" />
        <p className="font-sans text-sm font-normal m-3 line-clamp-3">
          {description}
        </p>
      </div>
      {isVip && (
        <div
          className="absolute top-1 right-1 text-2xl p-2 rounded-full text-orangebackground bg-orangetext items-center justify-center"
          data-tooltip-id="tooltip"
          data-tooltip-content="Nhà tuyển dụng VIP"
        >
          <RiVipCrown2Line />
        </div>
      )}
    </div>
  );
};
export default EmployerCard;
