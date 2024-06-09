import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AiFillEye, AiOutlineClose } from "react-icons/ai";
import { IoMdExit } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import { TextEditor } from "@/components/form";
import { LoadingContext } from "@/App";
import { DateHelper, TextHelper } from "@/utils/helpers";
import applicationsService from "@/services/applicationsService";
import { candidatesService } from "@/services";
import { ModalConstants } from "@/utils/constants";
import ModalBase from "../..";
import html2pdf from "html2pdf.js";

const ApplyJob = (props: any) => {
  const context = useContext(LoadingContext);
  const id = props.id;
  const fetchData = props.fetchData;

  const handleClose = props.handleClose;
  const [candidate, setCandidate] = useState<any>(null);
  const [checked, setChecked] = useState<string>("upload");
  const [cvFile, setCVFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [coverLetter, setCoverLetter] = useState<string>(
    TextHelper.ApplicationHelper
  );

  const [openSub, setOpenSub] = useState(false);
  const [funcsSub, setFuncsSub] = useState<string>("");
  const handleOpenSub = () => setOpenSub(true);
  const handleCloseSub = () => setOpenSub(false);

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

    if (checked == "upload") {
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
    } else if (checked == "choose") {
      context.handleOpenLoading();
      applicationsService
        .applyJob_Link(id, name, email, phoneNumber, coverLetter, candidate?.cV)
        .then((res) => {
          if (res.status === 200 && res.data.Status === 200) {
            handleClose();
            fetchData(id);
            SwalHelper.MiniAlert(res.data.Message, "success");
          } else if (res.status === 413) {
            SwalHelper.MiniAlert(
              "File quá lớn vui lòng chọn file nhỏ hơn!",
              "error"
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
    } else if (checked == "generate") {
      context.handleOpenLoading();

      const element = document.getElementById("pdf");

      var opt = {
        margin: [0.5, 0.8, 0.5, 0.8],
        filename: `CV_${candidate?.id}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "p" },
      };

      html2pdf()
        .set(opt)
        .from(element)
        .outputPdf("blob")
        .then((pdfBlob: Blob) => {
          const pdfFile = new File([pdfBlob], `CV_${candidate?.id}.pdf`, {
            type: "application/pdf",
          });
          applicationsService
            .applyJob_File(id, name, email, phoneNumber, coverLetter, pdfFile)
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
        })
        .catch(() => {
          SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
          context.handleCloseLoading();
        });
    } else {
      SwalHelper.MiniAlert("Vui lòng chọn loại cv!", "warning");
    }
  };
  const _onChangeCoverLetter = (event: any, editor: any) => {
    const data = editor.getData();
    setCoverLetter(data);
  };

  const fetchInfo = () => {
    context.handleOpenLoading();

    candidatesService
      .getDetail_Candidate()
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setCandidate(res?.data?.Data);
          setName(`${res?.data?.Data?.firstName} ${res?.data?.Data?.lastName}`);
          setEmail(res?.data?.Data?.email);
          setPhoneNumber(res?.data?.Data?.phoneNumber);
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
    fetchInfo();
  }, []);
  const _onClickCV = () => {
    setFuncsSub(ModalConstants.CANDIDATE_KEYS.candidateCV);
    handleOpenSub();
  };
  return (
    <div className="lg:w-[42%] w-screen bg-white relative rounded">
      <ModalBase open={openSub} handleClose={handleCloseSub} funcs={funcsSub} />
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
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    className="cursor-pointer relative h-4 w-4 rounded-md border my-auto accent-bgBlue"
                    checked={checked == "upload" ? true : false}
                    onClick={() => setChecked("upload")}
                  />
                  <label
                    htmlFor="isExChange"
                    className="cursor-pointer text-slate-500 flex justify-center items-center font-bold pl-2 pr-2 bg-slate-200 uppercase text-xs py-0.5"
                    onClick={() => setChecked("upload")}
                  >
                    Tải CV lên từ máy của tôi
                  </label>
                </div>

                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    className="cursor-pointer relative h-4 w-4 rounded-md border my-auto accent-bgBlue"
                    checked={checked == "choose" ? true : false}
                    disabled={candidate?.cV ? false : true}
                    onClick={() => {
                      candidate?.cV && setChecked("choose");
                    }}
                  />
                  <label
                    htmlFor="isExChange"
                    className={`cursor-pointer  flex justify-center items-center font-bold pl-2 pr-2  uppercase text-xs py-0.5 ${
                      candidate?.cV
                        ? "text-slate-500 bg-slate-200"
                        : "text-slate-300 bg-slate-100"
                    }`}
                    onClick={() => {
                      candidate?.cV && setChecked("choose");
                    }}
                  >
                    Chọn CV trong thư viện của tôi
                  </label>{" "}
                  <AiFillEye
                    className={`cursor-pointer  text-xl  ${
                      candidate?.cV
                        ? "hover:text-orangetext"
                        : "text-slate-300 "
                    }`}
                    onClick={() =>
                      candidate?.cV && window.open(candidate?.cV, "_blank")
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    className="cursor-pointer relative h-4 w-4 rounded-md border my-auto accent-bgBlue"
                    checked={checked == "generate" ? true : false}
                    disabled={candidate?.cV ? false : true}
                    onClick={() => {
                      candidate?.cV && setChecked("generate");
                    }}
                  />
                  <label
                    htmlFor="isExChange"
                    className="cursor-pointer text-slate-500 flex justify-center items-center font-bold pl-2 pr-2 bg-slate-200 uppercase text-xs py-0.5"
                    onClick={() => {
                      candidate?.cV && setChecked("generate");
                    }}
                  >
                    Tạo CV từ thông tin cá nhân
                  </label>{" "}
                  <AiFillEye
                    className={`cursor-pointer  text-xl  ${
                      candidate?.cV
                        ? "hover:text-orangetext"
                        : "text-slate-300 "
                    }`}
                    onClick={_onClickCV}
                  />
                </div>

                {checked == "upload" && (
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
                  </>
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
      <div className="mx-4 text-gray-700 text-sm hidden">
        <div id="pdf" className="mb-2">
          {/* <div className="flex justify-center mb-3">
                <img
                    src={candidate?.avatar ? candidate?.avatar : NON_USER}
                    className="w-24 h-24 rounded-full"
                />
                </div> */}
          <div className="flex gap-3 items-center justify-between">
            <div className="my-auto">
              <h2 className="text-3xl font-semibold">
                {candidate?.firstName} {candidate?.lastName}
              </h2>
              <p className="text-lg text-gray-600 font-medium italic mt-1">
                {candidate?.job}
              </p>
            </div>

            <div className="my-auto text-sm text-gray-700">
              {candidate?.email && (
                <p className="flex gap-1">
                  <span className="">Email:</span>
                  <a
                    href={`mailto:${candidate?.email}`}
                    className="italic font-medium"
                  >
                    {candidate?.email}
                  </a>
                </p>
              )}
              {candidate?.sex && (
                <p className="flex gap-1">
                  <span className="">Giới tính:</span>
                  <p className="italic font-medium">
                    {candidate?.sex == "MALE"
                      ? "Nam"
                      : candidate?.sex == "FEMALE"
                      ? "Nữ"
                      : "Khác"}
                  </p>
                </p>
              )}
              {candidate?.phoneNumber && (
                <p className="flex gap-1">
                  <span className="">Số điện thoại:</span>
                  <a
                    href={`tel:${candidate?.phoneNumber}`}
                    className="italic font-medium"
                  >
                    {candidate?.phoneNumber}
                  </a>
                </p>
              )}
              {candidate?.link && (
                <p className="flex gap-1">
                  <span className="">Liên kết:</span>
                  <a href={candidate?.link} className="italic font-medium">
                    {candidate?.link}
                  </a>
                </p>
              )}
              {candidate?.address && (
                <p className="flex gap-1">
                  <span className="">Địa chỉ:</span>
                  <span className="italic font-medium">
                    {candidate?.address}
                  </span>
                </p>
              )}
            </div>
          </div>
          <hr className="my-4" />
          {candidate?.introduction && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Giới thiệu</h3>
              <p className="text-md leading-relaxed text-justify">
                {candidate?.introduction}
              </p>
            </div>
          )}
          {candidate?.extra?.skills?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Kĩ năng</h3>
              <ul className="text-md">
                {candidate?.extra?.skills?.map((item: any, index: number) => (
                  <li key={index} className="text-justify">
                    <span className="font-medium">-&nbsp;{item?.skill}</span>
                    {item?.description && ": "}
                    {item?.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {candidate?.extra?.experiences?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Kinh nghiệm</h3>
              <div>
                {candidate?.extra?.experiences?.map(
                  (item: any, index: number) => (
                    <div className="mt-2" key={index}>
                      <h4 className="text-base font-medium">
                        -&nbsp;{item?.experience} |{" "}
                        {DateHelper.formatDate2(new Date(item?.fromDate!))} -{" "}
                        {item?.toDate == "now"
                          ? "Hiện tại"
                          : DateHelper.formatDate2(new Date(item?.toDate!))}
                      </h4>
                      <p className="text-md text-gray-600 italic text-justify">
                        &nbsp;&nbsp;&nbsp;{item?.description}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
          {candidate?.extra?.educations?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Học vấn</h3>
              <div>
                {candidate?.extra?.educations?.map(
                  (item: any, index: number) => (
                    <div className="mt-2" key={index}>
                      <h4 className="text-base font-medium">
                        -&nbsp;{item?.education} |{" "}
                        {DateHelper.formatDate2(new Date(item?.fromDate!))} -{" "}
                        {item?.toDate == "now"
                          ? "Hiện tại"
                          : DateHelper.formatDate2(new Date(item?.toDate!))}
                      </h4>
                      <p className="text-md text-gray-600 italic text-justify">
                        &nbsp;&nbsp;&nbsp;{item?.description}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
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
