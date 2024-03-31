
import { EMPLOYER_PATHS } from "@/utils/constants/pathConstants";
import { AiOutlineClose } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";

const Title = () => {
  const urlLink = window.location.pathname;

  return (
    <h2 className="uppercase items-center text-center text-xl flex font-bold w-full">
      {urlLink == EMPLOYER_PATHS.jobs
        ? "Lọc công việc"
        : urlLink == EMPLOYER_PATHS.applys
        ? "Lọc đơn ứng tuyển"
        : urlLink == EMPLOYER_PATHS.procedure
        ? "Lọc quy trình"
        : urlLink == EMPLOYER_PATHS.findCandidate
        ? "Lọc ứng viên"
        : urlLink == EMPLOYER_PATHS.hr
        ? "Lọc nhân sự"
        : ""}
    </h2>
  );
};

const FilterModal = (props: any) => {
  const handleClose = props.handleClose;

  return (
    <div className="absolute inset-y-0 right-0 w-[85%] lg:w-[30%] overflow-y-auto">
      <div className="h-full flex flex-col px-4 py-8 lg:p-8 bg-white">
        <div className="flex items-center justify-between ">
          <Title />
          <button
            className="p-1.5 rounded text-lg font-bold text-gray-800 hover:bg-red-500 hover:text-white"
            onClick={handleClose}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <div>
            <label className="block mb-2 text-base font-medium text-gray-500">
              Tên công việc:
            </label>
            <input
              type="text"
              placeholder="Nhập tên công việc"
              className="w-full p-2 border border-borderColor rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-borderColor transition-colors duration-300"
            />
          </div>
          <div>
            <label className="block mb-2 text-base font-medium text-gray-500">
              Tên công việc:
            </label>
            <input
              type="text"
              placeholder="Nhập tên công việc"
              className="w-full p-2 border border-borderColor rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-borderColor transition-colors duration-300"
            />
          </div>
          <div>
            <label className="block mb-2 text-base font-medium text-gray-500">
              Tên công việc:
            </label>
            <input
              type="text"
              placeholder="Nhập tên công việc"
              className="w-full p-2 border border-borderColor rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-borderColor transition-colors duration-300"
            />
          </div>
        </div>

        <div className="flex justify-start items-center border-borderColor mt-10">
          <button className="flex items-center gap-2.5 w-max h-max px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600/85 font-semibold">
            <FiFilter className="text-base" />
            <p>Lọc</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default FilterModal;
