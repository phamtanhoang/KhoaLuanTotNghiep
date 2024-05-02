import { ConstantsHelper } from "@/utils/helpers/constantsHelper";
import { useEffect, useRef, useState } from "react";
import { IoMdMore } from "react-icons/io";
import NON_USER from "@/assets/images/non-user.jpg";

import { ListEmpty, Loading } from "@/components/ui";
import { DateHelper } from "@/utils/helpers/dateHelper";
import { HRTableProps } from "../..";

const ItemTSX: React.FC<{
  item: HumanResourceModel;
  index: number;
  _onClickDetail: (item: HumanResourceModel) => void;
  _onClickDelete: (item: HumanResourceModel) => void;
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
  let data = ConstantsHelper.findHRStateById(item.status);
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
            <div className="flex items-center gap-3">
              <img
                className="object-cover w-10 h-10 rounded-full"
                src={item.avatar ? item.avatar : NON_USER}
                alt="logo"
              />
              <div>
                <h2
                  className="text-lg font-semibold text-gray-800 line-clamp-2"
                  onClick={() => {}}
                >
                  {item.firstName} {item.lastName}
                </h2>
                <p className="text-sm font-normal text-gray-600 line-clamp-1">
                  {item.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full justify-start text-base leading-8 font-medium text-gray-800 gap-2">
          <p className="text-base leading-8 font-medium text-gray-800 mt-1">
            <span className="font-normal text-base text-gray-600">
              Số điện thoại:&nbsp;&nbsp;
            </span>
            {item.phoneNumber}
          </p>
          <p className=""></p>
        </div>
        <div className="flex items-center w-full justify-start ">
          <p className="text-base leading-8 font-medium text-gray-800">
            <span className="font-normal text-base text-gray-600">
              Ngày tạo:&nbsp;&nbsp;
            </span>
            {DateHelper.formatDateTime(item.created)}
          </p>
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex items-center font-medium w-full  justify-start">
            <span className="font-normal text-base text-gray-600">
              Trạng thái:&nbsp;&nbsp;
            </span>
            <div className="flex gap-2 items-center">
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

const HRTableMobile: React.FC<HRTableProps> = ({
  value,
  _onClickDelete,
  _onClickDetail,
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
                  {value?.map((item: HumanResourceModel, index: number) => (
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
export default HRTableMobile;
