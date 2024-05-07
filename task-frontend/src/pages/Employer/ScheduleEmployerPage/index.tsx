import { Schedule } from "@/components/ui";

const ScheduleEmployerPage = () => {
  const eventList: any[] = [
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
  ];
  const fetchScheduleData = () => {};
  return (
    <div className="bg-white relative w-full lg:-my-4 scale-employer">
      <Schedule value={eventList} fetchScheduleData={fetchScheduleData} />
    </div>
  );
};
export default ScheduleEmployerPage;
