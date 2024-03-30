import { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
interface PaginationProps {
  type?: boolean;
}
const Pagination: React.FC<PaginationProps> = ({ type }) => {
  let [num, setNum] = useState<number>(1);
  let [cur, setCur] = useState<number>(1);

  const pages = [
    { page: num },
    { page: num + 1 },
    { page: num + 2 },
    { page: num + 3 },
  ];
  function Next() {
    setNum(++num);
  }
  function back() {
    num > 1 && setNum(--num);
  }
  return (
    <div className="flex rounded-lg font-[Poppins]">
      <button
        onClick={back}
        className={`h-[2.7rem] border-2 border-r-0  text-gray-800
               px-4 rounded-l-lg  hover:text-white ${
                 !type
                   ? "border-orangetext hover:bg-orangetext"
                   : "border-bgBlue hover:bg-bgBlue"
               }`}
      >
        <GrPrevious />
      </button>
      {pages.map((pg, i) => (
        <button
          key={i}
          onClick={() => setCur(pg.page)}
          className={`h-[2.7rem] border-2 border-r-0  text-gray-800 
               w-10  ${!type ? "border-orangetext" : "border-bgBlue"} 
               ${
                 cur === pg.page && !type
                   ? "bg-orangetext text-white "
                   : cur === pg.page && type
                   ? "bg-bgBlue text-white "
                   : ""
               }`}
        >
          {pg.page}
        </button>
      ))}
      <button
        onClick={Next}
        className={`h-[2.7rem] border-2  text-gray-800
               px-4 rounded-r-lg hover:text-white ${
                 !type
                   ? "border-orangetext hover:bg-orangetext"
                   : "border-bgBlue hover:bg-bgBlue"
               }`}
      >
        <GrNext />
      </button>
    </div>
  );
};

export default Pagination;
