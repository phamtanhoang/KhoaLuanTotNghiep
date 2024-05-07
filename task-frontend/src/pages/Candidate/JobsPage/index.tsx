import { GreatJobs, JobCard, Loading, PaginationCustom } from "@/components/ui";
import { JobDetailCard, SearchJob } from "./components";
import "react-tooltip/dist/react-tooltip.css";
import { useEffect, useState } from "react";
import ModalBase from "@/components/modal";
import { jobsService } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { ONCHANGE_JOB_LIST } from "@/store/reducers/listDataReducer";
import { DateHelper, SwalHelper, TextHelper } from "@/utils/helpers";
import { EmptyData } from "@/components/ui";
import { ModalConstants } from "@/utils/constants";
import {
  CLEAR_PAGINATION_STATE,
  ONCHANGE_CURRENTPAGE,
  ONCHANGE_PAGINATION,
} from "@/store/reducers/paginationState";
import { ONCHANGE_JOB_SINGLE } from "@/store/reducers/singleDataReducer";
import { useLocation } from "react-router-dom";

const JobsPage: React.FC = () => {
  const { state } = useLocation();

  const dispatch = useDispatch();
  const { totalPages, currentPage, itemPerPage, isEmpty } = useSelector(
    (state: any) => state.paginationReducer
  );
  const { jobs } = useSelector((state: any) => state.listDataReducer);
  const { job } = useSelector((state: any) => state.singleDataReducer);

  const [open, setOpen] = useState(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [id, setId] = useState<string>("");

  const [name, setName] = useState<string>(state?.name || "");
  const [location, setLocation] = useState<string>(state?.location || "");

  const [category, setCategory] = useState<string | null>(null);
  const [tag, setTag] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);
  const [dateSubmit, setDateSubmit] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);

  const fetchSingleData = (job: JobModel) => {
    setIsLoadingDetail(true);
    jobsService
      .getDetail_Public(job.id!)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(ONCHANGE_JOB_SINGLE(res.data.Data || null));
        } else {
          SwalHelper.MiniAlert(res.data.Message, "error");
        }
      })
      .catch(() => {
        SwalHelper.MiniAlert("Có lỗi xảy ra", "error");
      })
      .finally(() => {
        setIsLoadingDetail(false);
      });
  };

  const fetchListData = () => {
    setIsLoading(false);
    jobsService
      .getList_Public(
        name,
        location,
        category || "",
        tag || "",
        dateSubmit || "",
        experience || "",
        type || "",
        currentPage,
        itemPerPage
      )
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(ONCHANGE_JOB_LIST(res.data.Data?.content || []));
          dispatch(ONCHANGE_PAGINATION(res.data.Data));
          if (res.data.Data) {
            fetchSingleData(res.data.Data.content[0]);
          }
        } else {
          SwalHelper.MiniAlert(res.data.Message, "error");
        }
      })
      .catch(() => {
        SwalHelper.MiniAlert("Có lỗi xảy ra", "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    dispatch(CLEAR_PAGINATION_STATE());
  }, []);
  useEffect(() => {
    fetchListData();
  }, [
    name,
    location,
    currentPage,
    experience,
    category,
    tag,
    type,
    dateSubmit,
  ]);

  const _onClickApplyJob = (id: string) => {
    setId(id);
    handleOpen();
    setFuncs(ModalConstants.APPLICATION_KEYS.applyJob);
  };
  const _onClickSaveJob = (id: string) => {
    alert(1);
  };
  const _onClickUnSaveJob = (id: string) => {
    alert(1);
  };
  const _onClickLogin = () => {
    handleOpen();
    setFuncs(ModalConstants.AUTH_KEYS.signin);
  };

  return (
    <>
      <ModalBase
        id={id}
        fetchData={fetchSingleData}
        open={open}
        handleClose={handleClose}
        funcs={funcs}
      />
      <SearchJob
        name={name}
        setName={setName}
        location={location}
        setLocation={setLocation}
        setCategory={setCategory}
        setDateSubmit={setDateSubmit}
        setExperience={setExperience}
        setTag={setTag}
        setType={setType}
      />
      <section className="pb-10 pt-8 ">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {isEmpty ? (
              <div className="px-5 lg:px-28 justify-between mx-auto">
                <EmptyData text="Chưa tìm thấy tin tuyển dụng phù hợp với yêu cầu của bạn" />
              </div>
            ) : (
              <>
                <div className="w-full lg:w-[85%] px-2 lg:px-0 mx-auto">
                  <div
                    className="hidden lg:inline-block sticky top-[72px] mr-[12px]"
                    style={{ width: "calc(55% - 12px)" }}
                  >
                    <JobDetailCard
                      id={job?.id}
                      name={job?.name}
                      status={job?.status}
                      employerName={job?.employer?.name}
                      employerId={job?.employer?.id}
                      fromDate={DateHelper.formatDate(job?.fromDate)}
                      toDate={DateHelper.formatDate(job?.toDate)}
                      category={job?.category?.name || "Khác"}
                      image={job?.employer?.image}
                      experience={job?.experience}
                      salary={TextHelper.SalaryText(
                        job?.fromSalary,
                        job?.toSalary
                      )}
                      location={job?.location}
                      tags={job?.tags}
                      description={job?.description}
                      totalStep={job?.steps?.length || 1}
                      _onClickApplyJob={_onClickApplyJob}
                      _onClickLogin={_onClickLogin}
                      _onClickSaveJob={_onClickSaveJob}
                      _onClickUnSaveJob={_onClickUnSaveJob}
                      isLoading={isLoadingDetail}
                      isTimeUp={job?.isTimeUp}
                      isApply={job?.isApply}
                      isSave={job?.isSave}
                    />
                  </div>
                  <div className="w-full inline-block align-top lg:w-[45%]">
                    {jobs?.map((item: JobModel, index: number) => (
                      <div
                        key={index}
                        className={` ${
                          index != jobs.length - 1 && "mb-[4px]"
                        }  `}
                        onClick={() => fetchSingleData(item)}
                      >
                        <JobCard
                          id={item?.id}
                          image={item?.employer?.image}
                          name={item?.name}
                          dateline={DateHelper.formatDate(job?.toDate)}
                          employer={item?.employer?.name}
                          location={item?.location}
                          salary={TextHelper.SalaryText(
                            item?.fromSalary,
                            item?.toSalary
                          )}
                          isVip={item.isVip}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-max mx-auto mt-8">
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
          </>
        )}
      </section>
      <GreatJobs />
    </>
  );
};

export default JobsPage;
