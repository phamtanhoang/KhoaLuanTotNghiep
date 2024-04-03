import { IoMdAddCircleOutline } from "react-icons/io";
import { JobsTableMobile, JobsTableWeb } from "./components";
import { Pagination } from "@/components/ui";
import { FiFilter } from "react-icons/fi";


const sampleData = [
  {
    title: "Job 1",
    createDate: "2024-03-01",
    dealine: "2024-04-01",
    state: "PENDING",
  },
  {
    title: "Job 2",
    createDate: "2024-03-05",
    dealine: "2024-04-05",
    state: "REJECT",
  },
  {
    title: "Job 3",
    createDate: "2024-03-10",
    dealine: "2024-04-10",
    state: "ACTIVE",
  },
  {
    title: "Job 4",
    createDate: "2024-03-15",
    dealine: "2024-04-15",
    state: "PAUSE",
  },
];
const JobsEmployerPage = () => {
  
  const _onClickFilter = () => {
    // context.setFuncs(MODAL_KEYS.filter);
    // context.handleOpen();
  };
  const _onClickAdd = () => {
    // context.setFuncs(MODAL_KEYS.createJob);
    // context.handleOpen();
  };

  const _onClickDelete = () => {
   
  };
  const _onClickDetail = () => {
    
  };
  const _onClickEdit = () => {
    
  };
  return (
    <div className="bg-white p-4 rounded relative w-full mt-8">
      <div className="-mt-12 flex justify-between relative p-4 lg:py-4 lg:px-8 place-items-center rounded-xl bg-orangetext bg-clip-border text-white shadow-md shadow-orange-500/40">
        <div className="items-center text-lg lg:text-2xl font-bold text-white">
          <h1 className="uppercase items-center text-center text-lg lg:text-xl flex font-bold w-full my-auto">Danh sách công việc</h1>
        </div>
        <div className="flex gap-3 lg:gap-5">
          <button
            className="inline-flex items-start justify-start text-white "
            onClick={_onClickFilter}
          >
            <FiFilter className="text-xl lg:text-2xl font-medium leading-none t my-auto" />
          </button>
          <button
            className="inline-flex items-start justify-start text-white "
            onClick={_onClickAdd}
          >
            <IoMdAddCircleOutline className="text-2xl lg:text-3xl font-medium leading-none t my-auto" />
          </button>
        </div>
      </div>

      <div className="bg-white lg:px-4 rounded relative w-full mt-2 lg:mt-5">
        <div className="max-lg:hidden">
          <JobsTableWeb
            value={sampleData}
            _onClickDelete={_onClickDelete}
            _onClickEdit={_onClickEdit}
            _onClickDetail={_onClickDetail}
          />
        </div>
        <div className="lg:hidden">
          <JobsTableMobile
            value={sampleData}
            _onClickDelete={_onClickDelete}
            _onClickEdit={_onClickEdit}
            _onClickDetail={_onClickDetail}
          />
        </div>
      </div>

      <div className="w-max mx-auto mt-5">
        <Pagination />
      </div>
    </div>
  );
};
export default JobsEmployerPage;
