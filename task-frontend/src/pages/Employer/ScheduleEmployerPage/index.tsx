import { Schedule } from "@/components/ui";

const ScheduleEmployerPage = () => {
  const eventList: Event[] = [
    {
      event_id: "1",
      start: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        9,
        0,
        0
      ),
      end: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        10,
        0,
        0
      ),
      title: "Meeting with Client A",
      color: "#ff0000",
    },
    {
      event_id: "1",
      start: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        9,
        0,
        0
      ),
      end: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        10,
        0,
        0
      ),
      title: "Meeting with Client A",
      color: "#ff0000",
    },
    {
      event_id: "1",
      start: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        9,
        0,
        0
      ),
      end: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        10,
        0,
        0
      ),
      title: "Meeting with Client A",
      color: "#ff0000",
    },
    {
      event_id: "2",
      start: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 2,
        9,
        0,
        0
      ),
      end: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        10,
        0,
        0
      ),
      title: "Team Standup",
      color: "#00ff00",
    },
    {
      event_id: "3",
      start: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 2,
        9,
        0,
        0
      ),
      end: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 5,
        10,
        0,
        0
      ),
      title: "Project Review",
      color: "#0000ff",
    },
    {
      start: new Date("2024-03-24T12:00:00"),
      end: new Date("2024-03-24T13:00:00"),
      title: "Lunch Break",
      color: "#ffff00",
    },
  ];
  const fetchScheduleData = () => {};
  return (
    <div className="bg-white relative w-full h-[100vh] lg:h-[83vh]  lg:-my-4">
      <Schedule value={eventList} fetchScheduleData={fetchScheduleData} />
    </div>
  );
};
export default ScheduleEmployerPage;
