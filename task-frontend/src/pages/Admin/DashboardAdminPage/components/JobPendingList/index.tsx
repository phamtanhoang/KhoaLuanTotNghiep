import { GrFormNextLink } from "react-icons/gr";

interface JobPendingListProps {
  title?: string;
  link?: string;
  type?: string;
  value?: any[];
}
const JobPendingList: React.FC<JobPendingListProps> = ({
  title,
  link,
  type,
  value,
}) => {
  return (
    <div className="bg-white rounded-md border border-borderColor p-2.5 lg:p-5 shadow-md shadow-black/5">
      <div className="flex flex-wrap items-center py-2 pt-0 justify-between">
        <h3 className="font-semibold text-base text-gray-900">{title}</h3>
        <p className=" font-lato font-normal flex gap-2 text-lightGray hover:gap-3.5 hover:text-bgBlue transition-all duration-300 cursor-pointer">
          <span className="max-lg:hidden text-sm">Xem tất cả</span>{" "}
          <GrFormNextLink className="text-xl" />
        </p>
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead className="bg-lightGrayHeader w-full flex text-gray-800">
            <tr className="flex w-full leading-normal text-sm px-4 gap-2 justify-between max-lg:hidden">
              <th className="py-2 w-[45%] text-left">Tên công việc</th>
              <th className="py-2 w-[30%] text-left">Ngày đăng</th>
              <th className="py-2 w-[30%] text-left">Doanh nghiệp</th>
            </tr>
            <tr className="flex w-full leading-normal text-sm px-4 gap-2 justify-between lg:hidden">
              <th className="py-4 w-full text-center">Công việc</th>
            </tr>
          </thead>
          <tbody className="flex flex-col   overflow-y-scroll max-h-[60vh] lg:max-h-[50vh] scrollbar-custom w-full">
            {value?.map((item, index) => (
              <>
                <tr
                  className="flex w-full hover:bg-gray-500/10 cursor-pointer border-t border-borderColor px-4 gap-2 justify-between max-lg:hidden"
                  key={index}
                >
                  <td className="py-4 w-[45%] text-left">{item.title}</td>
                  <td className="py-4 w-[30%] text-left">{item.createDate}</td>
                  <td className="py-4 w-[30%] text-left">{item.createBy}</td>
                </tr>
                <tr
                  className="w-full hover:bg-gray-500/10 cursor-pointer border-t border-borderColor px-4 gap-2 justify-between lg:hidden text-gray-700 py-2"
                  key={index}
                >
                  <h2>
                    Tên công việc:&nbsp;&nbsp;
                    <span className="text-lg font-semibold">{item.title}</span>
                  </h2>
                  <p>
                    Ngày đăng:&nbsp;&nbsp;
                    <span className="text-lg font-semibold">
                      {item.createDate}
                    </span>
                  </p>
                  <p>
                    Doanh nghiệp:&nbsp;&nbsp;
                    <span className="text-lg font-semibold">
                      {item.createBy}
                    </span>
                  </p>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default JobPendingList;
