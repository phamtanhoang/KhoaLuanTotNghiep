import { LoadingContext } from "@/App";
import { jobsService } from "@/services";
import { ONCHANGE_JOB_LIST } from "@/store/reducers/listDataReducer";
import { PathConstants } from "@/utils/constants";
import {
  AuthHelper,
  DateHelper,
  SwalHelper,
  TextHelper,
} from "@/utils/helpers";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import EmptyData from "../EmptyData";
import JobCardV2 from "../JobCardV2";

const JobSuitable = () => {
  const location = useLocation();
  const context = useContext(LoadingContext);
  const [jobs, setJobs] = useState<any>([]);
  useEffect(() => {
    context.handleOpenLoading();
    jobsService
      .getSuitable()
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setJobs(res?.data?.Data || "");
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
    context.handleCloseLoading();
  }, []);
  return (
    <>
      {AuthHelper.isCandidate() && (
        <section className="py-12 lg:py-16 bg-white">
          <div className="px-5 lg:px-28 flex justify-between mb-8">
            <div className="text-center lg:text-left w-full lg:w-[50%]">
              <h1 className="text-3xl lg:text-4xl  font-bold tracking-wider mb-4">
                Việc làm <span className="text-orangetext">Phù hợp</span> với
                bạn
              </h1>
              {location.pathname === PathConstants.CANDIDATE_PATHS.home && (
                <p className="text-sm lg:text-base text-gray-600 tracking-wide">
                  Dưới đây là một số việc làm có thể sẽ phù hợp với bạn. Chúng
                  tôi mong muốn sẽ giúp bạn tìm được công việc mơ ước của mình.
                </p>
              )}
            </div>
          </div>

          {jobs?.length > 0 ? (
            <div className="px-5 lg:px-28 grid grid-col-1 lg:grid-cols-3 gap-5">
              <>
                {jobs?.map((item: JobModel, index: number) => (
                  <JobCardV2
                    key={index}
                    employer={item?.employer?.name}
                    name={item?.name}
                    salary={TextHelper.SalaryText(
                      item?.fromSalary,
                      item?.toSalary
                    )}
                    dateline={DateHelper.formatDate(new Date(item?.toDate!))}
                    image={item?.employer?.avatar}
                    isSave={item?.isSave}
                    location={item?.location}
                    id={item?.id}
                    employerId={item?.employer?.id}
                  />
                ))}
              </>
            </div>
          ) : (
            <div className="px-5 lg:px-28 justify-between mx-auto">
              <EmptyData text="Không tìm thấy công việc phù hợp nào!" />
            </div>
          )}
        </section>
      )}
    </>
  );
};
export default JobSuitable;
