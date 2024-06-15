import { LoadingContext } from "@/App";
import { EmptyData, JobCardV2 } from "@/components/ui";
import { jobsService } from "@/services";
import { ONCHANGE_JOB_LIST } from "@/store/reducers/listDataReducer";
import {
  ONCHANGE_CURRENTPAGE,
  ONCHANGE_PAGINATION,
} from "@/store/reducers/paginationState";
import { DateHelper, SwalHelper, TextHelper } from "@/utils/helpers";
import { is } from "date-fns/locale";
import { useContext, useEffect } from "react";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";

interface JobsSimilarProps {
  id: string;
}
const JobsSimilar: React.FC<JobsSimilarProps> = ({ id }) => {
  const context = useContext(LoadingContext);
  const dispatch = useDispatch();
  const { jobs } = useSelector((state: any) => state.listDataReducer);
  const { currentPage, isEmpty, isFirst, isLast } = useSelector(
    (state: any) => state.paginationReducer
  );
  useEffect(() => {
    context.handleOpenLoading();
    jobsService
      .getSimilar(id, currentPage - 1, 9)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(ONCHANGE_JOB_LIST(res?.data?.Data || ""));
          dispatch(ONCHANGE_PAGINATION(res.data.Data));
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
  }, [id]);
  return (
    <>
      <section className="py-12 lg:py-16 bg-white">
        <div className="px-5 lg:px-28 flex justify-between mb-8 text-gray-700">
          <div className="text-center lg:text-left w-full lg:w-[50%]">
            <h1 className="text-3xl  font-bold tracking-wider font-lato ">
              Việc làm <span className="text-orangetext">Liên Quan</span>
            </h1>
          </div>
          <div className=" flex-row justify-between items-end gap-4 hidden lg:flex">
            {isFirst && (
              <button
                className=""
                onClick={() => {
                  dispatch(ONCHANGE_CURRENTPAGE(currentPage - 1));
                }}
              >
                <TfiArrowCircleLeft className="text-4xl hover:text-orangetext" />
              </button>
            )}
            {isLast && (
              <button
                className=""
                onClick={() => {
                  dispatch(ONCHANGE_CURRENTPAGE(currentPage - 1));
                }}
              >
                <TfiArrowCircleRight className="text-4xl hover:text-orangetext" />
              </button>
            )}
          </div>
        </div>

        {isEmpty ? (
          <div className="px-5 lg:px-28 justify-between mx-auto">
            <EmptyData text="Không tìm thấy công việc tương tự nào!" />
          </div>
        ) : (
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
        )}
      </section>
    </>
  );
};
export default JobsSimilar;
