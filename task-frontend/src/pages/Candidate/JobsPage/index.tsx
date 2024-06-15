import {
  GreatJobs,
  JobCard,
  JobSuitable,
  Loading,
  PaginationCustom,
} from "@/components/ui";
import { JobDetailCard, SearchJob } from "./components";
import "react-tooltip/dist/react-tooltip.css";
import { useContext, useEffect, useState } from "react";
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
import { LoadingContext } from "@/App";

const JobsPage: React.FC = () => {
  const { state } = useLocation();

  const context = useContext(LoadingContext);
  const dispatch = useDispatch();
  const { totalPages, currentPage, isEmpty } = useSelector(
    (state: any) => state.paginationReducer
  );
  const itemPerPage = 20;
  const { jobs } = useSelector((state: any) => state.listDataReducer);
  const { job } = useSelector((state: any) => state.singleDataReducer);

  const [open, setOpen] = useState(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [id, setId] = useState<string>("");

  const [name, setName] = useState<string>(state?.name || "");
  const [location, setLocation] = useState<string>(state?.location || "");

  const [category, setCategory] = useState<string | null>(
    state?.category || null
  );
  const [tag, setTag] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);
  const [dateSubmit, setDateSubmit] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(true);

  const fetchSingleData = (id: string) => {
    setIsLoadingDetail(true);
    jobsService
      .getDetail_Public(id)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(ONCHANGE_JOB_SINGLE(res.data.Data || null));
        } else {
          SwalHelper.MiniAlert(res.data.Message, "error");
        }
      })
      .catch(() => {
        SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
      })
      .finally(() => {
        setIsLoadingDetail(false);
      });
  };

  const fetchListData = (type?: boolean) => {
    setIsLoading(false);
    jobsService
      .getList_Public(
        name,
        location,
        category || "",
        tag || "",
        dateSubmit || "",
        experience || "",
        currentPage - 1,
        itemPerPage
      )
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          dispatch(ONCHANGE_JOB_LIST(res.data.Data?.content || []));
          dispatch(ONCHANGE_PAGINATION(res.data.Data));
          if (res?.data?.Data?.content?.length > 0 && !type) {
            fetchSingleData(res.data.Data.content[0]?.id);
          }
          if (type) {
            fetchSingleData(job?.id!);
          }
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
    dispatch(ONCHANGE_JOB_SINGLE(null));
    dispatch(ONCHANGE_JOB_LIST([]));
    dispatch(CLEAR_PAGINATION_STATE());
  }, []);
  useEffect(() => {
    fetchListData();
  }, [name, location, currentPage, experience, category, tag, dateSubmit]);

  const _onClickApplyJob = (id: string) => {
    setId(id);
    handleOpen();
    setFuncs(ModalConstants.APPLICATION_KEYS.applyJob);
  };
  const _onClickSaveJob = (id: string) => {
    context.handleOpenLoading();
    jobsService
      .saveJob(id!)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          fetchListData(true);
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
  };
  const _onClickUnSaveJob = (id: string) => {
    context.handleOpenLoading();
    jobsService
      .unSaveJob(id!)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          fetchListData(true);
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
        categorySearch={state?.category}
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
                      fromDate={DateHelper.formatDate(job?.created)}
                      toDate={DateHelper.formatDate(new Date(job?.toDate!))}
                      category={job?.category?.name || "Khác"}
                      image={job?.employer?.avatar}
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
                        onClick={() => fetchSingleData(item.id!)}
                      >
                        <JobCard
                          id={item?.id}
                          image={item?.employer?.avatar}
                          name={item?.name}
                          dateline={DateHelper.formatDate(
                            new Date(item?.toDate!)
                          )}
                          employer={item?.employer?.name}
                          location={item?.location}
                          salary={TextHelper.SalaryText(
                            item?.fromSalary,
                            item?.toSalary
                          )}
                          isVip={item?.isVip}
                          fetchData={() => fetchListData(true)}
                          isSave={item?.isSave}
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
      <JobSuitable />
      <GreatJobs />
    </>
  );
};

export default JobsPage;
