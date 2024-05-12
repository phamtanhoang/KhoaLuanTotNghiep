import { useEffect, useRef, useState } from "react";
import { IoMdMore } from "react-icons/io";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { ListEmpty, Loading } from "@/components/ui";
import { DateHelper } from "@/utils/helpers/dateHelper";
import { ProceduresTableProps } from "../..";
import { AuthHelper } from "@/utils/helpers/authHelper";

const ItemTSX: React.FC<{
  item: ProcedureModel;
  index: number;
  _onClickDelete: (item: ProcedureModel) => void;
  _onClickDetail: (item: ProcedureModel) => void;
  currentPage: number;
  itemPerpage: number;
}> = ({
  item,
  index,
  _onClickDelete,
  _onClickDetail,
  currentPage,
  itemPerpage,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
  return (
    <tr
      key={index}
      className="focus:outline-none border border-borderColor border-dashed rounded mt-2 p-4"
    >
      <div className="w-full flex flex-col gap-1.5">
        <div className="flex items-center w-full justify-start text-lg leading-8 font-semibold text-gray-800">
          <span className="mt-auto">
            {currentPage * itemPerpage - itemPerpage + index}.&nbsp;&nbsp;&nbsp;
          </span>
          <div className="flex items-center w-full gap-2 justify-start">
            {item.name}
          </div>
        </div>

        <div className="flex items-center w-full justify-start ">
          <p className="text-base leading-8 ">
            <span className="font-normal text-base text-gray-600">
              Ngày tạo:&nbsp;&nbsp;
            </span>
            {DateHelper.formatDateTime(new Date(item.created!))}
          </p>
        </div>
        <div className="flex items-center w-full justify-start ">
          <p className="text-base leading-8 ">
            <span className="font-normal text-base text-gray-600">
              Cập nhật gần nhất:&nbsp;&nbsp;
            </span>
            {DateHelper.formatDateTime(new Date(item.updated!))}
          </p>
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex items-center font-medium w-full  justify-start">
            <span className="font-normal text-base text-gray-600">
              Số bước:&nbsp;&nbsp;
            </span>
            {item.totalStep}
          </div>
          <button
            ref={trigger}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-3xl text-gray-600 border border-borderColor rounded relative"
          >
            <IoMdMore />
            <div
              ref={dropdown}
              onFocus={() => setDropdownOpen(true)}
              onBlur={() => setDropdownOpen(false)}
              className={`z-[1] absolute top-9 right-0 w-max rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-0.5 group ${
                dropdownOpen === true ? "block" : "hidden"
              }`}
            >
              <a
                className="flex px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-2"
                onClick={() => _onClickDetail(item)}
              >
                <AiFillEye className="text-orangetext text-lg" />
                Chi tiết
              </a>
              {AuthHelper.isEmployer() && (
                <a
                  className="flex px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-2"
                  onClick={() => _onClickDelete(item)}
                >
                  <AiFillDelete className="text-red-500 text-lg" />
                  Xóa
                </a>
              )}
            </div>
          </button>
        </div>
      </div>
    </tr>
  );
};

const ProceduresTableMobile: React.FC<ProceduresTableProps> = ({
  value,
  _onClickDelete,
  _onClickDetail,
  isLoading,
  currentPage,
  itemPerpage,
  isEmpty,
}) => {
  return (
    <>
      <table className="w-full text-gray-600">
        <tbody className="flex flex-col gap-2">
          {isLoading ? (
            <tr className="bg-white flex align-center justify-center">
              <td className="pt-6 whitespace-no-wrap w-full">
                <Loading />
              </td>
            </tr>
          ) : (
            <>
              {isEmpty ? (
                <tr className="bg-white flex align-center justify-center">
                  <td className="pt-6 whitespace-no-wrap text-center flex justify-center">
                    <ListEmpty />
                  </td>
                </tr>
              ) : (
                <>
                  {value.map((item, index) => (
                    <>
                      <ItemTSX
                        item={item}
                        index={index}
                        _onClickDelete={_onClickDelete}
                        _onClickDetail={_onClickDetail}
                        currentPage={currentPage}
                        itemPerpage={itemPerpage}
                      />
                    </>
                  ))}
                </>
              )}
            </>
          )}
        </tbody>
      </table>
    </>
  );
};
export default ProceduresTableMobile;
