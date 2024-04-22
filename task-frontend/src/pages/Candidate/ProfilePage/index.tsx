import Hero from "@/components/ui/Hero";
import { CANDIDATE_PATHS } from "@/utils/constants/pathConstants";
import { FaPencilAlt } from "react-icons/fa";
import { GiGraduateCap, GiSkills } from "react-icons/gi";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";

import { SkillExpEduProps, Information, UserCard } from "./components";
import { GreatJobs } from "@/components/ui";
import { useContext, useEffect, useState } from "react";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import ModalBase from "@/components/modal";
import { LoadingContext } from "@/App";
import candidatesService from "@/services/candidatesService";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import { DateHelper } from "@/utils/helpers/dateHelper";
import { useDispatch, useSelector } from "react-redux";
import { ONCHANGE_CURRENT_CANDIDATE } from "@/store/reducers/candidateReducer";

const ProfilePage = () => {
  const context = useContext(LoadingContext);
  const dispatch = useDispatch();

  const { currentCandidate } = useSelector(
    (state: any) => state.candidateReducer
  );

  const [open, setOpen] = useState(false);
  const [funcs, setFuncs] = useState<string>("");
  const [type, setType] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const _onClickChangeImage = () => {
    setFuncs(MODAL_KEYS.changeAvatar);
    handleOpen();
  };

  const _onClickChangeInfo = () => {
    setFuncs(MODAL_KEYS.changeInfoCandidate);
    handleOpen();
  };
  const _onClickChange = (type: string) => {
    setType(type);
    setFuncs(MODAL_KEYS.changeExpSkillInfoCandidate);
    handleOpen();
  };
  const fetchData = () => {
    context.handleOpenLoading();
    candidatesService
      .profile()
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(ONCHANGE_CURRENT_CANDIDATE(res.data.Data));
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

  const fetchExtraProfile = () => {
    context.handleOpenLoading();
    candidatesService
      .extraProfile()
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
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
    fetchData();
    fetchExtraProfile();
  }, []);

  return (
    <>
      <ModalBase
        type={type}
        open={open}
        handleClose={handleClose}
        funcs={funcs}
        fetchData={fetchData}
      />
      <Hero
        title="Thông tin tài khoản"
        titleSearch="Tìm việc ngay"
        linkSearch={CANDIDATE_PATHS.jobs}
      />
      <section className="pb-10 pt-8 bg-gray-100">
        <div className="w-full lg:w-[80%] px-5 lg:px-0 mx-auto flex flex-col lg:flex-row gap-5  rounded-md">
          <div className="w-full md:w-3/12 flex flex-col gap-5 ">
            <UserCard
              image={currentCandidate?.avatar}
              name={`${currentCandidate?.firstName} ${currentCandidate?.lastName}`}
              job={currentCandidate?.job}
              description={currentCandidate?.introduction}
              _onClickChangeImage={_onClickChangeImage}
            />
          </div>
          <div className="w-full md:w-9/12 flex flex-col gap-5">
            <div className="bg-white p-5 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                <span className="text-orangetext text-2xl my-auto">
                  <MdInfoOutline />
                </span>
                <span className="tracking-wide text-lg">Thông tin cá nhân</span>
              </div>

              <Information
                firstName={currentCandidate?.firstName}
                lastName={currentCandidate?.lastName}
                address={currentCandidate?.address}
                dateOfBirth={DateHelper.formatDate(
                  currentCandidate?.dateOfBirth
                )}
                email={currentCandidate?.email}
                gender={currentCandidate?.sex}
                link={currentCandidate?.link}
                phoneNumber={currentCandidate?.phoneNumber}
              />
              <button
                className="block w-full text-orangetext hover:text-orange-500 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 mt-4"
                onClick={_onClickChangeInfo}
              >
                Sửa thông tin
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-white p-5 shadow-sm rounded-sm">
                <div className="flex items-center font-semibold text-gray-900 leading-8 mb-3 justify-between gap-3">
                  <h2 className="tracking-wide text-lg flex">
                    <span className="text-orangetext text-xl my-auto">
                      <GiSkills />
                    </span>
                    &nbsp;&nbsp;Kĩ năng
                  </h2>
                  <button
                    className="text-gray-800 hover:text-orangetext p-1.5"
                    onClick={() => _onClickChange("skill")}
                  >
                    <FaPencilAlt />
                  </button>
                </div>
                <ul className="list-inside space-y-2">
                  <li>
                    <SkillExpEduProps
                      name="ReactJs"
                      description="Hiểu về cơ chế component, biết sử dụng các hook, fetch, axios, redux..."
                    />
                  </li>
                </ul>
              </div>
              <div className="bg-white p-5 shadow-sm rounded-sm">
                <div className="flex items-center font-semibold text-gray-900 leading-8 mb-3 justify-between gap-3">
                  <h2 className="tracking-wide text-lg flex">
                    <span className="text-orangetext text-xl my-auto">
                      <IoNewspaperOutline />
                    </span>
                    &nbsp;&nbsp;Kinh nghiệm làm việc
                  </h2>
                  <button
                    className="text-gray-800 hover:text-orangetext p-1.5"
                    onClick={() => _onClickChange("exp")}
                  >
                    <FaPencilAlt />
                  </button>
                </div>
                <ul className="list-inside space-y-2">
                  <li>
                    <SkillExpEduProps
                      name="Công ty dược phẩm Phúc Long"
                      fromDate="06/2020"
                      toDate="02/2024"
                      description="Làm giao hàng và quản lý kho"
                    />
                  </li>
                </ul>
              </div>
              <div className="bg-white p-5 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3 justify-between gap-3">
                  <h2 className="tracking-wide text-lg flex">
                    <span className="text-orangetext text-2xl my-auto">
                      <GiGraduateCap />
                    </span>
                    &nbsp;&nbsp;Trình độ học vấn
                  </h2>
                  <button
                    className="text-gray-800 hover:text-orangetext p-1.5"
                    onClick={() => _onClickChange("edu")}
                  >
                    <FaPencilAlt />
                  </button>
                </div>
                <ul className="list-inside space-y-2">
                  <li>
                    <SkillExpEduProps
                      name="Đại học Mở thành phố Hồ Chí Minh"
                      fromDate="09/2020"
                      toDate="Hiện tại"
                      description="Sinh viên ngành CNTT"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GreatJobs />
    </>
  );
};
export default ProfilePage;
