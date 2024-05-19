import NON_USER from "@/assets/images/non-user.jpg";
import ModalBase from "@/components/modal";
import applicationsService from "@/services/applicationsService";
import { ModalConstants } from "@/utils/constants";
import { DateHelper, SwalHelper } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

const StatisticsApplications = () => {
  const [id, setId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [items, setItems] = useState<ApplicationModel[]>([]);
  const itemPerPage = 8;
  const [page, setPage] = useState<number>(0);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isLast, setIsLast] = useState<boolean>(false);
  const fetchListData = () => {
    applicationsService
      .getPending_Employer(page, itemPerPage)
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
    setFuncs(ModalConstants.APPLICATION_KEYS.applycationDetail);
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
        <h2 className="text-gray-800 text-lg lg:text-xl font-bold">
          Danh sách ứng tuyển chưa duyệt
        </h2>
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

      <table className="text-left w-full table-auto">
        <thead className="bg-lightGrayHeader w-full flex text-gray-800">
          <tr className="flex w-full leading-normal font-bold uppercase text-sm px-4 gap-4 justify-between max-lg:hidden">
            <th className="py-4 w-[10%]">STT</th>
            <th className="py-4 w-[30%]">Ứng viên</th>
            <th className="py-4 w-[40%]">Tên công việc</th>
            <th className="py-4 w-[20%]">Ngày ứng tuyển</th>
          </tr>
          <tr className="flex w-full leading-normal font-bold uppercase text-sm px-4 gap-4 justify-between lg:hidden">
            <th className="py-4 w-full text-center">Danh sách ứng tuyển</th>
          </tr>
        </thead>

        <tbody className="flex flex-col   overflow-y-scroll h-max-[60vh] scrollbar-custom">
          {items?.map((item: any, index) => (
            <>
              <tr
                className="flex w-full hover:bg-gray-500/10 cursor-pointer border-t border-borderColor px-4 gap-2 justify-between max-lg:hidden"
                key={index}
                onClick={() => {
                  _onClickDetail(item.id);
                }}
              >
                <td className="py-4 w-[10%] my-auto">
                  {page * itemPerPage + index + 1}
                </td>
                <td className="py-4 w-[30%]">
                  <div className="flex items-center gap-4">
                    <img
                      className="object-cover w-10 h-10 rounded-full"
                      src={
                        item.candidate?.avatar
                          ? item.candidate?.avatar
                          : NON_USER
                      }
                      alt="logo"
                    />
                    <div>
                      <h2 className="text-base font-semibold text-gray-800 hover:text-orangetext cursor-pointer">
                        {item.candidate?.firstName}&nbsp;
                        {item.candidate?.lastName}
                      </h2>
                      <p className="text-sm font-normal text-lightGray ">
                        {item.candidate?.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 w-[40%] my-auto">{item?.job?.name!}</td>
                <td className="py-4 w-[20%] my-auto">
                  {DateHelper.formatDateTime(item?.applyDate!)}
                </td>
              </tr>
              <tr
                className="w-full hover:bg-gray-500/10 cursor-pointer border-t border-borderColor px-4 gap-2 justify-between lg:hidden text-gray-700 py-2"
                key={index}
                onClick={() => {
                  _onClickDetail(item.id);
                }}
              >
                <div className="flex items-center gap-4">
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={
                      item.candidate?.avatar
                        ? item.candidate?.avatart
                        : NON_USER
                    }
                    alt="logo"
                  />
                  <div>
                    <h2 className="text-base font-semibold text-gray-800 hover:text-orangetext cursor-pointer">
                      {item.candidate?.firstName}&nbsp;
                      {item.candidate?.lastName}
                    </h2>
                    <p className="text-sm font-normal text-lightGray ">
                      {item.candidate?.email}
                    </p>
                  </div>
                </div>
                <p className="mt-1.5">
                  Tên công việc:&nbsp;&nbsp;
                  <span className=" font-semibold">{item?.job?.name!}</span>
                </p>
                <p>
                  Ngày ứng tuyển:&nbsp;&nbsp;
                  <span className=" font-semibold">
                    {DateHelper.formatDateTime(item?.applyDate!)}
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
