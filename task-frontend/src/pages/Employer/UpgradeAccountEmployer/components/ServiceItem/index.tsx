import React from "react";
import { MdCheck } from "react-icons/md";

interface ServiceItemProps {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  month?: number;
  color?: string;
  _onClickCheckout?: () => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  name,
  description,
  price,
  month,
  color,
  _onClickCheckout,
}) => {
  return (
    <div className=" flex flex-col-reverse lg:flex-row justify-between p-3 lg:p-5 gap-4 lg:rounded-lg bg-white shadow-indigo-50 shadow-md">
      <div className="w-full lg:w-[calc(100%-10rem)]">
        <h2 className="text-gray-900 text-lg lg:text-xl font-semibold text-left flex">
          Giá tiền:&nbsp;&nbsp;
          <p
            className="text-xl lg:text-2xl font-bold leading-6 italic"
            style={{ color: color }}
          >
            {price?.toLocaleString()} VNĐ&nbsp;
            <span className="font-medium text-gray-500">/</span>
            <span className="font-medium text-base text-gray-500 ">
              &nbsp;{month} tháng
            </span>
          </p>
        </h2>

        <div className="mt-2 flex items-center gap-4">
          <h4
            className="flex-none text-base font-semibold leading-6"
            style={{ color: color }}
          >
            Mô tả dịch vụ
          </h4>
          <div className="h-px flex-auto bg-gray-100"></div>
        </div>
        <p
          className=" text-gray-500 text-left mt-1 line-clamp-2 text-base italic"
          data-tooltip-id="tooltip"
          data-tooltip-content="Last Transaction"
        >
          {description}
        </p>

        <button
          className="mt-4 flex justify-start text font-medium px-4 py-2 mt-max  text-white rounded tracking-wider  outline-none items-end"
          style={{ backgroundColor: color }}
          onClick={_onClickCheckout}
        >
          Thanh toán
        </button>
      </div>
      <div
        className=" mx-auto w-40 h-40  rounded-full shadow-2xl font-semibold  border-white  border-dashed border-2  flex justify-center items-center "
        style={{ backgroundColor: color }}
      >
        <div>
          <h1 className="text-white text-2xl ">{name}</h1>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
