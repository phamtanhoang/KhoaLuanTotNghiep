import {
  FaClipboardList,
  FaUserGraduate,
  FaUserSecret,
  FaUserTie,
} from "react-icons/fa";
import {
  EmployerPendingList,
  JobPendingList,
  StatisticsAdminCard,
} from "./components";
import Chart from "react-apexcharts";
import { useContext, useEffect, useRef, useState } from "react";
import { LoadingContext } from "@/App";

import { SwalHelper } from "@/utils/helpers";
import { MdArrowDropDown } from "react-icons/md";
import { statisticsService } from "@/services";

const DashboardAdminPage = () => {
  const [count, setCount] = useState<any>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const context = useContext(LoadingContext);

  const dropdownRef = useRef<any>(null);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("mousedown", _handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", _handleClickOutside);
    };
  }, []);

  const _handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenDropdown(false);
    }
  };

  useEffect(() => {
    context.handleOpenLoading();
    statisticsService
      .getCount_admin()
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setCount(res.data.Data);
        } else {
          SwalHelper.MiniAlert(res.data.Message, "error");
        }
      })
      .catch(() => {
        SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
      })
      .finally(() => {
        context.handleCloseLoading();
      });
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 mb-3 lg:mb-5">
        <StatisticsAdminCard
          icon={
            <FaClipboardList className="w-full h-full justify-center p-3" />
          }
          quantity={count[0]!}
          title="Tin đang tuyển"
        />
        <StatisticsAdminCard
          icon={<FaUserGraduate className="w-full h-full justify-center p-3" />}
          quantity={count[1]!}
          title="Tải khoản ứng viên"
        />
        <StatisticsAdminCard
          icon={<FaUserTie className="w-full h-full justify-center p-3" />}
          quantity={count[2]!}
          title="Tải khoản nhà tuyển dụng"
        />

        <StatisticsAdminCard
          icon={<FaUserSecret className="w-full h-full justify-center p-3" />}
          quantity={count[3]!}
          title="Tải khoản nhà tuyển dụng VIP"
        />
      </div>
      <div className="bg-white rounded-md border border-borderColor p-2.5 lg:p-5 shadow-md shadow-black/5 mb-5">
        <div
          className="relative ml-auto flex justify-end mb-10"
          ref={dropdownRef}
        >
          <button
            className="flex gap-1 rounded-md bg-white py-2 px-5 w-max text-gray-700 border border-bgBlue"
            onClick={() => {
              setOpenDropdown(!openDropdown);
            }}
          >
            Năm:&nbsp;&nbsp;
            <span className="font-medium">{year}</span>
            <MdArrowDropDown className="my-auto text-xl" />
          </button>
          {openDropdown && (
            <div className="absolute top-8 right-5 mt-2 py-2 w-max bg-white rounded-md shadow-xl z-20">
              {Array.from(
                { length: 5 },
                (_, i) => new Date().getFullYear() - i
              ).map((item) => (
                <button
                  key={item}
                  className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100 hover:text-orangetext w-full text-left"
                  onClick={() => {
                    setYear(item);
                    setOpenDropdown(false);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex lg:flex-row flex-col w-full">
          <div className="lg:w-[55%]">
            <Chart
              options={{
                chart: {
                  id: "basic-bar",
                },
                xaxis: {
                  categories: [
                    "Tháng 1",
                    "Tháng 2",
                    "Tháng 3",
                    "Tháng 4",
                    "Tháng 5",
                    "Tháng 6",
                    "Tháng 7",
                    "Tháng 8",
                    "Tháng 9",
                    "Tháng 10",
                    "Tháng 11",
                    "Tháng 12",
                  ],
                },
                colors: ["#4d4dff"],
                title: {
                  text: "Thống kê doanh thu",
                  align: "center",
                  style: {
                    fontSize: "20px",
                    color: "#263238",
                    fontWeight: "bold",
                  },
                },
              }}
              series={[
                {
                  name: "Doanh thu",
                  data: [0, 0, 0, 4000000, 3700000, 0, 0, 0, 0, 0, 0, 0],
                },
              ]}
              type="area"
              height={350}
            />
          </div>
          <div className="lg:w-[45%]">
            <Chart
              options={{
                labels: [
                  "Công nghệ thông tin / Điện tử viễn thông",
                  "Tài chính / Kế toán",
                  "Luật / Pháp lý",
                  "Truyền thông / Quảng cáo",
                  "Khác",
                ],
                title: {
                  text: "Thống kê theo ngành nghề",
                  align: "center",
                  style: {
                    fontSize: "20px",
                    color: "#263238",
                    fontWeight: "bold",
                  },
                },
              }}
              series={[32, 28, 13, 17, 10]}
              type="donut"
              height={350}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5">
        <EmployerPendingList title="Danh sách nhà tuyển dụng mới chưa duyệt" />
        <JobPendingList title="Danh sách công việc mới chưa duyệt" />
      </div>
    </>
  );
};
export default DashboardAdminPage;
