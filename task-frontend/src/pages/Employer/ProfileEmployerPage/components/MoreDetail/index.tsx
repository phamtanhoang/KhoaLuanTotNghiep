interface MoreDetailProps {
  phoneNumber?: string;
  email?: string;
  name?: string;
  businessCode?: string;
  address?: string;
  scale?: string;
  _onClickChangeInfo?: () => void;
}

const MoreDetail: React.FC<MoreDetailProps> = ({
  phoneNumber,
  email,
  name,
  businessCode,
  address,
  scale,
  _onClickChangeInfo,
}) => {
  return (
    <>
      <h4 className="text-xl text-gray-900 font-bold">Thông tin tài khoản</h4>
      <ul className="mt-2 text-gray-700">
        <li className="flex border-y border-dashed border-borderColor py-2 gap-4">
          <span className="font-bold w-[35%] lg:w-[20%]">
            Tên doanh nghiệp:
          </span>
          <span className="text-gray-700 w-[65%] lg:w-[80%]">{name}</span>
        </li>
        <li className="flex border-b border-dashed border-borderColor py-2 gap-4">
          <span className="font-bold w-[35%] lg:w-[20%]">Địa chỉ:</span>
          <span className="text-gray-700 w-[65%] lg:w-[80%]">{address}</span>
        </li>
        <li className="flex border-b border-dashed border-borderColor py-2 gap-4">
          <span className="font-bold w-[35%] lg:w-[20%]">Số điện thoại:</span>
          <span className="text-gray-700 w-[65%] lg:w-[80%]">
            {phoneNumber}
          </span>
        </li>
        <li className="flex border-b border-dashed border-borderColor py-2 gap-4">
          <span className="font-bold w-[35%] lg:w-[20%]">Email:</span>
          <span className="text-gray-700 w-[65%] lg:w-[80%]">{email}</span>
        </li>
        <li className="flex border-b border-dashed border-borderColor py-2 gap-4">
          <span className="font-bold w-[35%] lg:w-[20%]">
            Mã số kinh doanh:
          </span>
          <span className="text-gray-700 w-[65%] lg:w-[80%]">
            {businessCode}
          </span>
        </li>
        <li className="flex border-b border-dashed border-borderColor py-2 gap-4">
          <span className="font-bold w-[35%] lg:w-[20%]">
            Quy mô doanh nghiệp:
          </span>
          <span className="text-gray-700 w-[65%] lg:w-[80%]">{scale}</span>
        </li>
      </ul>
      <button
        className="block w-full text-orangetext hover:text-orange-500 text-base font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3"
        onClick={_onClickChangeInfo}
      >
        Sửa thông tin
      </button>
    </>
  );
};
export default MoreDetail;
