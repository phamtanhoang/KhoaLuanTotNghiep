import { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";

const Pagination = () => {
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
    <div className="flex bg-white rounded-lg font-[Poppins]">
      <button
        onClick={back}
        className="h-[2.7rem] border-2 border-r-0 border-orangetext text-gray-800
               px-4 rounded-l-lg hover:bg-orangetext hover:text-white"
      >
        <GrPrevious />
      </button>
      {pages.map((pg, i) => (
        <button
          key={i}
          onClick={() => setCur(pg.page)}
          className={`h-[2.7rem] border-2 border-r-0 border-orangetext text-gray-800
               w-10 ${cur === pg.page && "bg-orangetext text-white"}`}
        >
          {pg.page}
        </button>
      ))}
      <button
        onClick={Next}
        className="h-[2.7rem] border-2  border-orangetext text-gray-800
               px-4 rounded-r-lg hover:bg-orangetext hover:text-white"
      >
        <GrNext />
      </button>
    </div>
  );
};

export default Pagination;
