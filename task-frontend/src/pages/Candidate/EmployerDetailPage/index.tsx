import { LeftPage, RightPage } from "./components";
import { EmptyData, GreatEmployers } from "@/components/ui";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "@/App";
import { AuthHelper, SwalHelper } from "@/utils/helpers";
import { employersService } from "@/services";
import { Hero } from "@/components/ui";
import { PathConstants } from "@/utils/constants";

const EmployerDetailPage = () => {
  const context = useContext(LoadingContext);
  const { id } = useParams();

  const [employer, setEmployer] = useState<EmployerModel>();
  const [jobs, setJobs] = useState<JobModel>();
  const fetchData = () => {
    context.handleOpenLoading();
    employersService
      .getbyId(id!)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setEmployer(res.data.Data);
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
  }, [id]);

  const _onClickFollow = (id: string) => {
    if (!AuthHelper.isCandidate()) {
      SwalHelper.MiniAlert("Vui lòng đăng nhập tài khoàn ứng viên!", "warning");
      return;
    }
    SwalHelper.Confirm(
      `Theo dõi sẽ nhận được thông tin tuyển dụng qua email`,
      "question",
      () => {
        context.handleOpenLoading();
        employersService
          .followEmployer(id!)
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
  const _onClickUnfollow = (id: string) => {
    if (!AuthHelper.isCandidate()) {
      SwalHelper.MiniAlert("Vui lòng đăng nhập tài khoàn ứng viên!", "warning");
      return;
    }
    SwalHelper.Confirm(
      `Bỏ theo dõi sẽ không tiếp tục nhận được thông tin tuyển dụng`,
      "question",
      () => {
        context.handleOpenLoading();
        employersService
          .unfollowEmployer(id!)
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
  return (
    <>
      <Hero
        title="Chi tiết nhà tuyển dụng"
        linkSearch={PathConstants.CANDIDATE_PATHS.employers}
        titleSearch="Nhà tuyển dụng khác"
      />
      <section className="pb-10 pt-5 lg:pt-8 bg-gray-100 ">
        <div className="w-full lg:w-[80%] px-2 lg:px-0 mx-auto flex lg:flex-row flex-col gap-5">
          {employer ? (
            <>
              <div className="w-full lg:w-4/12 flex flex-col gap-3 lg:gap-5">
                <LeftPage
                  id={employer?.id}
                  name={employer?.name}
                  description={employer?.description}
                  image={employer?.image}
                  location={employer?.location}
                  email={employer?.email}
                  phone={employer?.phoneNumber}
                  isVip={employer?.isVip}
                  isFollow={employer?.isFollow}
                  _onClickFollow={_onClickFollow}
                  _onClickUnfollow={_onClickUnfollow}
                />
              </div>
              <div className="w-full lg:w-8/12 flex flex-col mx-auto bg-white rounded-sm ">
                <RightPage
                  id={employer?.id}
                  image={employer?.backgroundImage}
                />
              </div>
            </>
          ) : (
            <div className="px-5 lg:px-28 justify-between mx-auto">
              <EmptyData text="Không tìm thấy nhà tuyển dụng phù hợp với yêu cầu của bạn" />
            </div>
          )}
        </div>
      </section>
      <GreatEmployers />
    </>
  );
};
export default EmployerDetailPage;
