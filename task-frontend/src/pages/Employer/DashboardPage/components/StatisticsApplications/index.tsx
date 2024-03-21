import NON_USER from "@/assets/images/non-user.jpg";
import { GrFormNextLink } from "react-icons/gr";

interface UserInterFace {
  image?: string;
  name?: string;
  email?: string;
}

interface ApplicationsInterface {
  user?: UserInterFace;
  name?: string;
  applyDate?: string;
}

interface StatisticsApplications {
  value?: ApplicationsInterface[];
}

const StatisticsApplications: React.FC<StatisticsApplications> = ({
  value,
}) => {
  return (
    <>
      <div className="justify-between flex  pb-4">
        <h2 className="text-gray-800 text-lg lg:text-xl font-bold">
          Danh sách ứng tuyển chưa duyệt
        </h2>
        <p className=" font-lato font-normal flex gap-2 text-lightGray hover:gap-3.5 hover:text-orangetext transition-all duration-300 cursor-pointer">
          <span className="max-lg:hidden">Xem tất cả</span>{" "}
          <GrFormNextLink className="text-2xl" />
        </p>
      </div>

      <table className="text-left w-full table-auto">
        <thead className="bg-lightGrayHeader w-full flex text-gray-800">
          <tr className="flex w-full leading-normal font-bold uppercase text-sm px-4 gap-4 justify-between max-lg:hidden">
            <th className="py-4 w-[40%]">Ứng viên</th>
            <th className="py-4 w-[40%]">Tên công việc</th>
            <th className="py-4 w-[20%]">Ngày ứng tuyển</th>
          </tr>
          <tr className="flex w-full leading-normal font-bold uppercase text-sm px-4 gap-4 justify-between lg:hidden">
            <th className="py-4 w-full text-center">Danh sách ứng tuyển</th>
          </tr>
        </thead>

        <tbody className="flex flex-col   overflow-y-scroll h-max-[60vh] scrollbar-custom">
          {value?.map((item, index) => (
            <>
              <tr
                className="flex w-full hover:bg-gray-500/10 cursor-pointer border-t border-borderColor px-4 gap-2 justify-between max-lg:hidden"
                key={index}
              >
                <td className="py-4 w-[40%]">
                  <div className="flex items-center gap-4">
                    <img
                      className="object-cover w-10 h-10 rounded-full"
                      src={item.user?.image ? item.user?.image : NON_USER}
                      alt="logo"
                    />
                    <div>
                      <h2 className="text-base font-semibold text-gray-800 hover:text-orangetext cursor-pointer">
                        {item.user?.name}
                      </h2>
                      <p className="text-sm font-normal text-lightGray ">
                        {item.user?.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 w-[40%] my-auto">{item.name}</td>
                <td className="py-4 w-[20%] my-auto">{item.applyDate}</td>
              </tr>
              <tr
                className="w-full hover:bg-gray-500/10 cursor-pointer border-t border-borderColor px-4 gap-2 justify-between lg:hidden text-gray-700 py-2"
                key={index}
              >
                <div className="flex items-center gap-4">
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={item.user?.image ? item.user?.image : NON_USER}
                    alt="logo"
                  />
                  <div>
                    <h2 className="text-base font-semibold text-gray-800 hover:text-orangetext cursor-pointer">
                      {item.user?.name}
                    </h2>
                    <p className="text-sm font-normal text-lightGray ">
                      {item.user?.email}
                    </p>
                  </div>
                </div>
                <p className="mt-1.5">
                  Tên công việc:&nbsp;&nbsp;
                  <span className="text-lg font-semibold">{item.name}</span>
                </p>
                <p>
                  Ngày ứng tuyển:&nbsp;&nbsp;
                  <span className="text-lg font-semibold">
                    {item.applyDate}
                  </span>
                </p>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default StatisticsApplications;
