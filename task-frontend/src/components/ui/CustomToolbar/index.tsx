import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";
import { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { HiDotsVertical } from "react-icons/hi";
import { GrNext, GrPrevious } from "react-icons/gr";

const CustomToolbar = ({ fetchScheduleData, ...props }: any) => {
  const { eventList, fromDate, toDate, optionList, selectedUser, view } =
    useSelector((state: any) => state.scheduleReducer);
  const dropdownRef = useRef<any>(null);
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  function addMonths(date: any, months: any) {
    const d = date.getDate();
    date.setMonth(date.getMonth() + months);
    if (date.getDate() !== d) {
      date.setDate(0);
    }

    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth());
    const first = startOfWeek(new Date(startOfMonth(newDate)), {
      weekStartsOn: 0,
    });

    const end = endOfWeek(new Date(endOfMonth(newDate)), { weekStartsOn: 0 });
    end.setDate(end.getDate() + 1);

    // dispatch(ONCHANGE_FROMDATE(HandleDate.convertDateToISOString(first)));
    // dispatch(ONCHANGE_TODATE(HandleDate.convertDateToISOString(end)));

    return date;
  }

  function addWeeks(date: any, weeks: any) {
    date.setDate(date.getDate() + 7 * weeks);

    const firstDayOfWeek = startOfWeek(new Date(date), { weekStartsOn: 0 });

    const lastDayOfWeek = endOfWeek(new Date(date), { weekStartsOn: 0 });
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 1);

    // dispatch(
    //   ONCHANGE_FROMDATE(HandleDate.convertDateToISOString(firstDayOfWeek))
    // );
    // dispatch(ONCHANGE_TODATE(HandleDate.convertDateToISOString(lastDayOfWeek)));
    return date;
  }

  function addDays(date: any, days: any) {
    date.setDate(date.getDate() + days);
    const first = new Date(date);

    const end = new Date(date);
    end.setDate(end.getDate() + 1);

    // dispatch(ONCHANGE_FROMDATE(HandleDate.convertDateToISOString(first)));
    // dispatch(ONCHANGE_TODATE(HandleDate.convertDateToISOString(end)));

    return date;
  }

  const goToDayView = () => {
    const first = new Date(props.date);

    const end = new Date(props.date);
    end.setDate(end.getDate() + 1);

    // dispatch(ONCHANGE_FROMDATE(HandleDate.convertDateToISOString(first)));
    // dispatch(ONCHANGE_TODATE(HandleDate.convertDateToISOString(end)));
    // dispatch(ONCHANGE_VIEW("day"));
    props.onView("day");
  };

  const goToWeekView = () => {
    const first = startOfWeek(new Date(props.date), {
      weekStartsOn: 0,
    });

    const end = endOfWeek(new Date(props.date), { weekStartsOn: 0 });
    end.setDate(end.getDate() + 1);

    // dispatch(ONCHANGE_FROMDATE(HandleDate.convertDateToISOString(first)));
    // dispatch(ONCHANGE_TODATE(HandleDate.convertDateToISOString(end)));
    // dispatch(ONCHANGE_VIEW("week"));

    props.onView("week");
  };

  const goToMonthView = () => {
    const newDate = new Date(props.date);
    newDate.setMonth(newDate.getMonth());
    const first = startOfWeek(new Date(startOfMonth(newDate)), {
      weekStartsOn: 0,
    });

    const end = endOfWeek(new Date(endOfMonth(newDate)), { weekStartsOn: 0 });
    end.setDate(end.getDate() + 1);

    // dispatch(ONCHANGE_FROMDATE(HandleDate.convertDateToISOString(first)));
    // dispatch(ONCHANGE_TODATE(HandleDate.convertDateToISOString(end)));
    // dispatch(ONCHANGE_VIEW("month"));
    props.onView("month");
  };

  const goToBack = () => {
    if (view === "day") {
      props.onNavigate("prev", addDays(props.date, -1));
    } else if (view === "week") {
      props.onNavigate("prev", addWeeks(props.date, -1));
    } else {
      props.onNavigate("prev", addMonths(props.date, -1));
    }
  };

  const goToNext = () => {
    if (view === "day") {
      props.onNavigate("next", addDays(props.date, +1));
    } else if (view === "week") {
      props.onNavigate("next", addWeeks(props.date, +1));
    } else {
      props.onNavigate("next", addMonths(props.date, +1));
    }
  };

  const goToToday = () => {
    const now = new Date();
    props.date.setMonth(now.getMonth());
    props.date.setYear(now.getFullYear());
    props.date.setDate(now.getDate());
    if (view === "day") {
      const first = new Date(props.date);
      const end = new Date(props.date);
      end.setDate(end.getDate() + 1);
      // dispatch(ONCHANGE_FROMDATE(HandleDate.convertDateToISOString(first)));
      // dispatch(ONCHANGE_TODATE(HandleDate.convertDateToISOString(end)));
    } else if (view === "week") {
      const firstDayOfWeek = startOfWeek(new Date(props.date), {
        weekStartsOn: 0,
      });
      const lastDayOfWeek = endOfWeek(new Date(props.date), {
        weekStartsOn: 0,
      });
      lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 1);
      // dispatch(
      //   ONCHANGE_FROMDATE(HandleDate.convertDateToISOString(firstDayOfWeek))
      // );
      // dispatch(
      //   ONCHANGE_TODATE(HandleDate.convertDateToISOString(lastDayOfWeek))
      // );
    } else {
      const newDate = new Date(props.date);
      newDate.setMonth(newDate.getMonth());
      const first = startOfWeek(new Date(startOfMonth(newDate)), {
        weekStartsOn: 0,
      });

      const end = endOfWeek(new Date(endOfMonth(newDate)), {
        weekStartsOn: 0,
      });
      end.setDate(end.getDate() + 1);
      // dispatch(ONCHANGE_FROMDATE(HandleDate.convertDateToISOString(first)));
      // dispatch(ONCHANGE_TODATE(HandleDate.convertDateToISOString(end)));
    }
    props.onNavigate("current");
  };

  const _handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", _handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", _handleClickOutside);
    };
  }, []);

  return (
    <div className="lg:flex gap-5 justify-between  px-4 lg:px-0 bg-body pb-2">
      <div className="flex justify-between">
        <div className="flex gap-2 lg:gap-3">
          <button
            onClick={goToToday}
            className="py-1 px-3 lg:px-5  font-semibold border border-borderColor rounded-md bg-white w-max lg:mx-0 flex"
          >
            Hôm nay
          </button>
          <button
            onClick={goToBack}
            className="w-[36px] h-[36px] font-semibold border-borderColor border rounded-full bg-white text-4xl flex justify-center items-center"
          >
            <GrPrevious className="p-2.5 lg:p-2" />
          </button>

          <button
            onClick={goToNext}
            className="w-[36px] h-[36px] font-semibold border-borderColor border rounded-full bg-white text-4xl flex justify-center items-center"
          >
            <GrNext className="p-2.5 lg:p-2" />
          </button>
        </div>
        <div
          className="border border-borderColor rounded-md bg-white lg:hidden relative"
          ref={dropdownRef}
        >
          <button
            onClick={() => {
              setOpenDropdown(!openDropdown);
            }}
            className="font-semibold w-[36px] h-[36px] flex justify-center"
          >
            <HiDotsVertical className="text-lg lg:text-xl my-auto" />
          </button>
          {openDropdown && (
            <div className="absolute top-10 right-0 w-max rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-0.5 group z-10">
              <a
                className="flex px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-2"
                onClick={goToMonthView}
              >
                Tháng
              </a>
              <a
                className="flex px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-2"
                onClick={goToWeekView}
              >
                Tuần
              </a>
              <a
                className="flex px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-2"
                onClick={goToDayView}
              >
                Ngày
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="text-center w-full lg:w-max mt-2 mb-2 lg:mt-0 ">
        <h1 className="text-xl font-semibold lg:mt-0.5">
          {moment(props.date).format("DD/MM/YYYY")}
        </h1>
      </div>
      <div className=" border border-borderColor rounded-md bg-white w-max mx-auto lg:mx-0 hidden lg:flex">
        <button
          onClick={goToMonthView}
          className=" py-1 px-5 font-semibold border-borderColor border-r"
        >
          Tháng
        </button>
        <button
          onClick={goToWeekView}
          className="py-1 px-5  font-semibold border-borderColor border-r"
        >
          Tuần
        </button>
        <button
          onClick={goToDayView}
          className="py-1 px-5  font-semibold border-borderColor border-r"
        >
          Ngày
        </button>
      </div>
    </div>
  );
};

export default CustomToolbar;
