import { LoadingContext } from "@/App";
import vipsService from "@/services/vipsService";
import { ONCHANGE_TRASACTION_SINGLE } from "@/store/reducers/singleDataReducer";
import { AuthHelper, DateHelper, SwalHelper } from "@/utils/helpers";
import { useContext, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdExit } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const DetailTransaction = (props: any) => {
  const handleClose = props.handleClose;
  const id = props.id;
  const context = useContext(LoadingContext);
  const dispatch = useDispatch();
  const { trasaction } = useSelector((state: any) => state.singleDataReducer);

  useEffect(() => {
    context.handleOpenLoading();
    AuthHelper.isAdmin()
      ? vipsService
          .getTrasactionDetail_Admin(id)
          .then((res) => {
            if (res.status === 200 && res.data.Status === 200) {
              dispatch(ONCHANGE_TRASACTION_SINGLE(res.data.Data || []));
            } else {
              SwalHelper.MiniAlert(res.data.Message, "error");
            }
          })
          .catch(() => {
            SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
          })
          .finally(() => {
            context.handleCloseLoading();
          })
      : vipsService
          .getTrasactionDetail_Employer(id)
          .then((res) => {
            if (res.status === 200 && res.data.Status === 200) {
              dispatch(ONCHANGE_TRASACTION_SINGLE(res.data.Data || []));
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
  }, []);
  return (
    <>
      <div className="md:w-[50%] xl:w-[35%] w-screen bg-white relative lg:rounded">
        <div
          className={`flex justify-between gap-4 px-4 py-3 text-white border-b lg:rounded-t ${
            AuthHelper.isAdmin() ? " bg-bgBlue" : "bg-orangetext"
          }`}
        >
          <h2 className="text-xl font-medium  line-clamp-1 my-auto">
            Chi tiết giao dịch
          </h2>
          <button
            className={`p-1 rounded-md text-lg  hover:bg-white ${
              AuthHelper.isAdmin()
                ? " hover:text-bgBlue"
                : "hover:text-orangetext"
            }`}
            onClick={handleClose}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="overflow-auto scrollbar-custom h-max max-h-[75vh] my-4 ">
          <div className="mx-4 text-gray-700 flex flex-col gap-2">
            <p className="font-semibold text-black bg-body2 pl-1 pr-1 pt-1.5 pb-1.5 rounded-sm shadow-sm w-full truncate">
              Mã giao dịch - {trasaction?.invoice_id}
            </p>
            <div className="content-center">
              <label className="font-medium tracking-wide text-sm">
                Tên dịch vụ
              </label>
              <input
                className="w-full content-center  p-2 mt-1 border rounded focus:outline-none"
                type="text"
                value={trasaction?.vip?.name}
                disabled
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-2 lg:gap-4">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Ngày giao dịch
                </label>
                <input
                  className="w-full content-center  p-2 mt-1 border rounded focus:outline-none "
                  type="text"
                  value={
                    trasaction?.created
                      ? DateHelper.formatDateTime(trasaction?.created)
                      : ""
                  }
                  disabled
                />
              </div>
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Giá tiền
                </label>
                <input
                  className="w-full content-center  p-2 mt-1 border rounded focus:outline-none"
                  type="text"
                  value={`${trasaction?.price?.toLocaleString()} VNĐ`}
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-2 lg:gap-4">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Từ ngày
                </label>
                <input
                  className="w-full content-center  p-2 mt-1 border rounded focus:outline-none"
                  type="text"
                  value={
                    trasaction?.toDate
                      ? DateHelper.formatDateTime(trasaction?.fromDate)
                      : ""
                  }
                  disabled
                />
              </div>
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Đến ngày
                </label>
                <input
                  className="w-full content-center  p-2 mt-1 border rounded focus:outline-none"
                  type="text"
                  value={
                    trasaction?.toDate
                      ? DateHelper.formatDateTime(trasaction?.toDate)
                      : ""
                  }
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 px-4 py-3 border-t  ">
          <button
            className="flex items-center gap-2 w-max h-max px-4 py-2 bg-slate-300 text-white rounded-md hover:bg-slate-300/80 font-[450]"
            onClick={handleClose}
          >
            <IoMdExit className="text-lg" />
            <p>Đóng</p>
          </button>
        </div>
      </div>
    </>
  );
};
export default DetailTransaction;
