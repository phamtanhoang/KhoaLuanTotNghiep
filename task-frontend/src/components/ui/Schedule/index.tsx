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

  const [subId, setSubId] = useState<any>("");
  const [id, setId] = useState<string>("");
  const _onSelectEvent = (event: Event) => {
    console.log("event,", event);
    setSubId(event?.event_id!);
    setId(event?.application?.id!);
    setFuncs(ModalConstants.APPLICATION_KEYS.detailSchedule);
    handleOpen();
  };
  return (
    <>
      <ModalBase
        fetchData={fetchScheduleData}
        open={open}
        handleClose={handleClose}
        funcs={funcs}
        setFuncs={setFuncs}
        type={true}
        id={id}
        subId={subId}
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
