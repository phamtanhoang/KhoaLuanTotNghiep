import { ModalController } from "@/App";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import Swal from "sweetalert2";
import { CategoryTableAdmin } from "./components";
import { Pagination } from "@/components/ui";

const exampleData = [
  { id: 1, name: "Danh mục 1" },
  { id: 2, name: "Danh mục 2" },
  { id: 3, name: "Danh mục 3" },
  { id: 1, name: "Danh mục 1" },
  { id: 2, name: "Danh mục 2" },
  { id: 3, name: "Danh mục 3" },
  { id: 1, name: "Danh mục 1" },
  { id: 2, name: "Danh mục 2" },
  { id: 3, name: "Danh mục 3" },
  { id: 1, name: "Danh mục 1" },
  { id: 2, name: "Danh mục 2" },
  { id: 3, name: "Danh mục 3" },
  { id: 1, name: "Danh mục 1" },
  { id: 2, name: "Danh mục 2" },
  { id: 3, name: "Danh mục 3" },
  { id: 1, name: "Danh mục 1" },
  { id: 2, name: "Danh mục 2" },
  { id: 3, name: "Danh mục 3" },
  { id: 1, name: "Danh mục 1" },
  { id: 2, name: "Danh mục 2" },
  { id: 3, name: "Danh mục 3" },
];

const CategoryAdminPage = () => {
  const context = useContext(ModalController);

  const _onClickFilter = () => {
    context.setFuncs(MODAL_KEYS.filter);
    context.handleOpen();
  };
  const _onClickDetail = (item: any) => {};

  const _onClickDelete = (item: any) => {
    Swal.fire({
      icon: "warning",
      title: "Xóa danh mục này?",
      showCancelButton: true,
      cancelButtonText: "Hủy bỏ",
      confirmButtonText: "Đồng ý",

      customClass: {
        confirmButton: "confirm-button-class",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      } else if (result.isDismissed) {
      }
    });
  };
  return (
    <>
      <div className="lg:flex justify-between">
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-700">
          Danh sách danh mục
        </h1>
        <div className="flex items-center justify-end gap-3 mt-3 lg:mt-0">
          <button
            type="button"
            className="text-white bg-bgBlue hover:bg-bgBlue/85 focus:ring-4 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
            onClick={_onClickFilter}
          >
            <FiFilter className="text-base mr-2" />
            Lọc
          </button>
          <button
            type="button"
            className="text-white bg-green-500 hover:bg-green-500/85 focus:ring-4 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
            // onClick={() => setShowBoxAddCategory(true)}
          >
            <AiOutlinePlus className="text-lg mr-2" />
            Thêm mới
          </button>
        </div>
      </div>

      <div className="overflow-hidden border border-borderColor lg:rounded-lg  mt-5">
        <CategoryTableAdmin
          value={exampleData}
          _onClickDelete={_onClickDelete}
          _onClickDetail={_onClickDetail}
        />
      </div>
      <div className="w-max mx-auto mt-5">
        <Pagination type={true} />
      </div>
    </>
  );
};
export default CategoryAdminPage;
