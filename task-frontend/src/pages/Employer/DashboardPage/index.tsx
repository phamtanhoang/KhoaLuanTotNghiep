import { AuthHelper, SwalHelper } from "@/utils/helpers";
import {
  StatisticsApplications,
  StatisticsCard,
  StatisticsJobs,
} from "./components";
import { FaClipboardList, FaHouseUser } from "react-icons/fa";
import { MdOutlineContactPage, MdOutlinePendingActions } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { statisticsService } from "@/services";
import { LoadingContext } from "@/App";

const DashboardPage = () => {
  const [count, setCount] = useState<any>([]);
  const context = useContext(LoadingContext);

  useEffect(() => {
    context.handleOpenLoading();
    statisticsService
      .getCount()
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setCount(res.data.Data);
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
  }, []);
  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="grid gap-2  sm:grid-cols-2 xl:grid-cols-4 max-lg:px-4">
          <StatisticsCard
            title="Tin đang tuyển"
            icon={
              <FaClipboardList className="w-full h-full justify-center p-2.5" />
            }
            value={count[0]!}
          />
          <StatisticsCard
            title="Tin chưa duyệt"
            icon={
              <MdOutlinePendingActions className="w-full h-full justify-center p-2.5" />
            }
            value={count[1]!}
          />
          <StatisticsCard
            title="Ứng tuyển chưa duyệt"
            icon={
              <MdOutlineContactPage className="w-full h-full justify-center p-2.5" />
            }
            value={count[2]!}
          />
          {AuthHelper.isEmployer() && (
            <StatisticsCard
              title="Số lượng nhân sự"
              icon={
                <FaHouseUser className="w-full h-full justify-center p-2.5" />
              }
              value={count[3]!}
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-4 lg:rounded-xl">
            <StatisticsJobs title="Công việc đang đăng tuyển" type={true} />
          </div>
          <div className="bg-white p-4 lg:rounded-xl">
            <StatisticsJobs title="Công việc chưa được duyệt" type={false} />
          </div>
        </div>

        <div className="w-full lg:rounded-xl bg-white p-4">
          <StatisticsApplications />
        </div>
      </div>
    </>
  );
};
export default DashboardPage;
