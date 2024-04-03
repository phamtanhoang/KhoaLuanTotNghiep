import { ShareCard } from "@/components/ui";
import NON_USER from "@/assets/images/non-user.jpg";
import { RiVipCrown2Line } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
interface LeftPageCardProps {
  image?: string;
  name?: string;
  location?: string;
  email?: string;
  phone?: string;
  description?: string;
  isVip?: boolean;
}

const LeftPage: React.FC<LeftPageCardProps> = ({
  image,
  name,
  location,
  email,
  phone,
  description,
  isVip,
}) => {
  return (
    <>
      <div>
        <div className="bg-orangetext h-[1vh]"></div>
        <div className="bg-white p-5 rounded-sm flex flex-col gap-5">
          <div className="relative w-[200px] h-[200px] mx-auto ">
            <img
              className="rounded-lg"
              src={image ? image : NON_USER}
              alt={name}
            />
            {isVip && (
              <>
                <div
                  className="absolute -top-3 -right-3 text-2xl p-2.5 rounded-full text-orangebackground bg-orangetext items-center justify-center"
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Nhà tuyển dụng VIP"
                >
                  <RiVipCrown2Line />
                </div>
                
              </>
            )}
          </div>

          <h1 className="text-xl font-bold uppercase leading-tight tracking-wide antialiased hover:underline cursor-pointer text-center">
            {name}
          </h1>
        </div>
      </div>
      <div className="w-full bg-white rounded-sm">
        <h3 className="font-bold text-xl leading-8 bg-orangetext text-white px-5 py-3">
          Giới thiệu
        </h3>

        <p className="text-sm text-gray-500 p-5">{description}</p>
      </div>
      <div className="w-full bg-white rounded-sm">
        <h3 className="font-bold text-xl leading-8 bg-orangetext text-white px-5 py-3">
          Thông tin liên hệ
        </h3>
        <div className="p-5 flex flex-col gap-3 text-sm text-gray-500">
          {location && (
            <p>
              Địa chỉ:{" "}
              <span className="font-medium text-gray-700">{location}</span>
            </p>
          )}
          {email && (
            <p>
              Email: <span className="font-medium text-gray-700">{email}</span>
            </p>
          )}
          {phone && (
            <p>
              Số điện thoại:{" "}
              <span className="font-medium text-gray-700"> {phone}</span>
            </p>
          )}
        </div>
      </div>
      <div className="w-full bg-white rounded-sm">
        <h3 className="font-bold text-xl leading-8 bg-orangetext text-white px-5 py-3">
          Chia sẻ nhà tuyển dụng
        </h3>

        <div className="border-2 border-orangetext flex justify-between items-center px-2 py-1.5 rounded-md gap-2 m-5">
          <ShareCard />
        </div>
      </div>
    </>
  );
};
export default LeftPage;
