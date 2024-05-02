import { LoadingContext } from "@/App";
import { jobsService } from "@/services";
import {
  SwalHelper,
  TextHelper,
  DateHelper,
  ConstantsHelper,
} from "@/utils/helpers";
import { useContext, useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { IoMdExit } from "react-icons/io";
import NON_USER from "@/assets/images/non-user.jpg";
import parse from "html-react-parser";
import { MdOutlineNotStarted, MdPauseCircleOutline } from "react-icons/md";
import { DataConstants } from "@/utils/constants";
const DetailsJobAdmin = (props: any) => {
  const context = useContext(LoadingContext);
  const handleClose = props.handleClose;
  const fetchData = props.fetchData;
  const id = props.id;

  const [job, setJob] = useState<JobModel>();

  useEffect(() => {
    context.handleOpenLoading();
    jobsService
      .getDetail_Admin(id)
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
  }, []);

  const _onClickUpdateState =() =>{
    
  }

  return (
    <div className="lg:w-[45%] w-screen bg-white relative rounded">
      <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-bgBlue rounded-t">
        <h2 className="text-xl font-semibold  line-clamp-1 my-auto">
          Chi tiết tuyển dụng
        </h2>
        <button
          className="p-1 rounded-md text-lg hover:text-bgBlue hover:bg-white"
          onClick={handleClose}
        >
          <AiOutlineClose />
        </button>
      </div>

      <div className="overflow-auto scrollbar-custom h-max max-h-[75vh] my-2 mr-1">
        <div className="mx-5 lg:mx-8 my-2 text-gray-800 flex flex-col gap-3 lg:gap-4 text-sm">
          <div className="flex items-center justify-between gap-5">
            <div>
              <img
                src={job?.employerAvartar ? job?.employerAvartar : NON_USER}
                className="w-24 h-24 rounded-full"
              />
            </div>
            <div className="text-right flex flex-col gap-1.5 text-sm text-gray-600 font">
              <p className="font-medium">{job?.employerName}</p>
              <p className="">{job?.employerEmail}</p>
              <p className="">{job?.employerPhoneNumber}</p>
            </div>
          </div>
          <div className="bg-gray-400 h-[2px]" />
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-center px-5 leading-tight">
              {job?.name}
            </h3>
          </div>
          <div className="">
            <h3 className="text-lg font-semibold mb-2 border-l-4 border-bgBlue pl-2">
              Thông tin chung
            </h3>
            <div className="grid md:grid-cols-2 text-sm gap-2.5">
              <div className="">
                <p className="">
                  <span className="font-semibold">Ngành nghề:&nbsp;&nbsp;</span>
                  {job?.categoryName || "Khác"}
                </p>
              </div>
              <div className="">
                <p className="">
                  <span className="font-semibold">Mức lương:&nbsp;&nbsp;</span>
                  {TextHelper.SalaryText(job?.fromSalary, job?.toSalary)}
                </p>
              </div>
              <div className="">
                <p className="">
                  <span className="font-semibold">Ngày đăng:&nbsp;&nbsp;</span>
                  {DateHelper.formatDate(job?.created)}
                </p>
              </div>
              <div className="">
                <p className="">
                  <span className="font-semibold">
                    Ngày hết hạn:&nbsp;&nbsp;
                  </span>
                  {DateHelper.convertDate(job?.toDate || "")}
                </p>
              </div>
              <div className="">
                <p className="">
                  <span className="font-semibold">Kinh nghiệm: </span>
                  {job?.experience}
                </p>
              </div>
              <div className="">
                <p className="">
                  <span className="font-semibold">Tình trạng: </span>
                  {ConstantsHelper.findJobStateById(job?.status)?.name}
                </p>
              </div>
            </div>
          </div>

          <div className="">
            <h3 className="text-lg font-semibold mb-2 border-l-4 border-bgBlue pl-2">
              Thông tin chi tiết
            </h3>
            <div>{parse(job?.description || "", TextHelper.OptionParses)}</div>
          </div>
          <div className="">
            <h3 className="text-lg font-semibold mb-2 border-l-4 border-bgBlue pl-2">
              Thông tin khác
            </h3>
            <div>
              <div className="mt-2.5">
                <h5 className="font-medium">
                  Quy trình phỏng vấn:&nbsp;&nbsp;
                </h5>
                {job?.steps && (
                  <div className="relative wrap overflow-hidden mt-2.5">
                    <div className="absolute border-opacity-20 border-gray-700 h-full border lg:left-1/2 max-lg:mx-[17px]"></div>
                    {job?.steps.map((item) => (
                      <div
                        className={`mb-2 flex justify-between items-center w-full ${
                          (item.number + 1) % 2 == 0
                            ? ""
                            : "lg:flex-row-reverse"
                        }`}
                      >
                        <div className="order-1 lg:w-5/12"></div>
                        <div className="z-20 flex items-center order-1 bg-gray-300  w-10 h-10 rounded-full max-lg:mr-2">
                          <h1 className="mx-auto font-semibold  text-white">
                            {item.number + 1}
                          </h1>
                        </div>
                        <div className="order-1 bg-gray-100 rounded-lg w-full lg:w-5/12 px-4 py-3">
                          <h3 className="mb-1 font-semibold  text-base">
                            {item.name}
                          </h3>
                          <p className="text-gray-800 leading-tight text-sm italic">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-2.5 flex gap-2">
                <h5 className="font-medium">Danh sách nhãn:&nbsp;&nbsp;</h5>
                {job?.tags &&
                  job?.tags.map((tag: any) => (
                    <div
                      className="inline-block relative py-1 text-xs"
                      key={tag.id}
                    >
                      <div
                        className="absolute inset-0 flex"
                        style={{ color: tag.color }}
                      >
                        <svg height="100%" viewBox="0 0 50 100">
                          <path
                            d="M49.9,0a17.1,17.1,0,0,0-12,5L5,37.9A17,17,0,0,0,5,62L37.9,94.9a17.1,17.1,0,0,0,12,5ZM25.4,59.4a9.5,9.5,0,1,1,9.5-9.5A9.5,9.5,0,0,1,25.4,59.4Z"
                            fill="currentColor"
                          />
                        </svg>
                        <div
                          className="flex-grow h-full -ml-px  rounded-md rounded-l-none"
                          style={{ backgroundColor: tag.color }}
                        ></div>
                      </div>
                      <span className="relative text-white uppercase font-semibold">
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        {tag.name}
                        <span>&nbsp;&nbsp;&nbsp;</span>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 px-4 py-3 border-t">
        {job?.status === DataConstants.STATUS_DATA.PENDING && (
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

        {(job?.status === DataConstants.STATUS_DATA.ACTIVE ||
          job?.status === DataConstants.STATUS_DATA.PENDING) && (
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
        {job?.status === DataConstants.STATUS_DATA.INACTIVE && (
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
          className="hidden lg:flex items-center gap-2 w-max h-max px-4 py-2 bg-slate-300 text-white rounded-md hover:bg-slate-300/90 font-medium"
          onClick={handleClose}
        >
          <IoMdExit className="text-lg" />
          <p>Đóng</p>
        </button>
      </div>
    </div>
  );
};
export default DetailsJobAdmin;
