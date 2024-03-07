import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CustomToolbar } from "./components";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

interface Event {
  start: Date;
  end: Date;
  title: string;
}

const SchedulePage: React.FC = () => {
  const [eventsData, setEventsData] = useState<Event[]>([]);

  const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt("New Event name");
    if (title) {
      const newEvent: Event = {
        start,
        end,
        title,
      };
      setEventsData([...eventsData, newEvent]);
    }
  };

  return (
    <div className="px-5">
      <Calendar
        views={["day", "agenda", "week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event: Event) => alert(event.title)}
        onSelectSlot={handleSelect}
        components={{
          toolbar: (props: any) => <CustomToolbar {...props} />,
        }}
      />
    </div>
  );
};

export default SchedulePage;
