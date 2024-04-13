import { LoadingContext } from "@/App";
import ModalBase from "@/components/modal";
import { PaginationCustom } from "@/components/ui";
import candidatesService from "@/services/candidatesService";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CandidateTableAdminWeb } from "./components";

const CandidateAdminPage = () => {
  const context = useContext(LoadingContext);

  const [open, setOpen] = useState(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [id, setId] = useState<string>("");
  const [isLoadingTable, setIsLoadingTable] = useState<boolean>(false);
  const [keyWord, setKeyWord] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemPerpage = 10;
  const [totalElements, setTotalElements] = useState<number>(0);
  const [numberOfElements, setNumberOfElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [candidates, setCandidates] = useState<CandidateModel[]>([]);

  const _onClickDelete = (item: CandidateModel) => {
    SwalHelper.Confirm(
      "Xác nhận xóa tài khoàn này?",
      "question",
      () => {
        context.handleOpenLoading();
        candidatesService
          .delete(item.id)
          .then((res) => {
            if (res.status === 200 && res.data.Status === 200) {
              SwalHelper.MiniAlert(res.data.Message, "success");
              fetchListData();
            } else {
              SwalHelper.MiniAlert(res.data.Message, "error");
            }
          })
          .catch(() => {
            SwalHelper.MiniAlert("Có lỗi xảy ra", "error");
          })
          .finally(() => {
            context.handleCloseLoading();
          });
      },
      () => {}
    );
  };
  const _onClickDetail = (item: CandidateModel) => {
    setId(item.id);
    setFuncs(MODAL_KEYS.updateEmployer);
    handleOpen();
  };

  const _onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "";
    setKeyWord(value);
  };

  const _onChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || "";
    setStatus(value);
  };

  const fetchListData = () => {
    setIsLoadingTable(true);
    candidatesService
      .getList(keyWord, status, currentPage - 1, itemPerpage)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setCandidates(res?.data?.Data?.content);
          setTotalPages(res?.data?.Data?.totalPages);
          setTotalElements(res?.data?.Data?.totalElements || 0);
          setNumberOfElements(res?.data?.Data?.numberOfElements || 0);
        } else {
          SwalHelper.MiniAlert(res.data.Message, "error");
        }
      })
      .catch(() => {
        SwalHelper.MiniAlert("Có lỗi xảy ra", "error");
      })
      .finally(() => {
        setIsLoadingTable(false);
      });
  };

  useEffect(() => {
    fetchListData();
  }, [keyWord, status, currentPage]);

  return (
    <>
      <ModalBase
        id={id}
        open={open}
        handleClose={handleClose}
        funcs={funcs}
        setFuncs={setFuncs}
        fetchData={fetchListData}
      />

      <section className="flex flex-col gap-2">
        <div className="flex justify-between gap-2 lg:gap-4">
          <h1 className="text-2xl font-semibold text-gray-700">
            Tài khoản ứng viên
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row-reverse lg:items-center lg:justify-between gap-2">
          <div className="relative flex items-center">
            <span className="absolute">
              <CiSearch className="mx-3 text-gray-400 text-lg" />
            </span>

            <input
              type="text"
              placeholder="Nhập từ khóa..."
              className="block w-full py-2 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg lg:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-bgBlue focus:ring-bgBlue/20 focus:outline-none focus:ring focus:ring-opacity-40"
              value={keyWord}
              onChange={_onChangeKeyword}
            />
          </div>
          <div className="font-medium text-sm text-black">
            <p>Tổng cộng: {totalElements} (tài khoản)</p>
            <p>Trang hiện tại: {numberOfElements} (tài khoản)</p>
          </div>
        </div>
      </section>
      <div className="overflow-auto border border-borderColor lg:rounded-lg  mt-2 lg:mt-4">
        <CandidateTableAdminWeb
          value={candidates}
          _onClickDelete={_onClickDelete}
          _onClickDetail={_onClickDetail}
          _onChangeStatus={_onChangeStatus}
          status={status}
          isLoading={isLoadingTable}
          currentPage={currentPage}
          itemPerpage={itemPerpage}
        />
      </div>
      <div className="w-max mx-auto mt-5">
        <PaginationCustom
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          type={true}
        />
      </div>
    </>
  );
};
export default CandidateAdminPage;
