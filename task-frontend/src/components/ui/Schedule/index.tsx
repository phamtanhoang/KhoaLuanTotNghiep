import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "../CustomToolbar";
import ModalBase from "@/components/modal";
import { useState } from "react";
import { ModalConstants } from "@/utils/constants";
const localizer = momentLocalizer(moment);

interface ScheduleProps {
  value?: Event[];
  fetchScheduleData?: () => void;
}

const Schedule: React.FC<ScheduleProps> = ({ value, fetchScheduleData }) => {
  const [open, setOpen] = useState(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [eventId, setEventId] = useState<string>("");
  const [applicationId, setApplicationId] = useState<string>("");
  const _onSelectEvent = (event: Event) => {
    setEventId(event?.event_id!);
    setFuncs(ModalConstants.APPLICATION_KEYS.detailStepSchedule);
    handleOpen();
  };
  return (
    <>
      <ModalBase
        stepId={eventId}
        fetchData={fetchScheduleData}
        open={open}
        handleClose={handleClose}
        funcs={funcs}
        setFuncs={setFuncs}
        setApplicationId={setApplicationId}
        id={applicationId}
      />
      <Calendar
        step={15}
        timeslots={4}
        localizer={localizer}
        events={value}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%", overflowY: "auto" }}
        className="scrollbar-custom"
        views={["day", "week", "month"]}
        defaultDate={new Date()}
        defaultView="month"
        onSelectEvent={_onSelectEvent}
        eventPropGetter={(event: Event) => {
          const style = {
            backgroundColor: event.color || "gray",
            color: "white",
            borderRadius: "5px",
          };

          return {
            style,
          };
        }}
        components={{
          toolbar: (props: any) => (
            <CustomToolbar {...props} fetchScheduleData={fetchScheduleData} />
          ),
        }}
        messages={{
          showMore: (total) => `+ ${total}`,
        }}
      />
    </>
  );
};
export default Schedule;
