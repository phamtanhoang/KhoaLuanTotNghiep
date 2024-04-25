import { ConstantsHelper } from "@/utils/helpers/constantsHelper";
import { DateHelper } from "@/utils/helpers/dateHelper";

interface HRDetailProps {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  email?: string;
  sex?: string;
  status?: string;
  employerName?: string;
}
const HRDetail: React.FC<HRDetailProps> = ({
  firstName,
  lastName,
  dateOfBirth,
  phoneNumber,
  email,
  sex,
  status,
  employerName,
}) => {
  return (
    <>
      <div className="flex">
        <dl className="w-full">
          <div className="bg-gray-50 px-4 py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm font-medium text-gray-500">Họ </dt>
            <dd className="mt-1 text-sm text-gray-900 lg:mt-0 lg:col-span-2">
              {firstName}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900 lg:mt-0 lg:col-span-2">
              {email}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm font-medium text-gray-500">Ngày sinh</dt>
            <dd className="mt-1 text-sm text-gray-900 lg:mt-0 lg:col-span-2">
              {DateHelper.formatDate(new Date(dateOfBirth || ""))}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm font-medium text-gray-500">Công ty</dt>
            <dd className="mt-1 text-sm text-gray-900 lg:mt-0 lg:col-span-2">
              {employerName}
            </dd>
          </div>
        </dl>
        <dl className="w-full">
          <div className="bg-white px-4 py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm font-medium text-gray-500">Tên </dt>
            <dd className="mt-1 text-sm text-gray-900 lg:mt-0 lg:col-span-2">
              {lastName}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm font-medium text-gray-500">Số điện thoại</dt>
            <dd className="mt-1 text-sm text-gray-900 lg:mt-0 lg:col-span-2">
              {phoneNumber}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm font-medium text-gray-500">Giới tính</dt>
            <dd className="mt-1 text-sm text-gray-900 lg:mt-0 lg:col-span-2">
              {ConstantsHelper.findSexById(sex || "")?.name}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm font-medium text-gray-500">Tình trạng</dt>
            <dd className="mt-1 text-sm text-gray-900 lg:mt-0 lg:col-span-2">
              {ConstantsHelper.findHRStateById(status || "")?.name}
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
};
export default HRDetail;
