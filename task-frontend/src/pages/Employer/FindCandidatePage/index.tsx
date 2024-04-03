import { Pagination } from "@/components/ui";
import { CandidateCard } from "./components";
import { FiFilter } from "react-icons/fi";
import { useContext } from "react";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";

const candidates = [
  {
    image: "",
    name: "Nguyễn Văn A",
    jobRole: "Frontend Developer",
    expYear: "5 năm",
    skills: ["React", "JavaScript", "HTML", "CSS"],
    isVip: true,
  },
  {
    image: "",
    name: "Trần Thị B",
    jobRole: "Backend Developer",
    expYear: "3 năm",
    skills: ["Node.js", "Express", "MongoDB"],
    isVip: false,
  },
  {
    image: "",
    name: "Lê Văn C",
    jobRole: "Full-stack Developer",
    expYear: "7 năm",
    skills: ["React", "Node.js", "MongoDB", "GraphQL"],
    isVip: true,
  },
  {
    image: "",
    name: "Nguyễn Văn A",
    jobRole: "Frontend Developer",
    expYear: "5 năm",
    skills: ["React", "JavaScript", "HTML", "CSS"],
    isVip: true,
  },
  {
    image: "",
    name: "Trần Thị B",
    jobRole: "Backend Developer",
    expYear: "3 năm",
    skills: ["Node.js", "Express", "MongoDB"],
    isVip: false,
  },
  {
    image: "",
    name: "Lê Văn C",
    jobRole: "Full-stack Developer",
    expYear: "7 năm",
    skills: ["React", "Node.js", "MongoDB", "GraphQL"],
    isVip: true,
  },
  {
    image: "",
    name: "Nguyễn Văn A",
    jobRole: "Frontend Developer",
    expYear: "5 năm",
    skills: ["React", "JavaScript", "HTML", "CSS"],
    isVip: true,
  },
  {
    image: "",
    name: "Trần Thị B",
    jobRole: "Backend Developer",
    expYear: "3 năm",
    skills: ["Node.js", "Express", "MongoDB"],
    isVip: false,
  },
  {
    image: "",
    name: "Lê Văn C",
    jobRole: "Full-stack Developer",
    expYear: "7 năm",
    skills: ["React", "Node.js", "MongoDB", "GraphQL"],
    isVip: true,
  },
  {
    image: "",
    name: "Nguyễn Văn A",
    jobRole: "Frontend Developer",
    expYear: "5 năm",
    skills: ["React", "JavaScript", "HTML", "CSS"],
    isVip: true,
  },
  {
    image: "",
    name: "Trần Thị B",
    jobRole: "Backend Developer",
    expYear: "3 năm",
    skills: ["Node.js", "Express", "MongoDB"],
    isVip: false,
  },
  {
    image: "",
    name: "Lê Văn C",
    jobRole: "Full-stack Developer",
    expYear: "7 năm",
    skills: ["React", "Node.js", "MongoDB", "GraphQL"],
    isVip: true,
  },
];
const FindCandidatePage = () => {
  const _onClickFilter = () => {

  };
  return (
    <>
      <div className="relative w-full flex flex-col gap-4">
        <div className="w-full flex justify-between gap-4">
          <div className="uppercase items-center text-center text-lg flex font-bold w-full max-lg:py-2 max-lg:px-4">
            Danh sách ứng viên phù hợp
          </div>
          <button
            className="flex items-center gap-2.5 w-max h-max px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600/85 font-semibold"
            onClick={_onClickFilter}
          >
            <FiFilter className="text-base" />
            <p>Lọc</p>
          </button>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 max-lg:p-4">
            {candidates.map((item, index) => (
              <CandidateCard value={item} key={index} />
            ))}
          </div>
          <div className="w-max mx-auto mt-5">
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
};
export default FindCandidatePage;
