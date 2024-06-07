import { LoadingContext } from "@/App";
import { candidatesService, employersService } from "@/services";
import { AuthHelper, DateHelper, SwalHelper } from "@/utils/helpers";
import { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosRemoveCircleOutline, IoMdExit } from "react-icons/io";
import NON_USER from "@/assets/images/non-user.jpg";
import { PathConstants } from "@/utils/constants";

const CandidateDetail = (props: any) => {
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

  const _onClickUnFollow = () => {
    SwalHelper.Confirm(
      "Xác nhận hủy người theo dõi này?",
      "question",
      () => {
        context.handleOpenLoading();
        employersService
          .unfollow_Employer(id)
          .then((res) => {
            if (res.status === 200 && res.data.Status === 200) {
              fetchData();
              handleClose();
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

  return (
    <>
      <div className="lg:w-[45%] w-screen bg-white relative rounded">
        <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-orangetext rounded-t">
          <h2 className="text-xl font-semibold  line-clamp-1 my-auto">
            Thông tin tài khoản
          </h2>
          <button
            className="p-1 rounded-md text-lg hover:text-orangetext hover:bg-white"
            onClick={handleClose}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="overflow-auto scrollbar-custom h-max max-h-[75vh] my-2 mr-1">
          <div className="mx-4 text-gray-700 flex flex-col  text-sm">
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <div>
                  <img
                    src={candidate?.avatar ? candidate?.avatar : NON_USER}
                    className="w-24 h-24 rounded-full"
                  />
                </div>
                <div className="my-auto">
                  <h2 className="text-2xl font-semibold">
                    {candidate?.firstName} {candidate?.lastName}
                  </h2>
                  <p className="text-base text-gray-600">{candidate?.job}</p>
                </div>
              </div>

              <div className="my-auto">
                {candidate?.phoneNumber && (
                  <p className="text-sm text-gray-600">
                    SĐT: {candidate?.phoneNumber}
                  </p>
                )}
                {candidate?.email && (
                  <p className="text-sm text-gray-600">
                    Email: {candidate?.email}
                  </p>
                )}
                {candidate?.sex && (
                  <p className="text-sm text-gray-600">
                    Giới tính:{" "}
                    {candidate?.sex == "MALE"
                      ? "Nam"
                      : candidate?.sex == "FEMALE"
                      ? "Nữ"
                      : "Khác"}
                  </p>
                )}
                {candidate?.link && (
                  <p className="text-sm text-gray-600">
                    Liên kết: {candidate?.link}
                  </p>
                )}
                {candidate?.address && (
                  <p className="text-sm text-gray-600">
                    Nơi sống: {candidate?.address}
                  </p>
                )}
              </div>
            </div>
            <hr className="my-4" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Giới thiệu</h3>
              <p className="text-sm leading-relaxed ">
                {candidate?.introduction}
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Kĩ năng</h3>
              <ul className="list-disc list-inside text-sm">
                {candidate?.extra?.skills?.map((item: any, index: number) => (
                  <li key={index}>
                    {item?.skill}
                    {item?.description && ": "}
                    {item?.description}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Kinh nghiệm</h3>
              <div>
                {candidate?.extra?.experiences?.map(
                  (item: any, index: number) => (
                    <div className="mt-2" key={index}>
                      <h4 className="text-md font-medium">
                        {item?.experience} |{" "}
                        {DateHelper.formatDate2(new Date(item?.fromDate!))} -{" "}
                        {item?.toDate == "now"
                          ? "Hiện tại"
                          : DateHelper.formatDate2(new Date(item?.toDate!))}
                      </h4>
                      <p className="text-sm text-gray-600 italic">
                        {item?.description}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Học vấn</h3>
              <div>
                {candidate?.extra?.educations?.map(
                  (item: any, index: number) => (
                    <div className="mt-2" key={index}>
                      <h4 className="text-md font-medium">
                        {item?.education} |{" "}
                        {DateHelper.formatDate2(new Date(item?.fromDate!))} -{" "}
                        {item?.toDate == "now"
                          ? "Hiện tại"
                          : DateHelper.formatDate2(new Date(item?.toDate!))}
                      </h4>
                      <p className="text-sm text-gray-600 italic">
                        {item?.description}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 px-4 py-3 border-t">
          {AuthHelper.isEmployer() && PathConstants.EMPLOYER_PATHS.profile && (
            <button
              className="flex items-center gap-2 w-max h-max px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-600/85 font-medium"
              onClick={_onClickUnFollow}
            >
              <IoIosRemoveCircleOutline className="text-xl" />
              <p>Hủy người theo dõi</p>
            </button>
          )}

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
export default CandidateDetail;
