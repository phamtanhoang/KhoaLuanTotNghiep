import { TextEditor } from "@/components/form";
import { useContext, useEffect, useRef, useState } from "react";
import {
  AiFillDelete,
  AiFillEye,
  AiFillMessage,
  AiOutlineClose,
} from "react-icons/ai";
import {
  IoIosAddCircle,
  IoMdExit,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import ModalBase from "../..";
import { DataConstants, ModalConstants } from "@/utils/constants";
import { LoadingContext } from "@/App";
import { useDispatch, useSelector } from "react-redux";
import { ONCHANGE_APPLICATION_SINGLE } from "@/store/reducers/singleDataReducer";
import applicationsService from "@/services/applicationsService";
import { AuthHelper, DateHelper, SwalHelper } from "@/utils/helpers";
import {
  ONCHANGE_MESSAGE_LIST,
  ONCHANGE_SCHEDULE_LIST,
} from "@/store/reducers/listDataReducer";
import { ChatUI, ListEmpty } from "@/components/ui";
import { BsThreeDotsVertical } from "react-icons/bs";

interface StepItemProps {
  index: number;
  item: ScheduleModel;
  _onClickScheduleDetail: (id: string) => void;
  _onClickScheduleDelete: (id: string) => void;
}
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { URL } from "@/Apis";

let stompClient: any = null;
const StepItem: React.FC<StepItemProps> = ({
  index,
  item,
  _onClickScheduleDelete,
  _onClickScheduleDetail,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <tr
      key={index}
      className="bg-white table-row flex-row flex-no-wrap mb-10 lg:mb-0"
    >
      <td className="w-auto p-3 text-gray-800 text-center border border-b table-cell static">
        {index + 1}
      </td>

      <td className="w-auto p-3 text-gray-800 text-center border border-b table-cell static">
        {item?.name!}
      </td>
      <td className="w-auto p-3 text-gray-800 text-center border border-b table-cell static">
        {item?.startDate &&
          DateHelper.formatDateTime(new Date(item?.startDate!))}
      </td>

      <td className="w-auto p-3 text-gray-800 text-center border border-b table-cell static">
        {item?.endDate && DateHelper.formatDateTime(new Date(item?.endDate!))}
      </td>
      <td className="w-auto p-3 text-gray-800 text-center border border-b btable-cell static">
        <button
          ref={trigger}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`text-lg  ${
            dropdownOpen ? "bg-gray-100" : "bg-white"
          } hover:bg-gray-100 p-1.5 rounded relative`}
        >
          <BsThreeDotsVertical className="my-auto" />
          {dropdownOpen && (
            <div
              ref={dropdown}
              onFocus={() => setDropdownOpen(true)}
              onBlur={() => setDropdownOpen(false)}
              className="origin-top-right absolute right-full bottom-0 mt-2 w-32 rounded bg-white ring-1 ring-black ring-opacity-5 border border-borderColor"
            >
              <div className="p-1.5">
                <a
                  className="flex gap-2 rounded-md px-3 py-1.5 text-base text-gray-700 hover:bg-blue-100 active:bg-blue-100/70 cursor-pointer text-center"
                  onClick={() => {
                    _onClickScheduleDetail(item.id!);
                  }}
                >
                  <AiFillEye className="text-lg my-auto" />
                  Chi tiết
                </a>
                {(AuthHelper.isHR() || AuthHelper.isEmployer()) && (
                  <a
                    className="flex gap-2 rounded-md px-3 py-1.5 text-base text-gray-700 hover:bg-red-100 active:bg-red-100/70 cursor-pointer text-center"
                    onClick={() => {
                      _onClickScheduleDelete(item.id!);
                    }}
                  >
                    <AiFillDelete className="text-lg my-auto" />
                    Xóa
                  </a>
                )}
              </div>
            </div>
          )}
        </button>
      </td>
    </tr>
  );
};

