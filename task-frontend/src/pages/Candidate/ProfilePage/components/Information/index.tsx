import { ConstantsHelper } from "@/utils/helpers/constantsHelper";

interface InformationCardProps {
  firstName?: string;
  lastName?: string;
  gender?: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  email?: string;
  link?: string;
}

const Information: React.FC<InformationCardProps> = ({
  firstName,
  lastName,
  gender,
  phoneNumber,
  address,
  dateOfBirth,
  email,
  link,
}) => {
  const sex = ConstantsHelper.findSexById(gender!);
  return (
    <div className="grid md:grid-cols-2 text-sm gap-4 lg:px-3">
      <div className="flex gap-5">
        <div className="font-semibold w-[35%]">Họ:</div>
        <div className="w-[65%]">{firstName}</div>
      </div>
      <div className="flex gap-5">
        <div className="font-semibold w-[35%]">Tên:</div>
        <div className="w-[65%]">{lastName}</div>
      </div>
      <div className="flex gap-5">
        <div className="font-semibold w-[35%]">Giới tính:</div>
        <div className="w-[65%]">{sex?.name}</div>
      </div>
      <div className="flex gap-5">
        <div className="font-semibold w-[35%]">Số điện thoại:</div>
        <div className="w-[65%]">{phoneNumber}</div>
      </div>
      <div className="flex gap-5">
        <div className="font-semibold w-[35%]">Địa chỉ:</div>
        <div className="w-[65%]">{address}</div>
      </div>
      <div className="flex gap-5">
        <div className="font-semibold w-[35%]">Ngày sinh:</div>
        <div className="w-[65%]">{dateOfBirth}</div>
      </div>
      <div className="flex gap-5">
        <div className="font-semibold w-[35%]">Email:</div>
        <div className="w-[65%]">
          <a className="text-blue-800" href="mailto:jane@example.com">
            {email}
          </a>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="font-semibold w-[35%]">Liên kết:</div>
        <div className="w-[65%]">
          <a className="text-blue-800" href={link}>
            {link}
          </a>
        </div>
      </div>
    </div>
  );
};
export default Information;
