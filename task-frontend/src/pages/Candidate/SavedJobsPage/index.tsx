import { LoadingContext } from "@/App";
import { EmptyData, Hero, Loading, PaginationCustom } from "@/components/ui";
import { GreatJobs, JobCard, Pagination, SearchJobs } from "@/components/ui";
import { jobsService } from "@/services";
import { ONCHANGE_JOB_LIST } from "@/store/reducers/listDataReducer";
import {
  CLEAR_PAGINATION_STATE,
  ONCHANGE_CURRENTPAGE,
  ONCHANGE_PAGINATION,
} from "@/store/reducers/paginationState";
import { PathConstants } from "@/utils/constants";
import { DateHelper, SwalHelper, TextHelper } from "@/utils/helpers";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SavedJobsPage = () => {
  const context = useContext(LoadingContext);
  const dispatch = useDispatch();
  const { totalPages, currentPage, itemPerPage, isEmpty } = useSelector(
    (state: any) => state.paginationReducer
  );
  const { jobs } = useSelector((state: any) => state.listDataReducer);

  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    dispatch(ONCHANGE_JOB_LIST([]));
    dispatch(CLEAR_PAGINATION_STATE());
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    jobsService
      .getSavedJobs(name, location, currentPage - 1, itemPerPage)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(ONCHANGE_JOB_LIST(res.data.Data?.content || []));
          dispatch(ONCHANGE_PAGINATION(res.data.Data));
        } else {
          SwalHelper.MiniAlert(res.data.Message, "error");
        }
      })
      .catch(() => {
        SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [name, location, currentPage]);
  return (
    <>
      <Hero
        title="Công việc đã lưu"
        linkSearch={PathConstants.CANDIDATE_PATHS.jobs}
        titleSearch="Tuyển dụng khác"
      />
      <section className="pb-10 pt-8">
        <div className="w-full lg:w-[80%] px-5 lg:px-0 mx-auto flex flex-col lg:gap-5  rounded-md">
          <SearchJobs
            name={name}
            location={location}
            setName={setName}
            setLocation={setLocation}
          />
          {isLoading ? (
            <Loading />
          ) : isEmpty ? (
            <div className="px-5 lg:px-28 justify-between mx-auto">
              <EmptyData text="Không có tin tuyển dụng nào được lưu!" />
            </div>
          ) : (
            <>
              <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
                {jobs.map((item: JobModel, index: number) => (
                  <JobCard
                    key={index}
                    id={item?.id}
                    image={item?.employer?.avatar}
                    name={item?.name}
                    dateline={DateHelper.formatDate(new Date(item?.toDate!))}
                    employer={item?.employer?.name}
                    location={item?.location}
                    salary={TextHelper.SalaryText(
                      item?.fromSalary,
                      item?.toSalary
                    )}
                    isVip={item?.isVip}
                    fetchData={fetchData}
                    isSave={item?.isSave}
                  />
                ))}
              </div>
              <div className="w-max mx-auto mt-5">
                <PaginationCustom
                  currentPage={currentPage}
                  setCurrentPage={(page: number) =>
                    dispatch(ONCHANGE_CURRENTPAGE(page))
                  }
                  totalPages={totalPages}
                  type={true}
                />
              </div>
            </>
          )}
        </div>
      </section>
      <GreatJobs />
    </>
  );
};
export default SavedJobsPage;
