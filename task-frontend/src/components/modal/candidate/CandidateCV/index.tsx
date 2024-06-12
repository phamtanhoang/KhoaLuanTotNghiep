import { LoadingContext } from "@/App";
import { candidatesService } from "@/services";
import { AuthHelper, DateHelper, SwalHelper } from "@/utils/helpers";
import { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import NON_USER from "@/assets/images/non-user.jpg";
import html2pdf from "html2pdf.js";
const CandidateCV = (props: any) => {
  const context = useContext(LoadingContext);
  const handleClose = props.handleClose;
  const id = props.id;
  const fetchData = props.fetchData;
  const [candidate, setCandidate] = useState<any>(null);

  const fetchInfo = () => {
    context.handleOpenLoading();

    candidatesService
      .getDetail_Employer(id)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setCandidate(res?.data?.Data);
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

  const _onClickDownload = () => {
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
      .save()
      .finally(() => {
        context.handleCloseLoading();
      });
  };
  const _onClickSave = () => {
    if (AuthHelper.isEmployer()) {
      context.handleOpenLoading();
      candidatesService
        .followCandidate_Employer(id)
        .then((res) => {
          if (res.status === 200 && res.data.Status === 200) {
            fetchInfo();
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
    } else {
      context.handleOpenLoading();
      candidatesService
        .followCandidate_HR(id)
        .then((res) => {
          if (res.status === 200 && res.data.Status === 200) {
            fetchInfo();
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
    }
  };
  const _onClickUnSave = () => {
    if (AuthHelper.isEmployer()) {
      context.handleOpenLoading();
      candidatesService
        .unfollowCandidate_employer(id)
        .then((res) => {
          if (res.status === 200 && res.data.Status === 200) {
            fetchInfo();
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
    } else {
      context.handleOpenLoading();
      candidatesService
        .unfollowCandidate_HR(id)
        .then((res) => {
          if (res.status === 200 && res.data.Status === 200) {
            fetchInfo();
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
    }
  };
  return (
    <>
      <div className="lg:w-[60%] w-screen bg-white relative rounded">
        <div className="flex justify-between gap-4 px-4 py-3 text-white border-b border-borderColor bg-orangetext rounded-t">
          <h2 className="text-xl font-semibold  line-clamp-1 my-auto">
            Thông tin ứng viên
          </h2>
          <button
            className="p-1 rounded-md text-lg hover:text-orangetext hover:bg-white"
            onClick={handleClose}
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="flex">
          <div className="overflow-auto scrollbar-custom h-[80vh] my-2 mr-1 w-[70%]">
            <div className="mx-4 text-gray-700 flex flex-col  text-sm">
              <div id="pdf" className="mb-2">
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
                        <a
                          href={candidate?.link}
                          className="italic font-medium"
                        >
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
                      {candidate?.extra?.skills?.map(
                        (item: any, index: number) => (
                          <li key={index} className="text-justify">
                            <span className="font-medium">
                              -&nbsp;{item?.skill}
                            </span>
                            {item?.description && ": "}
                            {item?.description}
                          </li>
                        )
                      )}
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
                              {DateHelper.formatDate2(
                                new Date(item?.fromDate!)
                              )}{" "}
                              -{" "}
                              {item?.toDate == "now"
                                ? "Hiện tại"
                                : DateHelper.formatDate2(
                                    new Date(item?.toDate!)
                                  )}
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
                              {DateHelper.formatDate2(
                                new Date(item?.fromDate!)
                              )}{" "}
                              -{" "}
                              {item?.toDate == "now"
                                ? "Hiện tại"
                                : DateHelper.formatDate2(
                                    new Date(item?.toDate!)
                                  )}
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
          </div>
          <div className="bg-gray-200 py-10 w-[30%] px-3">
            <img
              className="mb-3 w-36 h-36 rounded-full mx-auto border-2 border-orangetext"
              src={candidate?.avatar ? candidate?.avatar : NON_USER}
              alt="avatar"
            />
            <h1 className="text-2xl text-gray-800 text-center font-semibold mb-1.5">
              {candidate?.firstName} {candidate?.lastName}
            </h1>
            <h3 className="text-lg text-gray-600 text-center font-medium">
              {candidate?.job}
            </h3>
            <div className="flex flex-col gap-3 mt-5">
              <button
                className="group relative h-11 w-full overflow-hidden rounded bg-blue-600 text-lg font-semibold text-white"
                onClick={_onClickDownload}
              >
                Tải xuống
                <div className="absolute inset-0 h-full w-full scale-0 rounded transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
              </button>
              {candidate?.isSaved ? (
                <button
                  className="group relative h-11 w-full overflow-hidden rounded bg-blue-600 text-lg font-semibold text-white"
                  onClick={_onClickUnSave}
                >
                  Bỏ lưu ứng viên
                  <div className="absolute inset-0 h-full w-full scale-0 rounded transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                </button>
              ) : (
                <button
                  className="group relative h-11 w-full overflow-hidden rounded bg-blue-600 text-lg font-semibold text-white"
                  onClick={_onClickSave}
                >
                  Lưu ứng viên
                  <div className="absolute inset-0 h-full w-full scale-0 rounded transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CandidateCV;
