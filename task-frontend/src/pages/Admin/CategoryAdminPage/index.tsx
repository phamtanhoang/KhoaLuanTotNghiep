import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { LoadingSpiner, PaginationCustom } from "@/components/ui";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import { categoriesService } from "@/services";
import ModalBase from "@/components/modal";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import CategoryTableAdminWeb from "./components/CategoryTableAdminWeb";
import { LoadingContext } from "@/App";

const CategoryAdminPage = () => {
  const context = useContext(LoadingContext);

  const [id, setId] = useState<string>("");
  const [isLoadingTable, setIsLoadingTable] = useState<boolean>(false);
  const [keyWord, setKeyWord] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemPerpage = 10;
  const [totalElements, setTotalElements] = useState<number>(0);
  const [numberOfElements, setNumberOfElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const [open, setOpen] = useState(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const _onClickAdd = () => {
    setFuncs(MODAL_KEYS.createCategory);
    handleOpen();
  };
  const _onClickDelete = (item: CategoryModel) => {
    SwalHelper.Confirm(
      "Xác nhận xóa danh mục này?",
      "question",
      () => {
        context.handleOpenLoading();
        categoriesService
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
            SwalHelper.MiniAlert("Có lỗi xảy ra", "error");
          })
          .finally(() => {
            context.handleCloseLoading();
          });
      },
      () => {}
    );
  };
  const _onClickDetail = (item: CategoryModel) => {
    setId(item.id);
    setFuncs(MODAL_KEYS.updateCategory);
    handleOpen();
  };

  const _onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "";
    setKeyWord(value);
  };

  const fetchListData = () => {
    setIsLoadingTable(true);
    categoriesService
      .getList(keyWord, currentPage - 1, itemPerpage)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setCategories(res?.data?.Data?.content);
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
  }, [keyWord, currentPage]);

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
            Danh sách danh mục
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
              onChange={_onChangeKeyword}
            />
          </div>
          <div className="font-medium text-sm text-black">
            <p>Tổng cộng: {totalElements} (danh mục)</p>
            <p>Trang hiện tại: {numberOfElements} (danh mục)</p>
          </div>
        </div>
      </section>

      <div className="overflow-auto border border-borderColor lg:rounded-lg  mt-2 lg:mt-4">
        {/* <div className="max-lg:hidden"> */}
        <CategoryTableAdminWeb
          value={categories}
          _onClickDelete={_onClickDelete}
          _onClickDetail={_onClickDetail}
          isLoading={isLoadingTable}
        />
        {/* </div>
        <div className="lg:hidden">
          <TagTableAdminMobile
            value={tags}
            _onClickDelete={_onClickDelete}
            _onClickDetail={_onClickDetail}
            isLoading={isLoadingTable}
          />
        </div> */}
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
export default CategoryAdminPage;
