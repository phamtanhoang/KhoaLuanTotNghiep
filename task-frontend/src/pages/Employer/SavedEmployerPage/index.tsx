import ModalBase from "@/components/modal";
import { PaginationCustom } from "@/components/ui";
import { candidatesService } from "@/services";
import {
  ONCHANGE_CURRENTPAGE,
  ONCHANGE_PAGINATION,
} from "@/store/reducers/paginationState";
import { ModalConstants } from "@/utils/constants";
import { AuthHelper, SwalHelper } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../FindCandidatePage/components";

const SavedEmployerPage = () => {
  const dispatch = useDispatch();
  const { currentPage, itemPerPage, totalPages, isEmpty } = useSelector(
    (state: any) => state.paginationReducer
  );

  const [id, setId] = useState<string>("");
  const [isLoadingTable, setIsLoadingTable] = useState<boolean>(false);

  const [candidates, setCandidates] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fetchListData = () => {
    if (AuthHelper?.isEmployer()) {
      setIsLoadingTable(true);
      candidatesService
        .getSavedEmployer_Employer(currentPage - 1, itemPerPage)
        .then((res) => {
          if (res.status === 200 && res.data.Status === 200) {
            setCandidates(res.data.Data?.content || []);
            dispatch(ONCHANGE_PAGINATION(res.data.Data));
          } else {
            SwalHelper.MiniAlert(res.data.Message, "error");
          }
        })
        .catch(() => {
          SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
        })
        .finally(() => {
          setIsLoadingTable(false);
        });
    } else {
      setIsLoadingTable(true);
      candidatesService
        .getSavedEmployer_HR(currentPage - 1, itemPerPage)
        .then((res) => {
          if (res.status === 200 && res.data.Status === 200) {
            setCandidates(res.data.Data?.content || []);
            dispatch(ONCHANGE_PAGINATION(res.data.Data));
          } else {
            SwalHelper.MiniAlert(res.data.Message, "error");
          }
        })
        .catch(() => {
          SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
        })
        .finally(() => {
          setIsLoadingTable(false);
        });
    }
  };
  useEffect(() => {
    fetchListData();
  }, [currentPage]);
  const _onClickDetail = (item: any) => {
    setId(item?.id!);
    setFuncs(ModalConstants.CANDIDATE_KEYS.candidateCV);
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
      <div className="relative w-full flex flex-col gap-4 max-lg:px-3">
        <div className="">
          <h1 className="text-xl font-semibold text-gray-700 uppercase">
            Danh sách ứng viên đã lưu
          </h1>
        </div>

        <div className="overflow-auto border border-borderColor lg:rounded-[4px]">
          <Table
            value={candidates}
            _onClickDetail={_onClickDetail}
            isLoading={isLoadingTable}
            isEmpty={isEmpty}
          />
        </div>
        <div className="w-max mx-auto mt-5">
          <PaginationCustom
            currentPage={currentPage}
            setCurrentPage={(page: number) =>
              dispatch(ONCHANGE_CURRENTPAGE(page))
            }
            totalPages={totalPages}
            type={true}
          />
        </div>
      </div>
    </>
  );
};
export default SavedEmployerPage;
