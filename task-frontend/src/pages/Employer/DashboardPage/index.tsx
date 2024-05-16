import { AuthHelper } from "@/utils/helpers";
import {
  StatisticsApplications,
  StatisticsCard,
  StatisticsJobs,
} from "./components";
import { IoHome } from "react-icons/io5";
import { FaClipboardList, FaHouseUser } from "react-icons/fa";
import { MdOutlineContactPage, MdOutlinePendingActions } from "react-icons/md";
import { useState } from "react";
import ModalBase from "@/components/modal";
const statisticsCardsData = [
  {
    icon: <IoHome className="w-full h-full justify-center p-2.5" />,
    title: "Số lượng nhân sự",
    value: "10",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    icon: <IoHome className="w-full h-full justify-center p-2.5" />,
    title: "Today's Users",
    value: "2,300",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    icon: <IoHome className="w-full h-full justify-center p-2.5" />,
    title: "New Clients",
    value: "3,462",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    icon: <IoHome className="w-full h-full justify-center p-2.5" />,
    title: "Sales",
    value: "$103,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
];

const jobsData = [
  { name: "Job 1", createDate: "2024-03-16", createBy: "User 1" },
  { name: "Job 2", createDate: "2024-03-15", createBy: "User 2" },
  { name: "Job 1", createDate: "2024-03-16", createBy: "User 1" },
  { name: "Job 2", createDate: "2024-03-15", createBy: "User 2" },
  { name: "Job 1", createDate: "2024-03-16", createBy: "User 1" },
  { name: "Job 2", createDate: "2024-03-15", createBy: "User 2" },
  { name: "Job 1", createDate: "2024-03-16", createBy: "User 1" },
  { name: "Job 2", createDate: "2024-03-15", createBy: "User 2" },
  { name: "Job 1", createDate: "2024-03-16", createBy: "User 1" },
  { name: "Job 2", createDate: "2024-03-15", createBy: "User 2" },
  { name: "Job 1", createDate: "2024-03-16", createBy: "User 1" },
  { name: "Job 2", createDate: "2024-03-15", createBy: "User 2" },
];
const applyData = [
  {
    name: "Job 1",
    applyDate: "2024-03-16",
    user: {
      name: "Phạm Tấn Hoàng",
      email: "phamtanhoang320@gmail.com",
      image: "",
    },
  },
  {
    name: "Job 2",
    applyDate: "2024-03-16",
    user: {
      name: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      image: "",
    },
  },
];

const DashboardPage = () => {
  const [id, setId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [funcs, setFuncs] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ModalBase
        id={id}
        open={open}
        handleClose={handleClose}
        funcs={funcs}
        // fetchData={fetchListData}
      />
      <div className="w-full flex flex-col gap-4">
        <div className="grid gap-2  sm:grid-cols-2 xl:grid-cols-4 max-lg:px-4">
          {/* {statisticsCardsData.map((item, index) => (
      <StatisticsCard
        key={index}
        title={item.title}
        icon={item.icon}
        value={item.value}
        description={
          <p className="font-normal text-gray-600">
            <strong className={item.footer.color}>
              {item.footer.value}
            </strong>
            &nbsp;{item.footer.label}
          </p>
        }
      />
    ))} */}
          {AuthHelper.isEmployer() && (
            <StatisticsCard
              title="Số lượng nhân sự"
              icon={
                <FaHouseUser className="w-full h-full justify-center p-2.5" />
              }
              value="10"
            />
          )}

          <StatisticsCard
            title="Tin đang tuyển"
            icon={
              <FaClipboardList className="w-full h-full justify-center p-2.5" />
            }
            value="5"
          />
          <StatisticsCard
            title="Tin chưa duyệt"
            icon={
              <MdOutlinePendingActions className="w-full h-full justify-center p-2.5" />
            }
            value="2"
          />
          <StatisticsCard
            title="Ứng tuyển chưa duyệt"
            icon={
              <MdOutlineContactPage className="w-full h-full justify-center p-2.5" />
            }
            value="3"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-4 lg:rounded-xl">
            <StatisticsJobs
              title="Công việc đang đăng tuyển"
              link=""
              type=""
              value={jobsData}
            />
          </div>
          <div className="bg-white p-4 lg:rounded-xl">
            <StatisticsJobs
              title="Công việc chưa được duyệt"
              link=""
              type=""
              value={jobsData}
            />
          </div>
        </div>

        <div className="w-full lg:rounded-xl bg-white p-4">
          <StatisticsApplications />
        </div>
      </div>
    </>
  );
};
export default DashboardPage;
