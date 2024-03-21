import { GrFormNextLink } from "react-icons/gr";
interface JobItem {
  name: string;
  createDate: string;
  createBy: string;
}

interface StatisticsJobsProps {
  title?: string;
  link?: string;
  type?: string;
  value?: JobItem[];
}
const StatisticsJobs: React.FC<StatisticsJobsProps> = ({
  title,
  link,
  type,
  value,
}) => {
  return (
    <>
      <div className="justify-between flex  pb-4">
        <h2 className="text-gray-800 text-lg lg:text-xl font-bold">{title}</h2>
        <p className=" font-lato font-normal flex gap-2 text-lightGray hover:gap-3.5 hover:text-orangetext transition-all duration-300 cursor-pointer">
          <span className="max-lg:hidden">Xem tất cả</span>{" "}
          <GrFormNextLink className="text-2xl" />
        </p>
      </div>
      <div className="rounded-lg"></div>
      <table className="text-left w-full table-auto ">
        <thead className="bg-lightGrayHeader w-full flex text-gray-800">
          <tr className="flex w-full leading-normal font-bold uppercase text-sm px-4 gap-4 justify-between max-lg:hidden">
            <th className="py-4 w-[45%]">Tên công việc</th>
            <th className="py-4 w-[20%]">Ngày đăng</th>
            <th className="py-4 w-[35%]">Người đăng</th>
          </tr>
          <tr className="flex w-full leading-normal font-bold uppercase text-sm px-4 gap-4 justify-between lg:hidden">
            <th className="py-4 w-full text-center">Công việc</th>
          </tr>
        </thead>

        <tbody className="flex flex-col   overflow-y-scroll h-[60vh] lg:h-[50vh] scrollbar-custom">
          {value?.map((item, index) => (
            <>
              <tr
                className="flex w-full hover:bg-gray-500/10 cursor-pointer border-t border-borderColor px-4 gap-2 justify-between max-lg:hidden"
                key={index}
              >
                <td className="py-4 w-[45%]">{item.name}</td>
                <td className="py-4 w-[20%]">{item.createDate}</td>
                <td className="py-4 w-[35%]">{item.createBy}</td>
              </tr>
              <tr
                className="w-full hover:bg-gray-500/10 cursor-pointer border-t border-borderColor px-4 gap-2 justify-between lg:hidden text-gray-700 py-2"
                key={index}
              >
                <h2>
                  Tên công việc:&nbsp;&nbsp;
                  <span className="text-lg font-semibold">{item.name}</span>
                </h2>
                <p>
                  Ngày đăng tuyển:&nbsp;&nbsp;
                  <span className="text-lg font-semibold">
                    {item.createDate}
                  </span>
                </p>
                <p>
                  Người đăng tuyển:&nbsp;&nbsp;
                  <span className="text-lg font-semibold">{item.createBy}</span>
                </p>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default StatisticsJobs;
