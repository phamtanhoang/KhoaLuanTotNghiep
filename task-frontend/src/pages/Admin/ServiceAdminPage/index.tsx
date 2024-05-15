import { LoadingContext } from "@/App";
import ModalBase from "@/components/modal";
import {
  CLEAR_PAGINATION_STATE,
  ONCHANGE_CURRENTPAGE,
  ONCHANGE_PAGINATION,
} from "@/store/reducers/paginationState";
import { ModalConstants } from "@/utils/constants";
import { SwalHelper } from "@/utils/helpers";
import { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "./components";
import { PaginationCustom } from "@/components/ui";
import vipsService from "@/services/vipsService";
import { ONCHANGE_VIP_LIST } from "@/store/reducers/listDataReducer";

const ServiceAdminPage = () => {
  const dispatch = useDispatch();
  const {
    totalElements,
    currentPage,
    itemPerPage,
    totalPages,
    isEmpty,
    numberOfElements,
  } = useSelector((state: any) => state.paginationReducer);
  const { vips } = useSelector((state: any) => state.listDataReducer);
  const context = useContext(LoadingContext);

  const [id, setId] = useState<string>("");
  const [isLoadingTable, setIsLoadingTable] = useState<boolean>(false);
  const [keyWord, setKeyWord] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const [open, setOpen] = useState(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const _onClickAdd = () => {
    setFuncs(ModalConstants.VIP_KEYS.createVip);
    handleOpen();
  };

  const _onClickDelete = (item: VipModel) => {
    SwalHelper.Confirm(
      "Xác nhận xóa dịch vụ này?",
      "question",
      () => {
        context.handleOpenLoading();
        vipsService
          .deleteById(item.id)
          .then((res) => {
            if (res.status === 200 && res.data.Status === 200) {
              SwalHelper.MiniAlert(res.data.Message, "success");
              fetchListData();
            } else {
              SwalHelper.MiniAlert(res.data.Message, "error");
            }
          })
          .catch(() => {
            SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
          })
          .finally(() => {
            context.handleCloseLoading();
          });
      },
      () => {}
    );
  };

  const _onClickDetail = (item: VipModel) => {
    setId(item.id);
    setFuncs(ModalConstants.VIP_KEYS.updateVip);
    handleOpen();
  };

  const fetchListData = () => {
    setIsLoadingTable(true);
    vipsService
      .getListByAdmin(keyWord, status, currentPage - 1, itemPerPage)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(ONCHANGE_VIP_LIST(res.data.Data?.content || []));
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
    dispatch(CLEAR_PAGINATION_STATE());
  }, []);

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
            Danh sách dịch vụ
          </h1>
          <button
            className="flex items-center justify-center p-1.5 lg:px-5 lg:py-2 tracking-wide text-white transition-colors duration-200 bg-bgBlue/90 rounded-lg shrink-0 hover:bg-bgBlue gap-2 w-max"
            onClick={_onClickAdd}
          >
            <MdOutlineAddCircleOutline className="text-xl" />
            <span className="font-[450] max-lg:hidden">Thêm mới</span>
          </button>
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
              onChange={(e) => setKeyWord(e.target.value)}
            />
          </div>
          <div className="font-medium text-sm text-black">
            <p>Tổng cộng: {totalElements} (dịch vụ)</p>
            <p>Trang hiện tại: {numberOfElements} (dịch vụ)</p>
          </div>
        </div>
      </section>
      <div className="overflow-auto border border-borderColor lg:rounded-lg  mt-2 lg:mt-4">
        <Table
          value={vips}
          _onClickDelete={_onClickDelete}
          _onClickDetail={_onClickDetail}
          status={status}
          setStatus={setStatus}
          isLoading={isLoadingTable}
          currentPage={currentPage}
          itemPerpage={itemPerPage}
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
          type={false}
        />
      </div>
    </>
  );
};
export default ServiceAdminPage;
