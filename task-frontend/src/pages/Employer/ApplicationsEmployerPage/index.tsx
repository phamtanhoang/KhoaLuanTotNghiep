import { ApplicationsTableMobile, ApplicationsTableWeb } from "./components";
import { Pagination, PaginationCustom } from "@/components/ui";
import { FiFilter } from "react-icons/fi";

import { SwalHelper } from "@/utils/helpers/swalHelper";
import { ModalConstants } from "@/utils/constants";
import ModalBase from "@/components/modal";
import { useContext, useEffect, useState } from "react";
import { ONCLEAR_FILTER } from "@/store/reducers/searchReducer";
import {
  CLEAR_PAGINATION_STATE,
  ONCHANGE_CURRENTPAGE,
  ONCHANGE_PAGINATION,
} from "@/store/reducers/paginationState";
import { useDispatch, useSelector } from "react-redux";
import { LoadingContext } from "@/App";
import applicationsService from "@/services/applicationsService";
import { ONCHANGE_APPLICATION_LIST } from "@/store/reducers/listDataReducer";

export interface ApplicationTableProps {
  value: ApplicationModel[];
  _onClickDetail: (item: ApplicationModel) => void;
  _onClickDelete: (item: ApplicationModel) => void;
  isLoading: boolean;
  isEmpty: boolean;
  currentPage: number;
  itemPerpage: number;
}

const ApplicationsEmployerPage = () => {
  const dispatch = useDispatch();
  const searchReducer = useSelector((state: any) => state.searchReducer);
  const { currentPage, itemPerPage, totalPages, isEmpty } = useSelector(
    (state: any) => state.paginationReducer
  );
  const { applications } = useSelector((state: any) => state.listDataReducer);

  const context = useContext(LoadingContext);

  const [isLoadingTable, setIsLoadingTable] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [id, setId] = useState<string>("");

  const _onClickFilter = () => {
    setFuncs(ModalConstants.COMMON_KEYS.filter);
    handleOpen();
  };

  const _onClickDelete = (item: ApplicationModel) => {
    SwalHelper.Confirm(
      "Xóa đơn ứng tuyển này?",
      "warning",
      () => {
        SwalHelper.BigAlert("That bai", "error");
      },
      () => {
        SwalHelper.MiniAlert("That bai", "error");
      }
    );
  };
  const _onClickDetail = (item: ApplicationModel) => {
    setId(item.id);
    setFuncs(ModalConstants.APPLICATION_KEYS.applycationDetail);
    handleOpen();
  };

  const fetchListData = () => {
    setIsLoadingTable(true);
    applicationsService
      .getApplications_Employer(
        searchReducer.keyword,
        searchReducer.status,
        currentPage - 1,
        itemPerPage
      )
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(ONCHANGE_APPLICATION_LIST(res.data.Data?.content || []));
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
  };

  useEffect(() => {
    dispatch(ONCLEAR_FILTER());
    dispatch(CLEAR_PAGINATION_STATE());
  }, []);

  useEffect(() => {
    fetchListData();
  }, [searchReducer.keyword, searchReducer.status, currentPage]);
  return (
    <>
      <ModalBase
        id={id}
        open={open}
        handleClose={handleClose}
        funcs={funcs}
        fetchData={fetchListData}
      />
      <div className="bg-white p-4 rounded relative w-full mt-8">
        <div className="-mt-12 flex justify-between relative p-4 lg:py-4 lg:px-8 place-items-center rounded-xl bg-orangetext bg-clip-border text-white shadow-md shadow-orange-500/40">
          <div className="items-center text-lg lg:text-2xl font-bold text-white">
            <h1 className="uppercase items-center text-center text-lg lg:text-xl flex font-bold w-full my-auto">
              Danh sách ứng tuyển
            </h1>
          </div>
          <div className="flex gap-3 lg:gap-5">
            <button
              className="inline-flex items-start justify-start text-white "
              onClick={_onClickFilter}
            >
              <FiFilter className="text-xl lg:text-2xl font-medium leading-none t my-auto" />
            </button>
          </div>
        </div>

        <div className="bg-white lg:px-4 rounded relative w-full  mt-2 lg:mt-5">
          <div className="max-lg:hidden">
            <ApplicationsTableWeb
              value={applications}
              _onClickDelete={_onClickDelete}
              _onClickDetail={_onClickDetail}
              isLoading={isLoadingTable}
              currentPage={currentPage}
              itemPerpage={itemPerPage}
              isEmpty={isEmpty}
            />
          </div>
          <div className="lg:hidden">
            <ApplicationsTableMobile
              value={applications}
              _onClickDelete={_onClickDelete}
              _onClickDetail={_onClickDetail}
              isLoading={isLoadingTable}
              currentPage={currentPage}
              itemPerpage={itemPerPage}
              isEmpty={isEmpty}
            />
          </div>
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
export default ApplicationsEmployerPage;
