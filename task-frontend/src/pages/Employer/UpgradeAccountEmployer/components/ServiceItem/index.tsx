import React from "react";
import { MdCheck } from "react-icons/md";

interface ServiceItemProps {
  name: string;
  description: string;
  include: { value: string }[];
  price: number;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  name,
  description,
  include,
  price,
}) => {
  return (
    <div className="bg-white mx-auto max-w-2xl lg:rounded-3xl lg:flex lg:max-w-none w-full">
      <div className="p-6 lg:p-10 lg:flex-auto">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900">
          {name}
        </h3>
        <p className="mt-4 text-base leading-7 text-gray-600">{description}</p>
        <div className="mt-6 flex items-center gap-4">
          <h4 className="flex-none text-sm font-semibold leading-6 text-orangetext">
            Tiện ích bao gồm
          </h4>
          <div className="h-px flex-auto bg-gray-100"></div>
        </div>
        <ul className="mt-4 grid grid-cols-1 gap-3 text-sm leading-6 text-gray-600 sm:grid-cols-2 lg:gap-6">
          {include.map((item, index) => (
            <li className="flex gap-2" key={index}>
              <MdCheck className="text-xl text-orangetext my-auto" />
              {item.value}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-2 lg:w-full lg:max-w-md max-lg:pt-0">
        <div className="rounded-2xl bg-body py-6 px-10 text-center  lg:flex lg:flex-col lg:justify-center lg:py-10 lg:px-16">
          <div className="mx-auto max-w-xs">
            <p className="text-base font-semibold text-gray-600">
              Thanh toán một lần, sở hữu thả ga
            </p>
            <p className="mt-4 flex items-baseline justify-center gap-2">
              <span className="text-5xl font-bold tracking-tight text-gray-900">
                {price}
              </span>
              <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                VNĐ
              </span>
            </p>
            <a
              href="#"
              className="mt-6 block w-full rounded-md bg-orangetext px-3 py-4 text-center font-semibold text-white hover:bg-orangetext/90"
            >
              Thanh toán
            </a>
            <p className="mt-4 text-xs leading-5 text-gray-600">
              Nếu gặp bất cứ vấn đề gì cần hỗ trợ hãy liên hệ với chúng tôi ngay
              để được hỗ trợ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
