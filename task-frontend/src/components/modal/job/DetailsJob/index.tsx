import { LoadingContext } from "@/App";
import { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdExit } from "react-icons/io";
import { SelectCustom, TextEditor } from "@/components/form";
import { ConfigSelect } from "@/configs/selectConfig";
import { SwalHelper, AuthHelper } from "@/utils/helpers";
import { jobsService } from "@/services";
import { DateHelper } from "@/utils/helpers/dateHelper";
import { MdOutlineCalendarMonth, MdOutlinePauseCircle } from "react-icons/md";
import { DataConstants } from "@/utils/constants/dataConstants";
import ModalBase from "../..";
import { ModalConstants } from "@/utils/constants";

const DetailsJob = (props: any) => {
  const context = useContext(LoadingContext);
  const handleClose = props.handleClose;
  const fetchData = props.fetchData;
  const id = props.id;
  const [openSub, setOpenSub] = useState<boolean>(false);
  const [funcsSub, setFuncsSub] = useState<string>("");
  const handleOpenSub = () => setOpenSub(true);
  const handleCloseSub = () => setOpenSub(false);

  const [job, setJob] = useState<JobModel>();
  const fetchDataJob = () => {
    context.handleOpenLoading();
    jobsService
      .getDetail_Employer(id)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setJob(res.data.Data);
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
    fetchDataJob();
  }, [id]);

  const tagOptions = Array.isArray(job?.tags)
    ? job.tags.map((item: TagModel) => ({
        ...item,
        value: item.id,
        label: item.name,
      }))
    : [];

  const _onClickUpdateStatus = (status: string) => {
    context.handleOpenLoading();
    jobsService
      .updateStatus_Employer(id, status)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          handleClose();
          SwalHelper.MiniAlert(res.data.Message, "success");
          fetchData();
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
  const _onClickDealine = () => {
    handleOpenSub();
    setFuncsSub(ModalConstants.JOB_KEYS.changeDealine);
  };

  return (
    <>
      <ModalBase
        id={id}
        fetchData={fetchDataJob}
        open={openSub}
        handleClose={handleCloseSub}
        funcs={funcsSub}
      />
      <div className="lg:w-[45%] w-screen bg-white relative rounded">
        <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-orangetext rounded-t">
          <h2 className="text-xl font-semibold  line-clamp-1 my-auto">
            Chi tiết tuyển dụng
          </h2>
          <button
            className="p-1 rounded-md text-lg hover:text-orangetext hover:bg-white"
            onClick={handleClose}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="overflow-auto scrollbar-custom h-max max-h-[75vh] my-2 mr-1">
          <div className="mx-4 my-2 text-gray-700 flex flex-col gap-3 lg:gap-4 text-sm">
            <div className="flex justify-between gap-3 lg:gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Tên công việc
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  value={job?.name}
                  disabled
                />
              </div>
            </div>
            <div className="flex justify-between gap-3 lg:gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Địa điểm
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  value={job?.location}
                  disabled
                />
              </div>
            </div>
            <div className="flex justify-between gap-3 lg:gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Ngày đăng
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  value={DateHelper.formatDateTime(job?.created)}
                  disabled
                />
              </div>
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Thời hạn
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  value={DateHelper.formatDateTime(new Date(job?.toDate!))}
                  disabled
                />
              </div>
            </div>
            <div className="flex max-lg:flex-col justify-between gap-3 lg:gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Kinh nghiệm
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  value={job?.experience}
                  disabled
                />
              </div>
              {AuthHelper.isEmployer() && (
                <div className="content-center w-full">
                  <label className="font-medium tracking-wide text-sm">
                    Cán bộ
                  </label>
                  <input
                    className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext text-sm"
                    type="text"
                    value={job?.humanResource?.name}
                    disabled
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between gap-3 lg:gap-4 content-center">
              <div className="content-center w-full flex gap-2">
                <input
                  type="checkbox"
                  className="cursor-pointer relative h-5 w-5 rounded-md border my-auto accent-bgBlue"
                  checked={!job?.fromSalary && !job?.toSalary}
                  disabled
                />
                <label className="text-slate-500 flex justify-center items-center font-bold pl-2 pr-2 bg-slate-200 text-sm py-0.5 uppercase">
                  Mức lương thỏa thuận
                </label>
              </div>
            </div>
            {(job?.fromSalary || job?.toSalary) && (
              <div className="flex max-lg:flex-col justify-between gap-3 lg:gap-4 content-center">
                <div className="content-center w-full flex gap-4">
                  <div className="content-center w-full">
                    <label className="font-medium tracking-wide text-sm ">
                      Mức lương từ
                    </label>
                    <input
                      className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext  text-sm"
                      type="text"
                      value={job?.fromSalary}
                      disabled
                    />
                  </div>
                  <div className="content-center w-full">
                    <label className="font-medium tracking-wide text-sm">
                      Mức lương đến
                    </label>
                    <input
                      className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext text-sm"
                      type="text"
                      value={job?.toSalary}
                      disabled
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="flex max-lg:flex-col justify-between gap-3 lg:gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Ngành nghề
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext text-sm"
                  type="text"
                  value={job?.category?.name || "Khác"}
                  disabled
                />
              </div>
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Quy trình tuyển dụng&nbsp;
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext text-sm"
                  type="text"
                  value={job?.process?.name}
                  disabled
                />
              </div>
            </div>
            <div className="flex justify-between gap-3 g lg:gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Nhãn
                </label>
                <SelectCustom
                  className={"mt-1"}
                  value={tagOptions}
                  options={tagOptions}
                  isMulti={true}
                  placeholder=""
                  theme={ConfigSelect.customTheme}
                  styles={ConfigSelect.tagStyles}
                  disabled
                />
              </div>
            </div>

            <div className="flex justify-between gap-3 lg:gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Thông tin chi tiết&nbsp;
                </label>
                <div className="mt-1">
                  <TextEditor value={job?.description} disabled />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4 px-4 py-3 border-t">
          <div>
            <button
              className="flex items-center gap-2 w-max h-max px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-500/85 font-medium"
              onClick={() => _onClickDealine()}
            >
              <MdOutlineCalendarMonth className="text-lg my-auto" />
              <p>Gia hạn</p>
            </button>
          </div>
          <div className="flex gap-4">
            {job?.status == DataConstants.STATUS_DATA.PAUSED && (
              <button
                className="flex items-center gap-2 w-max h-max px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-500/85 font-medium"
                onClick={() =>
                  _onClickUpdateStatus(DataConstants.STATUS_DATA.ACTIVE)
                }
              >
                <MdOutlinePauseCircle className="text-xl" />
                <p>Bật tìm kiếm</p>
              </button>
            )}
            {job?.status == DataConstants.STATUS_DATA.ACTIVE && (
              <button
                className="flex items-center gap-2 w-max h-max px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-500/85 font-medium"
                onClick={() =>
                  _onClickUpdateStatus(DataConstants.STATUS_DATA.PAUSED)
                }
              >
                <MdOutlinePauseCircle className="text-xl" />
                <p>Tắt tìm kiếm</p>
              </button>
            )}

            <button
              className="hidden lg:flex items-center gap-2 w-max h-max px-4 py-2 bg-slate-300 text-white rounded-md hover:bg-slate-300/90 font-medium"
              onClick={handleClose}
            >
              <IoMdExit className="text-lg" />
              <p>Đóng</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default DetailsJob;
