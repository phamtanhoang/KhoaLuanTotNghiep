import { Hero } from "@/components/ui";
import { LeftPage, RightPage } from "./components";
import { GreatJobs } from "@/components/ui";
import { useContext, useEffect, useState } from "react";
import ModalBase from "@/components/modal";
import { useParams } from "react-router-dom";
import { jobsService } from "@/services";
import { DateHelper, SwalHelper, TextHelper } from "@/utils/helpers";
import { LoadingContext } from "@/App";
import { ModalConstants, PathConstants } from "@/utils/constants";

const JobDetailPage = () => {
  const context = useContext(LoadingContext);
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [job, setJob] = useState<JobModel>();
  const [steps, setSteps] = useState<StepModel[]>([]);
  const [tags, setTags] = useState<TagModel[]>([]);

  const _onClickApplyJob = () => {
    handleOpen();
    setFuncs(ModalConstants.APPLICATION_KEYS.applyJob);
  };
  const _onClickLogin = () => {
    handleOpen();
    setFuncs(ModalConstants.AUTH_KEYS.signin);
  };
  const _onClickSaveJob = (id: string) => {
    context.handleOpenLoading();
    jobsService
      .saveJob(id!)
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
  };
  const _onClickUnSaveJob = (id: string) => {
    context.handleOpenLoading();
    jobsService
      .unSaveJob(id!)
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
  };
  const fetchData = async () => {
    context.handleOpenLoading();
    jobsService
      .getDetail_Public(id!)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setJob(res.data.Data);
          setTags(res.data.Data.tags);
          setSteps(res.data.Data.process?.steps);
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
  return (
    <>
      <ModalBase id={id} open={open} handleClose={handleClose} funcs={funcs} />
      <Hero
        title="Chi tiết tuyển dụng"
        linkSearch={PathConstants.CANDIDATE_PATHS.jobs}
        titleSearch="Tuyển dụng khác"
      />
      <section className="pb-10 pt-5 lg:pt-8 bg-gray-100">
        <div className="w-full lg:w-[80%] px-2 lg:px-0 mx-auto flex lg:flex-row flex-col lg:gap-5">
          <div className="w-full lg:w-8/12 flex flex-col mx-auto">
            <LeftPage
              id={job?.id!}
              image={job?.employer?.image}
              status={job?.status}
              employer={job?.employer?.name}
              category={job?.category?.name || "Khác"}
              name={job?.name}
              description={job?.description}
              experience={job?.experience}
              fromDate={DateHelper.formatDate(job?.created)}
              toDate={DateHelper.formatDate(new Date(job?.toDate!))}
              location={job?.location}
              salary={TextHelper.SalaryText(job?.fromSalary, job?.toSalary)}
              isVip={job?.isVip}
              isSaved={job?.isSave}
              isApplied={job?.isApply}
              isTimeUp={job?.isTimeUp}
              _onClickApplyJob={_onClickApplyJob}
              _onClickSaveJob={_onClickSaveJob}
              _onClickLogin={_onClickLogin}
              _onClickUnSaveJob={_onClickUnSaveJob}
            />
          </div>
          <div className="w-full lg:w-4/12 lg:flex flex-col gap-5">
            <RightPage
              id={job?.employer?.id}
              employer={job?.employer?.name}
              email={job?.employer?.email}
              phoneNumber={job?.employer?.phoneNumber}
              steps={steps}
              tags={tags}
            />
          </div>
        </div>
      </section>
      <GreatJobs />
    </>
  );
};
export default JobDetailPage;
