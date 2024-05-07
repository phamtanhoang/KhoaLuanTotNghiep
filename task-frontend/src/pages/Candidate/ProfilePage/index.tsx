import { Hero } from "@/components/ui";
import { FaEdit } from "react-icons/fa";
import { GiGraduateCap, GiSkills } from "react-icons/gi";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";
import {
  SkillExpEduProps,
  Information,
  UserCard,
  SettingAccount,
} from "./components";
import { GreatJobs } from "@/components/ui";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import ModalBase from "@/components/modal";
import { LoadingContext } from "@/App";
import { candidatesService } from "@/services";
import { SwalHelper, DateHelper } from "@/utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { ONCHANGE_CURRENT_CANDIDATE } from "@/store/reducers/authReducer";
import {
  DataConstants,
  ModalConstants,
  PathConstants,
} from "@/utils/constants";
import { ONCHANGE_SKILL_EXPERIENCE_EDUCATION_LIST } from "@/store/reducers/listDataReducer";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { skills, experiences, educations } = useSelector(
    (state: any) => state.listDataReducer
  );
  const context = useContext(LoadingContext);

  const { currentCandidate } = useSelector((state: any) => state.authReducer);

  const [open, setOpen] = useState(false);
  const [funcs, setFuncs] = useState<string>("");
  const [type, setType] = useState<string>("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const _onClickChangeImage = () => {
    setFuncs(ModalConstants.COMMON_KEYS.changeAvatar);
    handleOpen();
  };

  const _onClickChangeInfo = () => {
    setFuncs(ModalConstants.CANDIDATE_KEYS.changeInfoCandidate);
    handleOpen();
  };
  const _onClickChange = (type: string) => {
    setType(type);
    setFuncs(ModalConstants.CANDIDATE_KEYS.changeExpSkillInfoCandidate);
    handleOpen();
  };
  const fetchProfileData = () => {
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
          dispatch(ONCHANGE_SKILL_EXPERIENCE_EDUCATION_LIST(res.data.Data));
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
  const fetchData = () => {
    fetchProfileData();
    fetchExtraProfile();
  };
  useEffect(() => {
    fetchData();
  }, []);

  const _onClickFindJob = () => {
    context.handleOpenLoading();
    candidatesService
      .updateIsFindJob()
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          fetchProfileData();
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

  const _onClickChangeMyCV = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      context.handleOpenLoading();
      candidatesService
        .uploadCV(e.target.files[0])
        .then((res) => {
          if (res.status === 200 && res.data.Status === 200) {
            SwalHelper.MiniAlert("Tải lên CV thành công", "success");
            fetchProfileData();
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
  const _onClickDeleteCV = () => {
    SwalHelper.Confirm(
      "Xác nhận xóa CV này?",
      "question",
      () => {
        context.handleOpenLoading();
        candidatesService
          .clearCV()
          .then((res) => {
            if (res.status === 200 && res.data.Status === 200) {
              SwalHelper.MiniAlert("Xóa CV thành công", "success");
              fetchProfileData();
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
        linkSearch={PathConstants.EMPLOYER_PATHS.jobs}
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
            <SettingAccount
              myCV={currentCandidate?.cV}
              _onClickChangeMyCV={_onClickChangeMyCV}
              _onClickDeleteCV={_onClickDeleteCV}
              isFindJob={currentCandidate?.isFindJob}
              _onClickFindJob={_onClickFindJob}
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
              <div className="flex flex-col gap-5">
                <div className="bg-white p-5 shadow-sm rounded-sm h-max">
                  <div className="flex items-center font-semibold text-gray-900 leading-8 mb-3 justify-between gap-3">
                    <h2 className="tracking-wide text-lg flex">
                      <span className="text-orangetext text-xl my-auto">
                        <IoNewspaperOutline />
                      </span>
                      &nbsp;&nbsp;Kinh nghiệm làm việc
                    </h2>
                    <button
                      className="text-gray-800 hover:text-orangetext p-1.5"
                      onClick={() =>
                        _onClickChange(DataConstants.TYPE_EXTRA_DATA.EXP)
                      }
                    >
                      <FaEdit className="text-xl" />
                    </button>
                  </div>
                  <ul className="list-inside space-y-2">
                    {experiences?.map(
                      (item: ExperienceModel, index: number) => (
                        <li key={index}>
                          <SkillExpEduProps
                            name={item?.experience}
                            fromDate={DateHelper.formatDate(
                              new Date(item?.fromDate!)
                            )}
                            toDate={
                              item?.toDate == "now"
                                ? "Hiện tại"
                                : DateHelper.formatDate(new Date(item?.toDate!))
                            }
                            description={item?.description}
                          />
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="bg-white p-5 shadow-sm rounded-sm h-max">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3 justify-between gap-3">
                    <h2 className="tracking-wide text-lg flex">
                      <span className="text-orangetext text-2xl my-auto">
                        <GiGraduateCap />
                      </span>
                      &nbsp;&nbsp;Trình độ học vấn
                    </h2>
                    <button
                      className="text-gray-800 hover:text-orangetext p-1.5"
                      onClick={() =>
                        _onClickChange(DataConstants.TYPE_EXTRA_DATA.EDU)
                      }
                    >
                      <FaEdit className="text-xl" />
                    </button>
                  </div>
                  <ul className="list-inside space-y-2">
                    {educations?.map((item: EducationlModel, index: number) => (
                      <li key={index}>
                        <SkillExpEduProps
                          name={item?.education}
                          fromDate={DateHelper.formatDate(
                            new Date(item?.fromDate!)
                          )}
                          toDate={
                            item?.toDate == "now"
                              ? "Hiện tại"
                              : DateHelper.formatDate(new Date(item?.toDate!))
                          }
                          description={item?.description}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <div className="bg-white p-5 shadow-sm rounded-sm h-max">
                  <div className="flex items-center font-semibold text-gray-900 leading-8 mb-3 justify-between gap-3">
                    <h2 className="tracking-wide text-lg flex">
                      <span className="text-orangetext text-xl my-auto">
                        <GiSkills />
                      </span>
                      &nbsp;&nbsp;Kĩ năng
                    </h2>
                    <button
                      className="text-gray-800 hover:text-orangetext p-1.5"
                      onClick={() =>
                        _onClickChange(DataConstants.TYPE_EXTRA_DATA.SKILL)
                      }
                    >
                      <FaEdit className="text-xl" />
                    </button>
                  </div>
                  <ul className="list-inside space-y-2">
                    {skills?.map((item: SkillModel, index: number) => (
                      <li key={index}>
                        <SkillExpEduProps
                          name={item.skill}
                          description={item.description}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
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
