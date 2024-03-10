import NONE_USER from "@/assets/images/non-user.jpg";
import NONE_BACKGROUND from "@/assets/images/image-background.png";
import { RiVipCrown2Line } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
interface EmployerCardProps {
  image?: string;
  banner?: string;
  name?: string;
  address?: string;
  description?: string;
  isVip?: boolean;
}

const EmployerCard: React.FC<EmployerCardProps> = ({
  image,
  banner,
  name,
  address,
  description,
  isVip,
}) => {
  return (
    <div className="transition-all duration-150 flex cursor-pointer border border-gray-300 rounded-lg relative">
      <div className="flex flex-col items-stretch pb-4 duration-150 bg-white rounded-lg shadow-orangetext/20 transition-all hover:shadow-lg hover:shadow-orangetext/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
        <div className="md:flex-shrink-0">
          <img
            src={banner ? banner : NONE_BACKGROUND}
            alt={banner}
            className="object-fill w-full rounded-lg rounded-b-none md:h-56"
          />
        </div>
        <hr className="border-gray-300" />
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1 w-full">
              <img
                className="object-cover h-12 w-12 rounded-full"
                src={image ? image : NONE_USER}
                alt={name}
              />
              <div className="flex flex-col mx-2">
                <h1 className="font-semibold text-gray-700 text-lg truncate w-[250px] lg:w-[320px]">
                  {name}
                </h1>
                <span className="mx-1 mt-1 text-xs text-gray-600 truncate w-[250px] lg:w-[320px]">
                  {address}
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-300" />
        <p className="block font-sans text-[0.9rem] font-normal leading-relaxed text-inherit antialiased line-clamp-2 px-3 pt-2 ">
          {description}
        </p>
      </div>
      {isVip && (
        <>
          <div
            className="absolute top-1.5 right-1.5 text-2xl p-2.5 rounded-full text-orangebackground bg-orangetext items-center justify-center"
            data-tooltip-id="tooltip"
            data-tooltip-content="Nhà tuyển dụng VIP"
          >
            <RiVipCrown2Line />
          </div>
          <Tooltip id="tooltip" />
        </>
      )}
    </div>
  );
};
export default EmployerCard;
