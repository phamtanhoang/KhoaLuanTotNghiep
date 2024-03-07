import { useState } from "react";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

const CustomToolbar = (props: any) => {
  const [viewState, setViewState] = useState("month");

  function addMonths(date: any, months: any) {
    const d = date.getDate();
    date.setMonth(date.getMonth() + months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    console.log(date);
    return date;
  }

  function addWeeks(date: any, weeks: any) {
    date.setDate(date.getDate() + 7 * weeks);
    return date;
  }

  function addDays(date: any, days: any) {
    date.setDate(date.getDate() + days);
    console.log(date);
    return date;
  }

  const goToDayView = () => {
    props.onView("day");
    setViewState("day");
  };
  const goToWeekView = () => {
    props.onView("week");
    setViewState("week");
  };
  const goToMonthView = () => {
    props.onView("month");
    setViewState("month");
  };
  const goToAgendaView = () => {
    props.onView("agenda");
    setViewState("agenda");
  };

  const goToBack = () => {
    if (viewState === "month") {
      props.onNavigate("prev", addMonths(props.date, -1));
    } else if (viewState === "week") {
      props.onNavigate("prev", addWeeks(props.date, -1));
    } else {
      props.onNavigate("prev", addDays(props.date, -1));
    }
  };

  const goToNext = () => {
    if (viewState === "month") {
      props.onNavigate("next", addMonths(props.date, +1));
    } else if (viewState === "week") {
      props.onNavigate("next", addWeeks(props.date, +1));
    } else {
      props.onNavigate("next", addDays(props.date, +1));
    }
  };

  const goToToday = () => {
    const now = new Date();
    props.date.setMonth(now.getMonth());
    props.date.setYear(now.getFullYear());
    props.date.setDate(now.getDate());
    props.onNavigate("current");
  };

  return (
    <div className="flex gap-5 justify-between my-2">
      <div className="flex">
        <button
          onClick={goToBack}
          className="bg-[#E6E6E6] py-1.5 px-5 rounded-l-full font-semibold"
        >
          Prev
        </button>
        <button
          onClick={goToToday}
          className="bg-[#E6E6E6] py-1.5 px-5 border-white border-x-2 font-semibold"
        >
          Today
        </button>
        <button
          onClick={goToNext}
          className="bg-[#E6E6E6] py-1.5 px-5 rounded-r-full font-semibold"
        >
          Next
        </button>
      </div>
      <div>
        <label className="text-lg font-semibold">
          {moment(props.date).format("DD/MM/YYYY")}
        </label>
      </div>
      <div className="flex">
        <button
          onClick={goToMonthView}
          className="bg-[#E6E6E6] py-1.5 px-5 rounded-l-full font-semibold border-white border-r-2"
        >
          month
        </button>
        <button
          onClick={goToWeekView}
          className="bg-[#E6E6E6] py-1.5 px-5  font-semibold border-white border-r-2"
        >
          week
        </button>
        <button
          onClick={goToDayView}
          className="bg-[#E6E6E6] py-1.5 px-5  font-semibold border-white border-r-2"
        >
          day
        </button>
        <button
          onClick={goToAgendaView}
          className="bg-[#E6E6E6] py-1.5 px-5 rounded-r-full font-semibold"
        >
          agenda
        </button>
      </div>
    </div>
  );
};

export default CustomToolbar;
