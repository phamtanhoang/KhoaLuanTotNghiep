import { ConstantsHelper } from "@/utils/helpers/constantsHelper";
import { useEffect, useRef, useState } from "react";
import { IoMdMore } from "react-icons/io";
import { JobsTableProps } from "../..";
import { DateHelper } from "@/utils/helpers/dateHelper";
import { ListEmpty, Loading } from "@/components/ui";

const ItemTSX: React.FC<{
  item: JobModel;
  index: number;
  _onClickDelete: (item: JobModel) => void;
  _onClickEdit: (item: JobModel) => void;
  currentPage: number;
  itemPerpage: number;
}> = ({
  item,
  index,
  _onClickDelete,
  _onClickEdit,
  currentPage,
  itemPerpage,
}) => {
  let data = ConstantsHelper.findJobStateById(item.status);
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
        <div className="flex items-center w-full gap-2 justify-start text-lg leading-8 font-semibold text-gray-800">
          <p>
            <span>
              {currentPage * itemPerpage - itemPerpage + index}.&nbsp;&nbsp;
            </span>
            {item.name}
          </p>
        </div>

        <div className="flex items-center w-full gap-2 justify-start ">
          <p className="text-base leading-8 font-medium text-gray-800">
            <span className="font-normal text-base text-gray-600">
              Danh mục:&nbsp;&nbsp;
            </span>
            {item.categoryName}
          </p>
        </div>
        <div className="flex items-center w-full gap-2 justify-start ">
          <p className="text-base leading-8 font-medium text-gray-800">
            <span className="font-normal text-base text-gray-600">
              Ngày hết hạn:&nbsp;&nbsp;
            </span>
            {DateHelper.formatDateTime(item.updated)}
          </p>
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex items-center w-full gap-2 justify-start">
            <span className="text-base font-medium text-gray-600">
              Trạng thái:&nbsp;&nbsp;
            </span>
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: data?.color }}
            ></div>
            <p
              className="text-base leading-8 font-medium"
              style={{ color: data?.color }}
            >
              {data?.name}
            </p>
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
              className={`z-[1] absolute top-9 right-0 w-max rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-0.5 ${
                dropdownOpen === true ? "block" : "hidden"
              }`}
            >
              <a
                className="flex px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-2"
                onClick={() => _onClickEdit(item)}
              >
                Chi tiết
              </a>

              <a
                className="flex px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-2"
                onClick={() => _onClickDelete(item)}
              >
                Xóa
              </a>
            </div>
          </button>
        </div>
      </div>
    </tr>
  );
};

const JobsTableMobile: React.FC<JobsTableProps> = ({
  value,
  _onClickDelete,
  _onClickEdit,
  isLoading,
  isEmpty,
  currentPage,
  itemPerpage,
}) => {
  return (
    <>
      <table className="w-full text-gray-600">
        <tbody className="flex flex-col gap-2">
          {isLoading ? (
            <tr className="bg-white flex align-center justify-center">
              <td className="p-6 whitespace-no-wrap">
                <Loading />
              </td>
            </tr>
          ) : (
            <>
              {isEmpty ? (
                <tr className="bg-white flex align-center justify-center">
                  <td className="pt-6 whitespace-no-wrap">
                    <ListEmpty />
                  </td>
                </tr>
              ) : (
                <>
                  {value?.map((item, index) => (
                    <>
                      <ItemTSX
                        item={item}
                        index={index}
                        _onClickDelete={_onClickDelete}
                        _onClickEdit={_onClickEdit}
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
export default JobsTableMobile;
