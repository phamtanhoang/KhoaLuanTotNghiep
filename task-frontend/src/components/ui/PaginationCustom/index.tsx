import React from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "./module.style.css";

interface PaginationCustomProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  type: boolean;
}

const PaginationCustom: React.FC<PaginationCustomProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
  type,
}) => {
  return (
    <>
      <div className={type ? "pagination1" : "pagination2"}>
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
          previousLabel="Trước"
          nextLabel="Sau"
        />
      </div>
    </>
  );
};
export default PaginationCustom;
