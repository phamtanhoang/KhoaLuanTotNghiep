import { useState } from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
interface SearchJobsProps {
  name?: string;
  setName?: any;
  location?: string;
  setLocation?: any;
}

const SearchJobs: React.FC<SearchJobsProps> = ({
  name,
  setName,
  location,
  setLocation,
}) => {
  const [tempName, setTempName] = useState<string>(name || "");
  const [tempLocation, setTempLocation] = useState<string>(location || "");
  const _onClickSearch = () => {
    setName(tempName);
    setLocation(tempLocation);
  };
  return (
    <div className="bg-white rounded lg:rounded-lg lg:flex w-full gap-3 border-2 border-orangetext p-2">
      <div className="rounded-t-md flex gap-1 w-full lg:w-[60%] bg-white text-left py-2 px-3 pl-5 lg:rounded-l-full mb-2 lg:mb-0  lg:border-r-2 border-orange-300">
        <MdWork className="text-orangetext h-full text-2xl" />
        <input
          className="w-full bg-transparent ml-2 text-gray-800 focus:outline-none"
          type="text"
          placeholder="Nhập tên công việc..."
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
        />
      </div>
      <div className="flex gap-1 w-full lg:w-[40%] bg-white text-left py-2 px-3 pl-5 mb-3 lg:mb-0">
        <FaLocationCrosshairs className="text-orangetext h-full text-2xl" />
        <input
          className="w-full bg-transparent ml-2 text-gray-800 focus:outline-none"
          type="text"
          placeholder="Nhập địa điểm..."
          value={tempLocation}
          onChange={(e) => setTempLocation(e.target.value)}
        />
      </div>

      <button
        className="w-full lg:w-max py-3 px-4 lg:px-10 text-white rounded lg:rounded-full flex  justify-center items-center min-w-max   h-10 outline-none relative overflow-hidden duration-300 ease-linear
                    after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-500 hover:after:opacity-100 hover:after:scale-[2.5] bg-orangetext border-transparent hover:border-orange-500"
        onClick={_onClickSearch}
      >
        <span className="flex relative z-[1] font-medium">Tìm kiếm</span>
      </button>
    </div>
  );
};
export default SearchJobs;
