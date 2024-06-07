import ModalBase from "@/components/modal";
import { ListEmpty } from "@/components/ui";
import { jobsService } from "@/services";
import { ModalConstants } from "@/utils/constants";
import { DateHelper, SwalHelper } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

interface StatisticsJobsProps {
  title?: string;

  type?: boolean;
}
const StatisticsJobs: React.FC<StatisticsJobsProps> = ({ title, type }) => {
  const [id, setId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [items, setItems] = useState<ApplicationModel[]>([]);
  const itemPerPage = 6;
  const [page, setPage] = useState<number>(0);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isLast, setIsLast] = useState<boolean>(false);
  const fetchListData = () => {
    if (type) {
      jobsService
        .getActiveJob(page, itemPerPage)
        .then((res) => {
          if (res.status === 200 && res.data.Status === 200) {
            setItems(res.data.Data.content || []);
            setIsFirst(res.data.Data.first);
            setIsLast(res.data.Data.last);
          } else {
            SwalHelper.MiniAlert(res.data.Message, "error");
          }
        })
        .catch(() => {
          SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
        })
        .finally(() => {});
    } else {
      jobsService
        .getPendingJob(page, itemPerPage)
        .then((res) => {
          if (res.status === 200 && res.data.Status === 200) {
            setItems(res.data.Data.content || []);
            setIsFirst(res.data.Data.first);
            setIsLast(res.data.Data.last);
          } else {
            SwalHelper.MiniAlert(res.data.Message, "error");
          }
        })
        .catch(() => {
          SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
        })
        .finally(() => {});
    }
  };
  useEffect(() => {
    fetchListData();
  }, [page]);
  const _onClickDetail = (id: string) => {
    setId(id);
    setFuncs(ModalConstants.JOB_KEYS.detailJob);
    handleOpen();
  };

  return (
    <>
      <ModalBase
        id={id}
        open={open}
        handleClose={handleClose}
        funcs={funcs}
        fetchData={fetchListData}
      />
      <div className="justify-between flex  pb-4">
        <h2 className="text-gray-800 text-lg lg:text-xl font-bold">{title}</h2>
        <div className="flex gap-3">
          {!isFirst && (
            <p
              className=" font-lato font-normal flex gap-2 text-lightGray hover:gap-3.5 hover:text-orangetext transition-all duration-300 cursor-pointer border-2 rounded-full border-lightGray hover:border-orangetext"
              onClick={() => setPage(page - 1)}
            >
              <GrFormPreviousLink className="text-2xl" />
            </p>
          )}
          {!isLast && (
            <p
              className=" font-lato font-normal flex gap-2 text-lightGray hover:gap-3.5 hover:text-orangetext transition-all duration-300 cursor-pointer border-2 rounded-full border-lightGray hover:border-orangetext"
              onClick={() => setPage(page + 1)}
            >
              <GrFormNextLink className="text-2xl" />
            </p>
          )}
        </div>
      </div>
      <div className="rounded-lg"></div>
      <table className="text-left w-full table-auto ">
        <thead className="bg-lightGrayHeader w-full flex text-gray-800">
          <tr className="flex w-full leading-normal font-medium uppercase text-sm px-4 gap-4 justify-between max-lg:hidden">
            <th className="py-3 w-[40%]">Tên công việc</th>
            <th className="py-3 w-[30%]">Ngày đăng</th>
            <th className="py-3 w-[30%]">Thời hạn</th>
          </tr>
          <tr className="flex w-full leading-normal font-medium uppercase text-sm px-4 gap-4 justify-between lg:hidden">
            <th className="py-3 w-full text-center">Công việc</th>
          </tr>
        </thead>

        <tbody className="flex flex-col   overflow-y-scroll  scrollbar-custom">
          {items.length > 0 ? (
            <>
              {items?.map((item: any, index) => (
                <>
                  <tr
                    className="text-sm flex w-full hover:bg-gray-500/10 cursor-pointer border-t border-borderColor px-4 gap-2 justify-between max-lg:hidden"
                    key={index}
                    onClick={() => _onClickDetail(item.id!)}
                  >
                    <td className="py-3 w-[40%]">{item.name!}</td>
                    <td className="py-3 w-[30%]">
                      {DateHelper.formatDateTime(item.created!)}
                    </td>
                    <td className="py-3 w-[30%]">
                      {DateHelper.formatDateTime(item.toDate!)}
                    </td>
                  </tr>
                  <tr
                    className="w-full hover:bg-gray-500/10 cursor-pointer border-t border-borderColor px-4 gap-2 justify-between lg:hidden text-gray-700 py-2"
                    key={index}
                    onClick={() => _onClickDetail(item.id!)}
                  >
                    <h2>
                      Tên công việc:&nbsp;&nbsp;
                      <span className="font-semibold">{item.name!}</span>
                    </h2>
                    <p>
                      Ngày đăng tuyển:&nbsp;&nbsp;
                      <span className="font-semibold">
                        {DateHelper.formatDateTime(item.created!)}
                      </span>
                    </p>
                    <p>
                      Thời hạn:&nbsp;&nbsp;
                      <span className=" font-semibold">
                        {DateHelper.formatDateTime(item.toDate!)}
                      </span>
                    </p>
                  </tr>
                </>
              ))}
            </>
          ) : (
            <tr className="bg-white text-center flex justify-center">
              <td className="pt-5 whitespace-no-wrap " colSpan={3}>
                <ListEmpty />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default StatisticsJobs;
