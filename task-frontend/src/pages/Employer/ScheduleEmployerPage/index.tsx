import { LoadingContext } from "@/App";
import { Schedule } from "@/components/ui";
import { scheduleService } from "@/services";
import { ONLOAD_EVENTLIST } from "@/store/reducers/scheduleReducer";
import { SwalHelper } from "@/utils/helpers";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ScheduleEmployerPage = () => {
  const context = useContext(LoadingContext);
  const dispatch = useDispatch();
  const { eventList } = useSelector((state: any) => state.scheduleReducer);

  const fetchScheduleData = () => {
    context.handleOpenLoading();
    scheduleService
      .getDataSchedule()
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          const convertedData = res?.data?.Data?.map((item: any) => ({
            event_id: item?.id,
            start: new Date(item?.startDate),
            end: new Date(item?.endDate),
            title: item?.name,
            color: item?.color,
            application: item?.application,
          }));
          dispatch(ONLOAD_EVENTLIST(convertedData));
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
    fetchScheduleData();
  }, []);

  return (
    <>
      <div className="relative w-full l scale-employer bg-white">
        <Schedule value={eventList} fetchScheduleData={fetchScheduleData} />
      </div>
    </>
  );
};
export default ScheduleEmployerPage;
