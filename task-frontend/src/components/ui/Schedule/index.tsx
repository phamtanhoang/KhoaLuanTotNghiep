import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "../CustomToolbar";
const localizer = momentLocalizer(moment);

interface ScheduleProps {
  value?: Event[];
  fetchScheduleData?: () => void;
}

const Schedule: React.FC<ScheduleProps> = ({ value, fetchScheduleData }) => {
  const _onSelectEvent = () => {};
  return (
    <>
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