const ApplicationDetail = (props: any) => {
  const [openSub, setOpenSub] = useState<boolean>(false);
  const [funcsSub, setFuncsSub] = useState<string>("");
  const handleOpenSub = () => setOpenSub(true);
  const handleCloseSub = () => setOpenSub(false);
  const id = props.id;
  const fetchListData = props.fetchData;
  const handleClose = props.handleClose;
  const { schedules } = useSelector((state: any) => state.listDataReducer);

  const context = useContext(LoadingContext);
  const dispatch = useDispatch();
  const { application } = useSelector((state: any) => state.singleDataReducer);
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [messages, setMessages] = useState<any>([]);
  const [type, setType] = useState<boolean>(true);
  const [subId, setSubId] = useState<string>("");

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<any>(null);
  const handleClickOutsideMenu = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenu(false);
      return;
    }
    setOpenMenu(true);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideMenu);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);
  useEffect(() => {
    dispatch(ONCHANGE_APPLICATION_SINGLE(null));
    dispatch(ONCHANGE_SCHEDULE_LIST([]));
    dispatch(ONCHANGE_MESSAGE_LIST([]));
  }, []);

  const fetchData = () => {
    if (AuthHelper.isEmployer() || AuthHelper.isHR()) {
      context.handleOpenLoading();
      applicationsService
        .getApplicationDetail_Employer(id)
        .then((res) => {
          if (res.status === 200 && res.data.Status === 200) {
            dispatch(ONCHANGE_APPLICATION_SINGLE(res.data.Data));
            dispatch(ONCHANGE_SCHEDULE_LIST(res.data.Data?.schedules));
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
    } else {
      context.handleOpenLoading();
      applicationsService
        .getApplicationDetail_Candidate(id)
        .then((res) => {
          if (res.status === 200 && res.data.Status === 200) {
            dispatch(ONCHANGE_APPLICATION_SINGLE(res.data.Data));
            dispatch(ONCHANGE_SCHEDULE_LIST(res.data.Data?.schedules));
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
    }
  };
  const fetchMessageData = (id: string) => {
    setIsLoading(true);
    applicationsService
      .getMessagesApplication(id)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setMessages(res.data.Data);
          connect();
        } else {
          SwalHelper.MiniAlert(res.data.Message, "error");
        }
      })
      .catch(() => {
        SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    fetchMessageData(id);
  }, [id]);

  const _onClickSend = () => {
    if (!content && !file) {
      return;
    }
    setIsLoading(true);
    applicationsService
      .sendMessagesApplication(id, content, file)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setContent("");
          setFile(null);

          stompClient.send("/app/chat", {}, JSON.stringify(res.data.Data));
        } else {
          SwalHelper.MiniAlert(res.data.Message, "error");
        }
      })
      .catch(() => {
        SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const _onClick = (status: string) => {
    SwalHelper.Confirm(
      "Bạn có muốn chuyển sang trạng thái này không?",
      "question",
      () => {
        context.handleOpenLoading();
        applicationsService
          .updateStatus(id, status)
          .then((res) => {
            if (res.status === 200 && res.data.Status === 200) {
              SwalHelper.MiniAlert("Chuyển trạng thái thành công!", "success");
              fetchData();
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

  const _onClickCreateSchedule = () => {
    setSubId(id);
    setFuncsSub(ModalConstants.APPLICATION_KEYS.createSchedule);
    handleOpenSub();
  };
  const _onClickScheduleDetail = (id: string) => {
    setSubId(id);
    setFuncsSub(ModalConstants.APPLICATION_KEYS.detailSchedule);
    handleOpenSub();
  };
  const _onClickScheduleDelete = (id: string) => {
    SwalHelper.Confirm(
      "Xác nhận xóa lịch hẹn?",
      "question",
      () => {
        context.handleOpenLoading();
        applicationsService
          .deleteSchedule(id)
          .then((res) => {
            if (res.status === 200 && res.data.Status === 200) {
              fetchData();
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
      },
      () => {}
    );
  };

  const connect = () => {
    const Sock = new SockJS(`${URL}/ws`);
    stompClient = over(Sock);

    stompClient.connect({}, onConnected, (err: any) => {
      console.log("Error ", err);
    });
  };

  const onConnected = () => {
    stompClient.subscribe(`/topic/${id}`, onPrivateMessage);
  };

  const onPrivateMessage = (payload: any) => {
    const payloadData = JSON.parse(payload.body);
    setMessages((prevMessages: any) => [...prevMessages, payloadData]);
  };

  const _onClickJob = () => {
    setFuncsSub(ModalConstants.JOB_KEYS.detailJob);
    handleOpenSub();
  };
  return (
    <>
      <ModalBase
        id={application?.job?.id}
        subId={subId}
        fetchData={fetchData}
        open={openSub}
        handleClose={handleCloseSub}
        funcs={funcsSub}
        status={status}
        type={false}
      />
      <div className="w-screen bg-white relative rounded lg:w-[75%]">
        <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-orangetext rounded-t">
          <h2 className="text-xl font-semibold  line-clamp-1 my-auto">
            Thông tin ứng tuyển
          </h2>
          <button
            className="p-1 rounded-md text-lg hover:text-orangetext hover:bg-white"
            onClick={handleClose}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="h-[75vh] max-h-[75vh] my-2 mx-1 flex">
          <div
            className={`mr-1 w-full px-3 text-gray-700 flex flex-col gap-4 overflow-auto scrollbar-custom ${
              !type && "max-lg:hidden"
            } lg:w-[55%]`}
          >
            <div className="content-center flex flex-col gap-2">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-base ">
                  Ứng tuyển vị trí:&nbsp;
                  <a
                    className="hover:text-bgBlue cursor-pointer uppercase"
                    onClick={_onClickJob}
                  >
                    {application?.job?.name}
                  </a>
                </label>
              </div>
            </div>
            <div className="content-center flex flex-col gap-2.5 text-sm p-2.5 border border-dotted border-orangetext rounded-lg">
              <div className="lg:flex justify-between gap-4 content-center">
                <div className="content-center w-full">
                  <label className="font-medium tracking-wide text-sm">
                    Họ và tên
                  </label>
                  <input
                    className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                    type="text"
                    disabled
                    value={application?.fullName}
                  />
                </div>
              </div>
              <div className="lg:flex justify-between gap-4 content-center ">
                <div className="content-center w-full">
                  <label className="font-medium tracking-wide text-sm">
                    Email
                  </label>
                  <input
                    className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                    type="text"
                    disabled
                    value={application?.email}
                  />
                </div>
                <div className="content-center w-full">
                  <label className="font-medium tracking-wide text-sm">
                    Số điện thoại
                  </label>
                  <input
                    className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                    type="text"
                    disabled
                    value={application?.phoneNumber}
                  />
                </div>
              </div>
              <div className="content-center">
                <div className="content-center w-full flex">
                  <label className="font-medium tracking-wide text-sm">
                    CV đã ứng tuyển:&nbsp;&nbsp;
                  </label>
                  <p
                    className="text-bgBlue hover:text-bgBlue/85 cursor-pointer"
                    onClick={() => window.open(application?.cV, "_blank")}
                  >
                    Xem chi tiết
                  </p>
                </div>
              </div>
              <div className="content-center">
                <label className="font-medium tracking-wide">
                  Thư giới thiệu:&nbsp;
                </label>

                <div className="text-sm mt-1">
                  <TextEditor value={application?.letter} disabled />
                </div>
              </div>
            </div>

            <div className="content-center">
              <div className="flex gap-3 justify-between">
                <label className="font-medium tracking-wide text-base">
                  Danh sách lịch hẹn:&nbsp;
                </label>
                {AuthHelper.isCandidate() ? (
                  <div></div>
                ) : (
                  <button
                    className="text-2xl text-orangetext hover:text-orangetext/85 cursor-pointer"
                    onClick={_onClickCreateSchedule}
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Thêm lịch hẹn"
                  >
                    <IoIosAddCircle className="text-2xl" />
                  </button>
                )}
              </div>

              <table className="border-collapse w-full mt-1 text-sm">
                <thead>
                  <tr>
                    <th className="px-1 py-1.5 font-semibold uppercase bg-gray-100 text-gray-600 border border-borderColor table-cell w-[10%]">
                      STT
                    </th>

                    <th className="px-1 py-1.5 font-semibold bg-gray-100 text-gray-600 border border-borderColor table-cell">
                      Tiêu đề
                    </th>
                    <th className="px-1 py-1.5 font-semibold bg-gray-100 text-gray-600 border border-borderColor table-cell">
                      Bắt đầu vào
                    </th>
                    <th className="px-1 py-1.5 font-semibold bg-gray-100 text-gray-600 border border-borderColor table-cell">
                      Kết thúc lúc
                    </th>

                    <th className="px-1 py-1.5 font-semibold bg-gray-100 text-gray-600 border border-borderColor table-cell w-[10%]"></th>
                  </tr>
                </thead>

                <tbody>
                  {schedules?.length < 1 ? (
                    <tr className="bg-white border">
                      <td className="py-3 whitespace-no-wrap" colSpan={5}>
                        <div className="flex items-center justify-center w-full h-full">
                          <div className="flex justify-center items-center text-sm text-gray-700">
                            <div>Chưa có lịch hẹn nào!!!</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {schedules?.map((item: ScheduleModel, index: number) => (
                        <StepItem
                          index={index}
                          item={item}
                          _onClickScheduleDetail={_onClickScheduleDetail}
                          _onClickScheduleDelete={_onClickScheduleDelete}
                        />
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border border-orangetext/50 max-lg:hidden"></div>
          <div
            className={`ml-1 w-full text-gray-700 flex flex-col gap-2 ${
              type && "max-lg:hidden"
            } lg:w-[45%]`}
          >
            <label className="font-medium tracking-wide text-lg px-2">
              Thông tin trao đổi:
            </label>

            <ChatUI
              messages={messages}
              content={content}
              setContent={setContent}
              file={file}
              setFile={setFile}
              _onClickSend={_onClickSend}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className="flex justify-between gap-2 px-4 py-3 border-t  ">
          <div className="flex gap-4">
            {type ? (
              <button
                className="flex items-center gap-2 w-max h-max px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-600/90 font-medium lg:hidden"
                onClick={() => {
                  setType(false);
                }}
              >
                <AiFillMessage className="text-lg" />
                <p>Trao đổi</p>
              </button>
            ) : (
              <button
                className="flex items-center gap-2 w-max h-max px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-600/90 font-medium lg:hidden"
                onClick={() => {
                  setType(true);
                }}
              >
                <IoMdInformationCircleOutline className="text-lg" />
                <p>Thông tin</p>
              </button>
            )}
          </div>
          <div className="flex gap-4">
            <div className="relative" ref={menuRef}>
              <button className="flex items-center gap-2 w-max h-max px-4 py-2  text-gray-700 bg-white border-2 border-borderColor rounded">
                Trạng thái:{" "}
                {application?.status == DataConstants.STATUS_DATA.PROCESSING ? (
                  <p className="text-[#0000FF] font-medium">Đang phỏng vấn</p>
                ) : application?.status ==
                  DataConstants.STATUS_DATA.APPROVED ? (
                  <p className="text-[#169C46] font-medium">Thành công</p>
                ) : application?.status ==
                  DataConstants.STATUS_DATA.REJECTED ? (
                  <p className="text-[#FF0000] font-medium">Thất bại</p>
                ) : application?.status == DataConstants.STATUS_DATA.PENDING ? (
                  <p className="text-[#FFC300] font-medium">Chờ xét duyệt</p>
                ) : (
                  <></>
                )}
                {(AuthHelper.isHR() || AuthHelper.isEmployer()) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 ml-2 -mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                )}
              </button>
              {(AuthHelper.isHR() || AuthHelper.isEmployer()) && openMenu && (
                <>
                  <div className="origin-top-right absolute right-0 bottom-[105%] mt-2 w-48 rounded bg-white ring-1 ring-black ring-opacity-5 border border-borderColor">
                    <div className="py-2 p-2 ">
                      {application?.status !=
                        DataConstants.STATUS_DATA.PROCESSING && (
                        <a
                          className="flex rounded-md px-4 py-2 text-base text-gray-700 hover:bg-blue-100 active:bg-blue-100/70 cursor-pointer text-center"
                          onClick={() => {
                            _onClick(DataConstants.STATUS_DATA.PROCESSING);
                          }}
                        >
                          Đang phỏng vấn
                        </a>
                      )}
                      {application?.status !=
                        DataConstants.STATUS_DATA.APPROVED && (
                        <a
                          className="flex rounded-md px-4 py-2 text-base text-gray-700 hover:bg-green-100 active:bg-green-100/70 cursor-pointer text-center"
                          onClick={() => {
                            _onClick(DataConstants.STATUS_DATA.APPROVED);
                          }}
                        >
                          Thành công
                        </a>
                      )}
                      {application?.status !=
                        DataConstants.STATUS_DATA.REJECTED && (
                        <a
                          className="flex rounded-md px-4 py-2 text-base text-gray-700 hover:bg-red-100 active:bg-red-100/70 cursor-pointer text-center"
                          onClick={() => {
                            _onClick(DataConstants.STATUS_DATA.REJECTED);
                          }}
                        >
                          Thất bại
                        </a>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <button
              className="flex items-center gap-2 w-max h-max px-4 py-2 bg-slate-300 text-white rounded hover:bg-slate-300/90 font-medium max-lg:hidden"
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
export default ApplicationDetail;
