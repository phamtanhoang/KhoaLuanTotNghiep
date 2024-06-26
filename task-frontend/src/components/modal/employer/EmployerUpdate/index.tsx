import { LoadingContext } from "@/App";
import { employersService } from "@/services";
import { SwalHelper, DateHelper } from "@/utils/helpers";
import { useContext, useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { IoMdExit } from "react-icons/io";
import NON_BG from "@/assets/images/non-bg.jpg";
import NON_USER from "@/assets/images/non-user.jpg";
import { MdOutlineNotStarted, MdPauseCircleOutline } from "react-icons/md";
import { DataConstants } from "@/utils/constants";

const EmployerUpdate = (props: any) => {
  const handleClose = props.handleClose;
  const id = props.id;
  const fetchListData = props.fetchData;
  const context = useContext(LoadingContext);
  const [employer, setEmployer] = useState<EmployerModel>();
  const _onClickUpdateState = (state: string) => {
    context.handleOpenLoading();
    employersService
      .update(id, state)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          handleClose();
          fetchListData();
          SwalHelper.MiniAlert(res.data.Message, "success");
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
  };

  useEffect(() => {
    context.handleOpenLoading();
    employersService
      .getbyId_admin(id)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setEmployer(res.data.Data);
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
      <div className="md:w-[50%] xl:w-[40%] w-screen bg-white relative lg:rounded">
        <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-bgBlue lg:rounded-t">
          <h2 className="text-xl font-medium  line-clamp-1 my-auto">
            Chi tiết nhà tuyển dụng
          </h2>
          <button
            className="p-1 rounded-md text-lg hover:text-bgBlue hover:bg-white"
            onClick={handleClose}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="overflow-auto scrollbar-custom h-max max-h-[75vh] my-4 ">
          <div className="mx-4 text-gray-700 flex flex-col gap-2">
            <p className="font-semibold text-black bg-body2 pl-1 pr-1 pt-1.5 pb-1.5 rounded-sm shadow-sm w-full truncate">
              Mã - {id}
            </p>

            <div className="content-center">
              <div className="w-full relative">
                <img
                  src={
                    employer?.backgroundImage
                      ? employer?.backgroundImage
                      : NON_BG
                  }
                  className="w-full h-full lg:rounded-t-lg"
                />
              </div>
              <div className="flex flex-col items-center -mt-20 relative">
                <img
                  src={employer?.image ? employer?.image : NON_USER}
                  className="w-40 h-40 border-4 border-white rounded-full bg-white"
                />
              </div>
            </div>
            <div className="content-center">
              <label className="font-medium tracking-wide text-sm">
                Tên công ty
              </label>
              <input
                className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-bgBlue text-sm"
                type="text"
                value={employer?.name}
                disabled
              />
            </div>
            <div className="content-center">
              <label className="font-medium tracking-wide text-sm">Mô tả</label>
              <textarea
                className="w-full  p-2 mt-1 border rounded focus:outline-none focus:border-bgBlue min-h-32 h-max text-sm"
                value={employer?.description}
                disabled
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-2 lg:gap-4">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Email
                </label>
                <input
                  className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-bgBlue text-sm"
                  type="text"
                  value={employer?.email}
                  disabled
                />
              </div>
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Tình trạng
                </label>
                <input
                  className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-bgBlue text-sm"
                  type="text"
                  value={
                    employer?.status === DataConstants.STATUS_DATA.ACTIVE
                      ? "Hoạt động"
                      : employer?.status === DataConstants.STATUS_DATA.PENDING
                      ? "Chờ duyệt"
                      : "Không hoạt động"
                  }
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-2 lg:gap-4">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Số điện thoại
                </label>
                <input
                  className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-bgBlue text-sm"
                  type="text"
                  value={employer?.phoneNumber}
                  disabled
                />
              </div>
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Mã số kinh doanh
                </label>
                <input
                  className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-bgBlue text-sm"
                  type="text"
                  value={employer?.businessCode}
                  disabled
                />
              </div>
            </div>
            <div className="content-center">
              <label className="font-medium tracking-wide text-sm">
                Địa chỉ
              </label>
              <input
                className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-bgBlue text-sm"
                type="text"
                value={employer?.location}
                disabled
              />
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-2 lg:gap-4">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Ngày tạo
                </label>
                <input
                  className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-bgBlue text-sm"
                  type="text"
                  value={
                    employer?.created
                      ? DateHelper.formatDateTime(employer?.created)
                      : ""
                  }
                  disabled
                />
              </div>
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Chỉnh sửa gần đây
                </label>
                <input
                  className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-bgBlue text-sm"
                  type="text"
                  value={
                    employer?.updated
                      ? DateHelper.formatDateTime(employer?.updated)
                      : ""
                  }
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 px-4 py-3 border-t">
          {employer?.status === DataConstants.STATUS_DATA.PENDING && (
            <button
              className="flex items-center gap-2 w-max h-max px-4 py-2  text-white rounded-md bg-green-600 hover:bg-green-600/90 font-[450]"
              onClick={() => {
                _onClickUpdateState(DataConstants.STATUS_DATA.ACTIVE);
              }}
            >
              <AiOutlineCheck className="text-base" />
              <p>Duyệt</p>
            </button>
          )}

          {(employer?.status === DataConstants.STATUS_DATA.ACTIVE ||
            employer?.status === DataConstants.STATUS_DATA.PENDING) && (
            <button
              className="flex items-center gap-2 w-max h-max px-4 py-2  text-white rounded-md bg-red-600 hover:bg-red-600/90 font-[450]"
              onClick={() => {
                _onClickUpdateState(DataConstants.STATUS_DATA.INACTIVE);
              }}
            >
              <MdPauseCircleOutline className="text-xl" />
              <p>Khóa</p>
            </button>
          )}
          {employer?.status === DataConstants.STATUS_DATA.INACTIVE && (
            <button
              className="flex items-center gap-2 w-max h-max px-4 py-2  text-white rounded-md bg-blue-600 hover:bg-blue-600/90 font-[450]"
              onClick={() => {
                _onClickUpdateState(DataConstants.STATUS_DATA.ACTIVE);
              }}
            >
              <MdOutlineNotStarted className="text-xl" />
              <p>Bỏ khóa</p>
            </button>
          )}
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
export default EmployerUpdate;
