import { TextEditor } from "@/components/form";
import { useContext, useEffect, useRef, useState } from "react";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillMessage,
  AiOutlineClose,
} from "react-icons/ai";
import { IoMdExit } from "react-icons/io";
import ModalBase from "../..";
import { DataConstants, ModalConstants } from "@/utils/constants";
import { LoadingContext } from "@/App";
import { useDispatch, useSelector } from "react-redux";
import { ONCHANGE_APPLICATION_SINGLE } from "@/store/reducers/singleDataReducer";
import applicationsService from "@/services/applicationsService";
import { AuthHelper, DateHelper, SwalHelper } from "@/utils/helpers";
import {
  ONCHANGE_MESSAGE_LIST,
  ONCHANGE_STEP_LIST,
} from "@/store/reducers/listDataReducer";
import { ChatUI } from "@/components/ui";
import { MdSkipNext } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GrSchedulePlay } from "react-icons/gr";
import { BiDetail } from "react-icons/bi";
import { over } from "stompjs";
import SockJS from "sockjs-client";

interface StepItemProps {
  index: number;
  item: StepModel;
  stepResult: any;
  stepSchedule: any;
  _onClickCreateStepSchedule: (id: string) => void;
  _onClickDetailStepSchedule: (id: string) => void;
}

var stompClient: any = null;
const StepItem: React.FC<StepItemProps> = ({
  index,
  item,
  stepResult,
  stepSchedule,
  _onClickCreateStepSchedule,
  _onClickDetailStepSchedule,
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
        {item?.number! + 1}
      </td>

      <td className="w-auto p-3 text-gray-800 text-center border border-b table-cell static">
        {item?.name!}
      </td>
      <td className="w-auto p-3 text-gray-800 text-center border border-b table-cell static">
        {stepSchedule?.startDate &&
          DateHelper.formatDateTime(stepSchedule?.startDate)}
      </td>

      <td className="w-auto p-3 text-gray-800 text-center border border-b table-cell static">
        {stepResult?.status == DataConstants.STATUS_DATA.PASS ? (
          <span className="rounded bg-green-400 py-1 px-3 text-sm font-medium text-white ">
            Pass
          </span>
        ) : stepResult?.status == DataConstants.STATUS_DATA.FAIL ? (
          <span className="rounded bg-red-400 py-1 px-3 text-sm font-medium text-white ">
            Fail
          </span>
        ) : (
          ""
        )}
      </td>
      <td className="w-auto p-3 text-gray-800 text-center border border-b table-cell static">
        {stepResult?.result!}
      </td>
      <td className="w-auto p-3 text-gray-800 text-center border border-b btable-cell static">
        {AuthHelper.isCandidate() && !stepSchedule ? (
          <></>
        ) : (
          <button
            ref={trigger}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`text-lg  ${
              dropdownOpen ? "bg-gray-100" : "bg-white"
            } hover:bg-gray-100 p-1.5 rounded relative`}
          >
            <BsThreeDotsVertical className="my-auto" />
            <div
              ref={dropdown}
              onFocus={() => setDropdownOpen(true)}
              onBlur={() => setDropdownOpen(false)}
              className={` text-sm z-[1] absolute bottom-0 right-[100%] w-max rounded shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-0.5 group ${
                dropdownOpen ? "block" : "hidden"
              }`}
            >
              {(AuthHelper.isEmployer() || AuthHelper.isHR()) &&
                !stepSchedule && (
                  <a
                    className="flex px-6 py-2 text-gray-700 hover:bg-gray-100 gap-1.5"
                    onClick={() => _onClickCreateStepSchedule(item?.id!)}
                  >
                    <GrSchedulePlay className="my-auto text-base" />
                    Tạo lịch hẹn
                  </a>
                )}
              {stepSchedule && (
                <a
                  className="flex px-6 py-2 text-gray-700 hover:bg-gray-100 gap-1.5"
                  onClick={() => _onClickDetailStepSchedule(stepSchedule?.id!)}
                >
                  <BiDetail className="my-auto text-base" />
                  Chi tiết lịch hẹn
                </a>
              )}
            </div>
          </button>
        )}
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
  const [currentPage, setCurrentPage] = useState<number>(0);

  const context = useContext(LoadingContext);
  const dispatch = useDispatch();
  const { application } = useSelector((state: any) => state.singleDataReducer);
  const { steps, messages } = useSelector(
    (state: any) => state.listDataReducer
  );
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stepId, setStepId] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    dispatch(ONCHANGE_APPLICATION_SINGLE(null));
    dispatch(ONCHANGE_STEP_LIST([]));
    dispatch(ONCHANGE_MESSAGE_LIST([]));
  }, []);

  const _onClickChat = () => {
    setFuncsSub(ModalConstants.CHAT_KEYS.chatApplication);
    handleOpenSub();
  };

  const fetchData = () => {
    if (AuthHelper.isEmployer() || AuthHelper.isHR()) {
      context.handleOpenLoading();
      applicationsService
        .getApplicationDetail_Employer(id)
        .then((res) => {
          if (res.status === 200 && res.data.Status === 200) {
            dispatch(ONCHANGE_APPLICATION_SINGLE(res.data.Data));
            dispatch(ONCHANGE_STEP_LIST(res.data.Data?.job?.process?.steps));
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
            dispatch(ONCHANGE_STEP_LIST(res.data.Data?.job?.process?.steps));
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
          dispatch(ONCHANGE_MESSAGE_LIST(res.data.Data));
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

          fetchMessageData(id);
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

  // useEffect(() => {
  //   connect();
  // }, []);

  // const connect = () => {
  //   let Sock = new SockJS("http://localhost:8080/ws");
  //   stompClient = over(Sock);
  //   stompClient.connect({}, onConnected, onError);
  // };

  // const onConnected = () => {
  //   stompClient.subscribe(`/app/application/${id}`, onMessageReceived);
  // };

  // const onMessageReceived = (payload: any) => {
  //   var payloadData = JSON.parse(payload.body);
  //   alert(payloadData);
  //   // publicChats.push(payloadData);
  //   // setPublicChats([...publicChats]);
  // };

  // const onError = (err: any) => {
  //   console.log(err);
  // };

  // const handleMessage = (event) => {
  //   const { value } = event.target;
  //   setUserData({ ...userData, message: value });
  // };
  // const sendValue = () => {
  //   if (stompClient) {
  //     var chatMessage = {
  //       senderName: userData.username,
  //       message: userData.message,
  //       status: "MESSAGE",
  //     };
  //     console.log(chatMessage);
  //     stompClient.send(
  //       `/app/application/${roomId}`,
  //       {},
  //       JSON.stringify(chatMessage)
  //     );
  //     setUserData({ ...userData, message: "" });
  //   }
  // };

  // const handleUsername = (event) => {
  //   const { value } = event.target;
  //   setUserData({ ...userData, username: value });
  // };

  // const registerUser = () => {
  //   connect();
  // };

  const [mess, setMess] = useState([]);
  const [stompClient, setStompClient] = useState<any>(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws"); // Thay đổi URL phù hợp với backend của bạn
    const stompClient2 = over(socket);

    stompClient2.connect({}, () => {
      console.log("WebSocket connection established");

      // Đăng ký nhận tin nhắn từ server
      stompClient2.subscribe(`/app/application/${id}`, (message) => {
        // setMess((prevMessages: any) => [...prevMessages, message.body]);
      });
    });

    setStompClient(stompClient2);

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  const _onClickUpDateStep = (status: string, result: string) => {
    context.handleOpenLoading();
    applicationsService
      .updateStatus(id, status, result)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          if (status == DataConstants.STATUS_DATA.APPROVED) {
            SwalHelper.MiniAlert("Duyệt thành công!", "success");
          } else if (status == DataConstants.STATUS_DATA.REJECTED) {
            SwalHelper.MiniAlert("Không duyệt thành công!", "success");
          } else {
            SwalHelper.MiniAlert("Chuyển bước thành công!", "success");
          }
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
  };

  const _onClick = (status: string) => {
    setStatus(status);
    setFuncsSub(ModalConstants.APPLICATION_KEYS.handleApplication);
    handleOpenSub();
  };

  const _onClickCreateStepSchedule = (id: string) => {
    setStepId(id);
    setFuncsSub(ModalConstants.APPLICATION_KEYS.createStepSchedule);
    handleOpenSub();
  };
  const _onClickDetailStepSchedule = (id: string) => {
    setStepId(id);
    setFuncsSub(ModalConstants.APPLICATION_KEYS.detailStepSchedule);
    handleOpenSub();
  };

  return (
    <>
      <ModalBase
        id={id}
        stepId={stepId}
        fetchData={fetchData}
        open={openSub}
        handleClose={handleCloseSub}
        funcs={funcsSub}
        _onClickUpDateStep={_onClickUpDateStep}
        status={status}
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

        <div className="h-max max-h-[75vh] my-2 mx-1 flex">
          <div className="mr-1 px-3 text-gray-700 flex flex-col gap-4 overflow-auto scrollbar-custom lg:w-[55%]">
            <div className="content-center flex flex-col gap-2">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-base uppercase">
                  Ứng tuyển vị trí&nbsp;
                  {application?.job?.name}
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
              <label className="font-medium tracking-wide text-base">
                Quá trình ứng tuyển:&nbsp;
              </label>

              <table className="border-collapse w-full mt-1 text-sm">
                <thead>
                  <tr>
                    <th className="px-1 py-1.5 font-semibold uppercase bg-gray-100 text-gray-600 border border-borderColor table-cell w-[10%]">
                      STT
                    </th>

                    <th className="px-1 py-1.5 font-semibold bg-gray-100 text-gray-600 border border-borderColor table-cell">
                      Tên bước
                    </th>
                    <th className="px-1 py-1.5 font-semibold bg-gray-100 text-gray-600 border border-borderColor table-cell">
                      Lịch hẹn
                    </th>
                    <th className="px-1 py-1.5 font-semibold bg-gray-100 text-gray-600 border border-borderColor table-cell w-[10%]">
                      Kết quả
                    </th>
                    <th className="px-1 py-1.5 font-semibold bg-gray-100 text-gray-600 border border-borderColor table-cell">
                      Đánh giá
                    </th>

                    <th className="px-1 py-1.5 font-semibold bg-gray-100 text-gray-600 border border-borderColor table-cell w-[10%]"></th>
                  </tr>
                </thead>

                <tbody>
                  {steps?.map((item: StepModel, index: number) => (
                    <StepItem
                      index={index}
                      item={item}
                      stepResult={
                        application?.stepResults?.find(
                          (item1: any) => item1?.stepNumber == item?.number
                        ) || null
                      }
                      stepSchedule={
                        application?.stepSchedules?.find(
                          (item1: any) => item1?.stepNumber == item?.number
                        ) || null
                      }
                      _onClickCreateStepSchedule={_onClickCreateStepSchedule}
                      _onClickDetailStepSchedule={_onClickDetailStepSchedule}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border border-orangetext/50 max-lg:hidden"></div>
          <div className="ml-1  text-gray-700 flex flex-col gap-2 lg:w-[45%] max-lg:hidden">
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

        <div className="flex justify-end gap-4 px-4 py-3 border-t  ">
          <button
            className="flex items-center gap-2 w-max h-max px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-600/90 font-medium lg:hidden"
            onClick={_onClickChat}
          >
            <AiFillMessage className="text-lg" />
            <p>Trao đổi</p>
          </button>

          {(AuthHelper.isHR() || AuthHelper.isEmployer()) &&
            application?.status != DataConstants.STATUS_DATA.APPROVED &&
            application?.status != DataConstants.STATUS_DATA.REJECTED && (
              <>
                <button
                  className="flex items-center gap-2 w-max h-max px-4 py-2 bg-red-500 text-white rounded hover:bg-red-500/90 font-medium"
                  onClick={() => _onClick(DataConstants.STATUS_DATA.REJECTED)}
                >
                  <AiFillCloseCircle className="text-lg" />
                  <p>Không duyệt</p>
                </button>
                {application?.currentStep == steps.length - 1 && (
                  <button
                    className="flex items-center gap-2 w-max h-max px-4 py-2 bg-green-500 text-white rounded hover:bg-green-500/90 font-medium"
                    onClick={() => _onClick(DataConstants.STATUS_DATA.APPROVED)}
                  >
                    <AiFillCheckCircle className="text-lg" />
                    <p>Duyệt</p>
                  </button>
                )}
                {application?.currentStep != steps.length - 1 && (
                  <button
                    className="flex items-center gap-2 w-max h-max px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-500/90 font-medium "
                    onClick={() =>
                      _onClick(DataConstants.STATUS_DATA.PROCESSING)
                    }
                  >
                    <MdSkipNext className="text-xl" />
                    <p>Chuyển bước</p>
                  </button>
                )}
              </>
            )}

          <button
            className="flex items-center gap-2 w-max h-max px-4 py-2 bg-slate-300 text-white rounded hover:bg-slate-300/90 font-medium"
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
export default ApplicationDetail;
