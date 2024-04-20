import { IoMdAddCircleOutline } from "react-icons/io";
import { HRTableMobile, HRTableWeb } from "./components";
import { Pagination, PaginationCustom } from "@/components/ui";
import { FiFilter } from "react-icons/fi";

import Swal from "sweetalert2";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "@/App";
import humanResourcesService from "@/services/humanResourcesService";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import ModalBase from "@/components/modal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ONCLEAR_FILTER } from "@/store/reducers/searchReducer";

const HREmployerPage = () => {
  const context = useContext(LoadingContext);
  const searchReducer = useSelector((state: any) => state.searchReducer);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoadingTable, setIsLoadingTable] = useState<boolean>(false);

  const [open, setOpen] = useState(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [id, setId] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemPerpage = 10;

  const [totalPages, setTotalPages] = useState<number>(0);
  const [humanResources, setHumanResources] = useState<HumanResourceModel[]>(
    []
  );

  useEffect(() => {
    dispatch(ONCLEAR_FILTER());
  }, [location]);

  const _onClickFilter = () => {
    setFuncs(MODAL_KEYS.filter);
    handleOpen();
  };
  const _onClickDelete = (item: HumanResourceModel) => {
    SwalHelper.Confirm(
      "Xác nhận xóa tài khoản này?",
      "question",
      () => {
        context.handleOpenLoading();
        humanResourcesService
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

  const _onClickDetail = (item: HumanResourceModel) => {
    setId(item.id);
    setFuncs(MODAL_KEYS.updateHumanResource);
    handleOpen();
  };

  const _onClickAdd = () => {
    setFuncs(MODAL_KEYS.createHumanResource);
    handleOpen();
  };

  const fetchListData = () => {
    setIsLoadingTable(true);
    humanResourcesService
      .getList(
        searchReducer.keyword,
        searchReducer.status,
        currentPage - 1,
        itemPerpage
      )
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setHumanResources(res?.data?.Data?.content);
          setTotalPages(res?.data?.Data?.totalPages);
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
  }, [searchReducer.keyword, searchReducer.status, currentPage]);
  return (
    <>
      <ModalBase
        id={id}
        open={open}
        handleClose={handleClose}
        funcs={funcs}
        fetchData={fetchListData}
        setFuncs={setFuncs}
      />
      <div className="bg-white p-4 rounded relative w-full mt-8">
        <div className="-mt-12 flex justify-between relative p-4 lg:py-4 lg:px-8 place-items-center rounded-xl bg-orangetext bg-clip-border text-white shadow-md shadow-orange-500/40">
          <div className="items-center text-lg lg:text-2xl font-bold text-white">
            <h1 className="uppercase items-center text-center text-lg lg:text-xl flex font-bold w-full my-auto">
              Danh sách nhân sự
            </h1>
          </div>
          <div className="flex gap-3 lg:gap-5">
            <button
              className="inline-flex items-start justify-start text-white "
              onClick={_onClickFilter}
            >
              <FiFilter className="text-xl lg:text-2xl font-medium leading-none t my-auto" />
            </button>
            <button
              className="inline-flex items-start justify-start text-white "
              onClick={_onClickAdd}
            >
              <IoMdAddCircleOutline className="text-2xl lg:text-3xl font-medium leading-none t my-auto" />
            </button>
          </div>
        </div>

        <div className="bg-white lg:px-4 rounded relative w-full  mt-2 lg:mt-5">
          <div className="max-lg:hidden">
            <HRTableWeb
              value={humanResources}
              _onClickDelete={_onClickDelete}
              _onClickDetail={_onClickDetail}
              isLoading={isLoadingTable}
              currentPage={currentPage}
              itemPerpage={itemPerpage}
            />
          </div>
          <div className="lg:hidden">
            <HRTableMobile
              value={humanResources}
              _onClickDelete={_onClickDelete}
              _onClickDetail={_onClickDetail}
              isLoading={isLoadingTable}
              currentPage={currentPage}
              itemPerpage={itemPerpage}
            />
          </div>
        </div>

        <div className="w-max mx-auto mt-5">
          <PaginationCustom
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            type={true}
          />
        </div>
      </div>
    </>
  );
};
export default HREmployerPage;
