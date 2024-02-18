// import { useEffect, useState } from "react";
// import { ScheduleBody, ScheduleHeader } from "./components";
// import { DateConstants } from "@/utils/constants/dateConstants";

// const Schedule = () => {
//   const [month, setMonth] = useState<number>(0);
//   const [year, setYear] = useState<number>(0);
//   const [noOfDays, setNoOfDays] = useState<number[]>([]);
//   const [blankdays, setBlankdays] = useState<number[]>([]);

//   useEffect(() => {
//     const today = new Date();
//     setMonth(today.getMonth());
//     setYear(today.getFullYear());
//     setNoOfDays(getDaysArray());
//   }, []);

//   const initDate = () => {
//     const today = new Date();
//     setMonth(today.getMonth());
//     setYear(today.getFullYear());
//     setNoOfDays(getDaysArray());
//   };

//   const isToday = (date: number) => {
//     const today = new Date();
//     const d = new Date(Number(year), Number(month), date);
//     return today.toDateString() === d.toDateString();
//   };

//   const getDaysArray = () => {
//     const daysInMonth = new Date(Number(year), Number(month) + 1, 0).getDate();
//     const dayOfWeek = new Date(Number(year), Number(month)).getDay();
//     const blankdaysArray = Array.from({ length: dayOfWeek }, (_, i) => i + 1);
//     const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

//     setBlankdays(blankdaysArray);
//     return daysArray;
//   };

//   const _onChangeMonth = (type: string) => {
//     switch (type) {
//       case "prev":
//         if (month == 0) {
//           setMonth(DateConstants.MONTHS_OF_YEAR.length - 1);
//           setYear((prevYear) => prevYear - 1);
//         } else {
//           setMonth((prevMonth) => prevMonth - 1);
//         }
//         break;
//       case "next":
//         if (month == DateConstants.MONTHS_OF_YEAR.length - 1) {
//           setMonth(0);
//           setYear((prevYear) => prevYear + 1);
//         } else {
//           setMonth((prevMonth) => prevMonth + 1);
//         }
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <div className="h-screen w-full flex flex-col">
//       <div className="flex items-center justify-between py-2 px-6">
//         <div>
//           <span className="text-lg font-bold text-gray-800">
//             {DateConstants.MONTHS_OF_YEAR[month]}
//           </span>
//           <span className="ml-1 text-lg text-gray-600 font-normal">{year}</span>
//         </div>
//         <div className="border rounded-lg px-1 pt-[2px]">
//           <button
//             type="button"
//             className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center"
//             onClick={() => {
//               _onChangeMonth("prev");
//             }}
//           >
//             Prev
//           </button>
//           <div className="border-r inline-flex h-6"></div>
//           <button
//             type="button"
//             className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex items-center cursor-pointer hover:bg-gray-200 p-1"
//             onClick={() => {
//               _onChangeMonth("next");
//             }}
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* <ScheduleHeader />
//       <div className="flex flex-1 w-full">
//         <ScheduleBody />
//       </div> */}
//     </div>
//   );
// };

import { DateConstants } from "@/utils/constants/dateConstants";
import { useState } from "react";

const Schedule = () => {
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  const dayOfLastMonth = new Date(currentYear, currentMonth, 0).getDay();
  const dayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const isCurrentDate = (day: number) =>
    day === new Date().getDate() &&
    currentMonth === new Date().getMonth() &&
    currentYear === new Date().getFullYear();

  const quantityTR = Math.ceil((dayOfLastMonth + dayOfMonth) / 7);

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between p-2">
          <span className="text-lg font-bold">{`${
            currentMonth + 1
          } ${currentYear}`}</span>
          <div className="buttons">
            <button onClick={handlePrevMonth} className="p-1">
              Previous
            </button>
            <button onClick={handleNextMonth} className="p-1">
              Next
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden mx-auto">
          <div className="flex w-full">
            {DateConstants.DAYS_OF_WEEK.map((day, index) => (
              <div key={index} className="p-2 border-r h-10 xl:text-sm text-xs">
                <span className="xl:block lg:block md:block sm:block hidden">
                  {day.full}
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  {day.short}
                </span>
              </div>
            ))}
          </div>

          <div className="">
            {Array.from({ length: quantityTR }).map((_, rowIndex) => (
              <div key={rowIndex} className="text-center grid grid-cols-7">
                {rowIndex === 0 ? (
                  <>
                    {Array.from({ length: dayOfLastMonth }, (_, index) => {
                      const day = index + 1;

                      return (
                        <div key={index} className="border p-1 bg-gray-100">
                          <p className="rounded-full p-2" onClick={() => {}}>
                            {day}
                          </p>
                        </div>
                      );
                    })}

                    {Array.from(
                      {
                        length:
                          DateConstants.DAYS_OF_WEEK.length - dayOfLastMonth,
                      },
                      (_, index) => {
                        const day = index + 1;

                        return (
                          <div
                            key={index}
                            className="border p-1 bg-gray-100 flex justify-center"
                          >
                            <p
                              className={`rounded-full h-7 w-7 ${
                                isCurrentDate(day)
                                  ? "bg-blue-500 text-white"
                                  : "text-gray-500 bg-white"
                              }`}
                              onClick={() => {}}
                            >
                              {day}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </>
                ) : (
                  <>
                    {Array.from(
                      {
                        length:
                          rowIndex === 0
                            ? dayOfLastMonth
                            : Math.min(7, dayOfMonth),
                      },
                      (_, cellIndex) => {
                        const day =
                          rowIndex === 0
                            ? cellIndex + 1
                            : rowIndex * 7 + cellIndex - dayOfLastMonth + 1;

                        return (
                          <div
                            key={cellIndex}
                            className="border p-1 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"
                          >
                            <div className="flex flex-coloverflow-hidden">
                              <div className="top h-5 w-full relative">
                                {day > 0 && (
                                  <p
                                    className={`absolute top-0 right-0 w-7 h-7  rounded-full ${
                                      isCurrentDate(day)
                                        ? "bg-blue-500 text-white"
                                        : "text-gray-500 bg-white"
                                    }`}
                                    onClick={() => {}}
                                  >
                                    {day}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule;
