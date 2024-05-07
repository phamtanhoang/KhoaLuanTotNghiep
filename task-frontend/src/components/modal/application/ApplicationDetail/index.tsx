import { TextEditor } from "@/components/form";
import { useContext, useEffect, useRef, useState } from "react";
import { AiFillMessage, AiOutlineClose } from "react-icons/ai";
import { IoMdExit } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { MdAttachFile } from "react-icons/md";
import ModalBase from "../..";
import { ModalConstants } from "@/utils/constants";
import { LoadingContext } from "@/App";
import { useDispatch, useSelector } from "react-redux";
import { ONCHANGE_APPLICATION_SINGLE } from "@/store/reducers/singleDataReducer";
import applicationsService from "@/services/applicationsService";
import { AuthHelper, SwalHelper } from "@/utils/helpers";
import { ONCHANGE_STEP_LIST } from "@/store/reducers/listDataReducer";

const ApplicationDetail = (props: any) => {
  const [openSub, setOpenSub] = useState<boolean>(false);
  const [funcsSub, setFuncsSub] = useState<string>("");
  const handleOpenSub = () => setOpenSub(true);
  const handleCloseSub = () => setOpenSub(false);
  const id = props.id;
  const fetchListData = props.fetchData;
  const handleClose = props.handleClose;

  const chatContainerRef = useRef<any>(null);

  const context = useContext(LoadingContext);
  const dispatch = useDispatch();
  const { application } = useSelector((state: any) => state.singleDataReducer);
  const { steps } = useSelector((state: any) => state.listDataReducer);
  useEffect(() => {
    dispatch(ONCHANGE_APPLICATION_SINGLE(null));
    dispatch(ONCHANGE_STEP_LIST([]));
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);

  const _onClickChat = () => {
    setFuncsSub(ModalConstants.CHAT_KEYS.chatApplication);
    handleOpenSub();
  };
  const _onClickApplicationStep = (id: string) => {
    setFuncsSub(ModalConstants.APPLICATION_KEYS.applycationStep);
    handleOpenSub();
  };

  const fetchData = () => {
    if (AuthHelper.isEmployer()) {
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
            dispatch(
              ONCHANGE_STEP_LIST(
                res.data.Data?.job?.process?.steps.sort(
                  (a: any, b: any) => a.number - b.number
                )
              )
            );
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

  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <>
      <ModalBase open={openSub} handleClose={handleCloseSub} funcs={funcsSub} />
      <div className="lg:w-[75%] w-screen bg-white relative rounded">
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
            <div className="content-center flex flex-col gap-2.5 text-sm ">
              <div className="lg:flex justify-between gap-4 content-center">
                <div className="content-center w-full">
                  <label className="font-medium tracking-wide text-sm">
                    Họ và tên
                  </label>
                  <input
                    className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                    type="text"
                    placeholder="Nguyễn Văn A..."
                    disabled
                    value={application?.fullName}
                  />
                </div>
              </div>
              <div className="lg:flex justify-between gap-4 content-center">
                <div className="content-center w-full">
                  <label className="font-medium tracking-wide text-sm">
                    Email
                  </label>
                  <input
                    className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                    type="text"
                    placeholder="candidate@gmail.com"
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
                    placeholder="(+84) xxxxxxxx"
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
            </div>
            <div className="content-center">
              <label className="font-medium tracking-wide">
                Thư giới thiệu:&nbsp;
              </label>

              <div className="text-sm mt-1">
                <TextEditor value={application?.letter} disabled />
              </div>
            </div>

            <div className="content-center">
              <label className="font-medium tracking-wide text-base">
                Quá trình ứng tuyển:&nbsp;
              </label>

              <table className="border-collapse w-full mt-1 text-sm">
                <thead>
                  <tr>
                    <th className="px-1 py-1.5 font-semibold uppercase bg-gray-100 text-gray-600 border border-borderColor htable-cell">
                      STT
                    </th>

                    <th className="px-1 py-1.5 font-semibold   bg-gray-100 text-gray-600 border border-borderColor htable-cell">
                      Tên bước
                    </th>
                    <th className="px-1 py-1.5 font-semibold   bg-gray-100 text-gray-600 border border-borderColor table-cell">
                      Kết quả
                    </th>
                    <th className="px-1 py-1.5 font-semibold   bg-gray-100 text-gray-600 border border-borderColor table-cell">
                      Đánh giá
                    </th>

                    <th className="px-1 py-1.5 font-semibold   bg-gray-100 text-gray-600 border border-borderColor table-cell"></th>
                  </tr>
                </thead>

                <tbody>
                  {steps?.map((item: StepModel, index: number) => (
                    <tr
                      key={index}
                      className="bg-white flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                    >
                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                        {item?.number! + 1}
                      </td>

                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                        {item?.name!}
                      </td>

                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                        {/* <span className="rounded bg-green-400 py-1 px-3 text-sm font-medium text-white ">
                          Pass
                        </span>
                        <span className="rounded bg-red-400 py-1 px-3 text-sm font-medium text-white ">
                        Fail
                      </span> */}
                      </td>
                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                        {/* Hồ sơ phù hợp */}
                      </td>
                      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                        <p
                          className="text-blue-600 hover:text-blue-600/85 cursor-pointer"
                          onClick={() => {
                            _onClickApplicationStep("1");
                          }}
                        >
                          Lịch hẹn
                        </p>
                      </td>
                    </tr>
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

            <div
              ref={chatContainerRef}
              className="w-full px-2 h-full overflow-y-auto scrollbar-custom flex flex-col gap-3"
            >
              <div className="w-full flex flex-start">
                <div className="w-[80%]">
                  <div className="flex items-center gap-3">
                    <img
                      className="h-5 w-5 overflow-hidden rounded-full"
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                      alt=""
                    />
                    <p className="font-semibold  text-sm text-slate-600">
                      Mircel Jones&nbsp;
                      <span className="text-slate-400 text-xs">3:21 PM</span>
                    </p>
                  </div>

                  <div className="mt-3 w-full bg-body p-4 rounded-b-xl rounded-tr-xl">
                    <p className=" text-sm text-slate-500">
                      Hey all, <br />
                      There are many variation of passages of Lorem ipsum
                      avaliable, but the jority have alternation in some form ,
                      by injected humor, or randomise words which don't look
                      even slightly believable.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end">
                <div className="w-[80%]">
                  <div className="flex items-center gap-3 justify-end">
                    <p className="font-semibold text-sm text-slate-600">
                      Me&nbsp;
                      <span className="text-slate-400 text-xs font-normal">
                        3:25 PM
                      </span>
                    </p>

                    <img
                      className="h-5 w-5 overflow-hidden rounded-full"
                      src="https://source.unsplash.com/random/500x500/?face"
                      alt=""
                    />
                  </div>

                  <div className="mt-3 w-full bg-orangetext p-4 rounded-b-xl rounded-tl-xl">
                    <p className=" text-sm text-white">
                      Hey, <br />
                      we are own hidden lake forest which is netural lake are
                      generaly found in mountain.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-start">
                <div className="w-[80%]">
                  <div className="flex items-center gap-3">
                    <img
                      className="h-5 w-5 overflow-hidden rounded-full"
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                      alt=""
                    />
                    <p className="font-semibold  text-sm text-slate-600">
                      Mircel Jones&nbsp;
                      <span className="text-slate-400 text-xs">3:21 PM</span>
                    </p>
                  </div>

                  <div className="mt-3 w-full bg-body p-4 rounded-b-xl rounded-tr-xl">
                    <p className=" text-sm text-slate-500">
                      Hey all, <br />
                      There are many variation of passages of Lorem ipsum
                      avaliable, but the jority have alternation in some form ,
                      by injected humor, or randomise words which don't look
                      even slightly believable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" w-full  px-2  bg-white">
              <div className="h-12 flex gap-4 justify-between px-3 items-center border border-transparent bg-body2 focus-within:border-borderColor rounded-lg">
                <button className="text-slate-600 text-lg">
                  <MdAttachFile />
                </button>
                <input
                  type="text"
                  className="w-full bg-transparent outline-none text-slate-600"
                  placeholder="Nhập tin nhắn.."
                />
                <button className="text-slate-600 text-lg hover:text-orangetext">
                  <IoSend />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 px-4 py-3 border-t  ">
          <button
            className="flex items-center gap-2 w-max h-max px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600/90 font-medium lg:hidden"
            onClick={_onClickChat}
          >
            <AiFillMessage className="text-lg" />
            <p>Trao đổi</p>
          </button>
          <button
            className="flex items-center gap-2 w-max h-max px-4 py-2 bg-slate-300 text-white rounded-md hover:bg-slate-300/90 font-medium"
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
