import { IoMdAddCircleOutline } from "react-icons/io";
import { HRTableMobile, HRTableWeb } from "./components";
import { Pagination } from "@/components/ui";
import { FiFilter } from "react-icons/fi";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import { useContext } from "react";
import { ModalController } from "@/App";
import Swal from "sweetalert2";

const sampleData = [
  {
    image: "",
    personName: "Phạm Tấn Hoàng",
    email: "phamtanhoang3202@gmail.com",
    permissions: ["Thêm", "Sửa", "Xóa"],
    createDate: "2024-03-01",
    state: "ACTIVE",
  },
  {
    image: "",
    personName: "Phạm Tấn Hoàng2",
    email: "phamtanhoang3202@gmail.com2",
    permissions: ["Thêm", "Sửa", "Xóa"],
    createDate: "2024-03-01",
    state: "PAUSE",
  },
  {
    image: "",
    personName: "Phạm Tấn Hoàng3",
    email: "phamtanhoang3202@gmail.com3",
    permissions: ["Thêm", "Sửa", "Xóa"],
    createDate: "2024-03-01",
    state: "PAUSE",
  },
  {
    image: "",
    personName: "Phạm Tấn Hoàng2",
    email: "phamtanhoang3202@gmail.com2",
    permissions: ["Thêm", "Sửa", "Xóa"],
    createDate: "2024-03-01",
    state: "PAUSE",
  },
  {
    image: "",
    personName: "Phạm Tấn Hoàng3",
    email: "phamtanhoang3202@gmail.com3",
    permissions: ["Thêm", "Sửa", "Xóa"],
    createDate: "2024-03-01",
    state: "ACTIVE",
  },
];
const HREmployerPage = () => {
  const context = useContext(ModalController);

  const _onClickFilter = () => {
    context.setFuncs(MODAL_KEYS.filter);
    context.handleOpen();
  };
  const _onClickDelete = () => {
    Swal.fire({
      icon: "warning",
      title: "Xóa nhân sự này?",
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
  const _onClickDetail = () => {};
  const _onClickAdd = () => {};
  return (
    <>
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
              value={sampleData}
              _onClickDelete={_onClickDelete}
              _onClickDetail={_onClickDetail}
            />
          </div>
          <div className="lg:hidden">
            <HRTableMobile
              value={sampleData}
              _onClickDelete={_onClickDelete}
              _onClickDetail={_onClickDetail}
            />
          </div>
        </div>

        <div className="w-max mx-auto mt-5">
          <Pagination />
        </div>
      </div>
    </>
  );
};
export default HREmployerPage;
