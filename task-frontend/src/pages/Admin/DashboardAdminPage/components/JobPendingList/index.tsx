import ModalBase from "@/components/modal";
import { ListEmpty } from "@/components/ui";
import { jobsService } from "@/services";
import { ModalConstants } from "@/utils/constants";
import { DateHelper, SwalHelper } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

interface JobPendingListProps {
  title?: string;
}
const JobPendingList: React.FC<JobPendingListProps> = ({ title }) => {
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
    jobsService
      .getPendingJob_Admin(page, itemPerPage)
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
  };
  useEffect(() => {
    fetchListData();
  }, [page]);
  const _onClickDetail = (id: string) => {
    setId(id);
    setFuncs(ModalConstants.JOB_KEYS.detailJobAdmin);
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
      <div className="bg-white rounded-md border border-borderColor p-2.5 lg:p-5 shadow-md shadow-black/5">
        <div className="flex flex-wrap items-center py-2 pt-0 justify-between">
          <h3 className="font-semibold text-base text-gray-900">{title}</h3>
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
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="bg-lightGrayHeader w-full flex text-gray-800">
              <tr className="flex w-full leading-normal text-sm px-4 gap-2 justify-between max-lg:hidden">
                <th className="py-2 w-[35%] text-left">Tên công việc</th>
                <th className="py-2 w-[30%] text-left">Ngày đăng</th>
                <th className="py-2 w-[35%] text-left">Nhà tuyển dụng</th>
              </tr>
              <tr className="flex w-full leading-normal text-sm px-4 gap-2 justify-between lg:hidden">
                <th className="py-4 w-full text-center">Công việc</th>
              </tr>
            </thead>
            <tbody className="flex flex-col   overflow-y-scroll max-h-[60vh] lg:max-h-[50vh] scrollbar-custom w-full">
              {items.length > 0 ? (
                <>
                  {items?.map((item: any, index) => (
                    <>
                      <tr
                        className="text-sm flex w-full hover:bg-gray-500/10 cursor-pointer border-t border-borderColor px-4 gap-2 justify-between max-lg:hidden"
                        key={index}
                        onClick={() => {
                          _onClickDetail(item.id);
                        }}
                      >
                        <td className="py-4 w-[35%] text-left">{item.name}</td>
                        <td className="py-4 w-[30%] text-left">
                          {DateHelper.formatDateTime(item.created)}
                        </td>
                        <td className="py-4 w-[35%] text-left">
                          {item.employer?.name}
                        </td>
                      </tr>
                      <tr
                        className="w-full hover:bg-gray-500/10 cursor-pointer border-t border-borderColor px-4 gap-2 justify-between lg:hidden text-gray-700 py-2"
                        key={index}
                        onClick={() => {
                          _onClickDetail(item.id);
                        }}
                      >
                        <h2>
                          Tên công việc:&nbsp;&nbsp;
                          <span className="font-medium">{item.name}</span>
                        </h2>
                        <p>
                          Ngày đăng:&nbsp;&nbsp;
                          <span className="font-medium">{item.created}</span>
                        </p>
                        <p>
                          Doanh nghiệp:&nbsp;&nbsp;
                          <span className="font-medium">
                            {item.employer?.name}
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
        </div>
      </div>
    </>
  );
};
export default JobPendingList;
