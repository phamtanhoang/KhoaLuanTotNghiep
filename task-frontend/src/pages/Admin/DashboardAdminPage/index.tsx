import {
  EmployerPendingList,
  JobPendingList,
  StatisticsAdminCard,
} from "./components";

const DashboardAdminPage = () => {
  const employerData = [
    {
      name: "Doanh nghiệp A",
      bussinessCode: "DN123",
      createDate: "2024-03-26",
    },
    {
      name: "Doanh nghiệp B",
      bussinessCode: "DN456",
      createDate: "2024-03-25",
    },
    {
      name: "Doanh nghiệp C",
      bussinessCode: "DN789",
      createDate: "2024-03-24",
    },
  ];
  const jobData = [
    {
      title: "Doanh nghiệp A",
      createBy: "DN123",
      createDate: "2024-03-26",
    },
    {
      title: "Doanh nghiệp B",
      createBy: "DN456",
      createDate: "2024-03-25",
    },
    {
      title: "Doanh nghiệp C",
      createBy: "DN789",
      createDate: "2024-03-24",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 mb-3 lg:mb-5">
        <StatisticsAdminCard
          percent={30}
          quantity={100}
          title="Tải khoản ứng viên"
        />
        <StatisticsAdminCard
          percent={30}
          quantity={100}
          title="Tải khoản ứng viên VIP"
        />
        <StatisticsAdminCard
          percent={30}
          quantity={100}
          title="Tải khoản nhà tuyển dụng"
        />

        <StatisticsAdminCard
          percent={30}
          quantity={100}
          title="Tải khoản nhà tuyển dụng VIP"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <EmployerPendingList
          title="Danh sách nhà tuyển dụng mới chưa duyệt"
          link=""
          value={employerData}
        />
        <JobPendingList
          title="Danh sách công việc mới chưa duyệt"
          link=""
          value={jobData}
        />
      </div>
      
    </>
  );
};
export default DashboardAdminPage;
