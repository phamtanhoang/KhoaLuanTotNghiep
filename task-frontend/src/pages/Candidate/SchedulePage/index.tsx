import { LoadingContext } from "@/App";
import ModalBase from "@/components/modal";
import { Schedule } from "@/components/ui";
import { scheduleService } from "@/services";
import { ONLOAD_EVENTLIST } from "@/store/reducers/scheduleReducer";
import { SwalHelper } from "@/utils/helpers";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SchedulePage = () => {
  const context = useContext(LoadingContext);
  const dispatch = useDispatch();
  const { eventList } = useSelector((state: any) => state.scheduleReducer);

  const [open, setOpen] = useState(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fetchScheduleData = () => {
    context.handleOpenLoading();
    scheduleService
      .getDataSchedule()
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          const convertedData = res?.data?.Data?.map((item: any) => ({
            event_id: item.id,
            start: new Date(item.startDate),
            end: new Date(item.endDate),
            title: item.name,
            color: item.color,
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
      <ModalBase
        open={open}
        handleClose={handleClose}
        funcs={funcs}
        setFuncs={setFuncs}
        fetchData={fetchScheduleData}
      />
      <div className="relative w-full py-2 bg-body">
        <div className="bg-white  h-[100vh]">
          <Schedule value={eventList} fetchScheduleData={fetchScheduleData} />
        </div>
      </div>
    </>
  );
};
export default SchedulePage;
