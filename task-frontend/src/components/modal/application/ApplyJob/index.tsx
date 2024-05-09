import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AiFillEye, AiOutlineClose } from "react-icons/ai";
import { IoMdExit } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import { TextEditor } from "@/components/form";
import { LoadingContext } from "@/App";
import { useDispatch, useSelector } from "react-redux";
import { TextHelper } from "@/utils/helpers";
import applicationsService from "@/services/applicationsService";

const ApplyJob = (props: any) => {
  const context = useContext(LoadingContext);
  const dispatch = useDispatch();
  const id = props.id;
  const fetchData = props.fetchData;

  const { currentCandidate } = useSelector((state: any) => state.authReducer);
  const handleClose = props.handleClose;
  const [checked, setChecked] = useState<boolean>(true);
  const [cvFile, setCVFile] = useState<File | null>(null);
  const [name, setName] = useState<string>(
    `${currentCandidate?.firstName} ${currentCandidate?.lastName}`
  );
  const [phoneNumber, setPhoneNumber] = useState<string>(
    currentCandidate?.phoneNumber
  );
  const [email, setEmail] = useState<string>(currentCandidate?.email);
  const [coverLetter, setCoverLetter] = useState<string>(
    TextHelper.ApplicationHelper
  );

  const _onClickChooseCV = () => {
    if (checked) document.getElementById("input-CV")?.click();
  };

  const _onChangeCV = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCVFile(e.target.files[0]);
    }
  };
  const _onClickClearCV = () => {
    setCVFile(null);
  };

  const _onClickApply = () => {
    if (!name) {
      SwalHelper.MiniAlert("Vui lòng nhập tên!", "warning");
      return;
    }
    if (!email) {
      SwalHelper.MiniAlert("Vui lòng nhập Email!", "warning");
      return;
    }

    if (!phoneNumber) {
      SwalHelper.MiniAlert("Vui lòng nhập số điện thoại!", "warning");
      return;
    }

    if (checked) {
      if (!cvFile) {
        SwalHelper.MiniAlert("Vui lòng chọn CV!", "warning");
        return;
      }
      var maxFileSizeMB = 1;
      var maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;

      if (cvFile.size > maxFileSizeBytes) {
        SwalHelper.MiniAlert("Vui lòng chọn File dưới 1MB!", "warning");
        return;
      }

      context.handleOpenLoading();
      applicationsService
        .applyJob_File(id, name, email, phoneNumber, coverLetter, cvFile)
        .then((res) => {
          fetchData(id);
          handleClose();
          if (res.status === 200 && res.data.Status === 200) {
            handleClose();
            fetchData(id);
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
    } else {
      context.handleOpenLoading();
      applicationsService
        .applyJob_Link(
          id,
          name,
          email,
          phoneNumber,
          coverLetter,
          currentCandidate?.cV
        )
        .then((res) => {
          if (res.status === 200 && res.data.Status === 200) {
            handleClose();
            fetchData(id);
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
    }
  };
  const _onChangeCoverLetter = (event: any, editor: any) => {
    const data = editor.getData();
    setCoverLetter(data);
  };

  return (
    <div className="lg:w-[45%] w-screen bg-white relative rounded">
      <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-orangetext rounded-t">
        <h2 className="text-xl font-semibold   line-clamp-1 my-auto">
          Đơn ứng tuyển
        </h2>
        <button
          className="p-1 rounded-md text-lg hover:text-orangetext hover:bg-white"
          onClick={handleClose}
        >
          <AiOutlineClose />
        </button>
      </div>

      <div className="overflow-auto scrollbar-custom h-max max-h-[75vh] my-2 mx-1">
        <div className="my-2 mx-3 text-gray-700 flex flex-col gap-4">
          <div className="p-4 border border-orangetext border-dotted rounded-lg flex flex-col gap-2 text-sm ">
            <div className="lg:flex justify-between gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  placeholder="Nguyễn Văn A..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="lg:flex justify-between gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  placeholder="candidate@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  placeholder="(+84) xxxxxxxx"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="content-center">
              <label className="font-medium tracking-wide text-sm">
                Chọn CV để ứng tuyển <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 flex flex-col gap-2 ">
                <div
                  className="flex gap-2 cursor-pointer"
                  onClick={() => setChecked(true)}
                >
                  <input
                    type="checkbox"
                    className="cursor-pointer relative h-4 w-4 rounded-md border my-auto accent-bgBlue"
                    checked={checked == true ? true : false}
                  />
                  <label
                    htmlFor="isExChange"
                    className="cursor-pointer text-slate-500 flex justify-center items-center font-bold pl-2 pr-2 bg-slate-200 uppercase text-xs py-0.5"
                  >
                    Tải CV lên từ máy của tôi
                  </label>
                </div>

                <div
                  className="flex gap-2 cursor-pointer"
                  onClick={() => {
                    currentCandidate?.cV && setChecked(false);
                  }}
                >
                  <input
                    type="checkbox"
                    className="cursor-pointer relative h-4 w-4 rounded-md border my-auto accent-bgBlue"
                    checked={checked == false ? true : false}
                    disabled={currentCandidate?.cV ? false : true}
                  />
                  <label
                    htmlFor="isExChange"
                    className={`cursor-pointer  flex justify-center items-center font-bold pl-2 pr-2  uppercase text-xs py-0.5 ${
                      currentCandidate?.cV
                        ? "text-slate-500 bg-slate-200"
                        : "text-slate-300 bg-slate-100"
                    }`}
                  >
                    Chọn CV trong thư viện của tôi
                  </label>{" "}
                  <AiFillEye
                    className={`cursor-pointer  text-xl  ${
                      currentCandidate?.cV
                        ? "hover:text-orangetext"
                        : "text-slate-300 "
                    }`}
                    onClick={() =>
                      currentCandidate?.cV &&
                      window.open(currentCandidate?.cV, "_blank")
                    }
                  />
                </div>

                {checked && (
                  <>
                    <div
                      className="border-dashed border  p-5 flex flex-col justify-center items-center"
                      onClick={_onClickChooseCV}
                    >
                      <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                        Tải lên CV từ thiết bị của bạn.
                      </p>
                      <input
                        id="input-CV"
                        type="file"
                        multiple
                        className="hidden"
                        accept=".doc,.docx,.pdf"
                        onChange={_onChangeCV}
                      />
                      <button
                        id="button"
                        className="rounded-sm px-3 py-1 bg-slate-200 hover:bg-slate-300 font-medium"
                      >
                        Chọn CV
                      </button>
                    </div>
                    <p className=" text-sm text-gray-400">
                      <span>
                        Loại tệp: .doc, .docs, .pdf. có kích thước dưới 1MB
                      </span>
                    </p>
                  </>
                )}

                {cvFile && (
                  <div className="rounded-md bg-gray-100 py-3 px-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-base font-medium truncate">
                        {cvFile.name}
                      </p>
                      <button className="" onClick={_onClickClearCV}>
                        <AiOutlineClose />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="content-center">
            <label className="font-medium tracking-wide text-lg">
              Thư giới thiệu:&nbsp;
            </label>
            <p className="text-gray-600 font-normal text-sm pb-1">
              Một thư giới thiệu ngắn gọn, chỉn chu sẽ giúp bạn trở nên chuyên
              nghiệp và gây ấn tượng hơn với nhà tuyển dụng.
            </p>
            <div className="text-sm">
              <TextEditor value={coverLetter} onChange={_onChangeCoverLetter} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 px-4 py-3 border-t  ">
        <button
          className="flex items-center gap-2 w-max h-max px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600/90 font-medium"
          onClick={_onClickApply}
        >
          <IoSend className="text-base" />
          <p>Ứng tuyển</p>
        </button>
        <button className="flex items-center gap-2 w-max h-max px-4 py-2 bg-slate-300 text-white rounded-md hover:bg-slate-300/90 font-medium">
          <IoMdExit className="text-lg" />
          <p>Đóng</p>
        </button>
      </div>
    </div>
  );
};
export default ApplyJob;
