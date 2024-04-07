import { ListEmpty, Loading } from "@/components/ui";
import { DateHelper } from "@/utils/helpers/dateHelper";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { IoMdMore } from "react-icons/io";

const ItemTSX: React.FC<{
  item: CategoryModel;
  index: number;
  _onClickDetail: (item: CategoryModel) => void;
  _onClickDelete: (item: CategoryModel) => void;
}> = ({ item, index, _onClickDelete, _onClickDetail }) => {
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
    <div className="p-4 flex flex-col gap-2">
      <div className=" font-medium text-gray-700 ">
        <span>
          {index}. {item.name}
        </span>
      </div>

      <div className="text-gray-700 flex gap-3">
        <span>Ngày tạo: </span>
        {DateHelper.formatDateTime(item.created)}
      </div>
      <div className="text-gray-700 flex gap-3">
        <span>Chỉnh sửa gấn nhất: </span>
        {DateHelper.formatDateTime(item.updated)}
      </div>
      <div className="text-gray-700 flex gap-3 justify-end">
        <button
          ref={trigger}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="text-3xl text-gray-600 border border-borderColor rounded relative w-max ml-auto"
        >
          <IoMdMore />
          <div
            ref={dropdown}
            onFocus={() => setDropdownOpen(true)}
            onBlur={() => setDropdownOpen(false)}
            className={`absolute top-9 right-0 w-max shadow-lg bg-white ring-1 ring-black ring-opacity-5 group ${
              dropdownOpen === true ? "block" : "hidden"
            }`}
          >
            <a
              className="flex px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-1.5 font-medium"
              onClick={() => _onClickDetail(item)}
            >
              <AiFillEye className="text-bgBlue text-xl" />
              Chi tiết
            </a>
            <a
              className="flex px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-1.5 font-medium"
              onClick={() => _onClickDelete(item)}
            >
              <AiFillDelete className="text-red-500 text-lg" />
              Xóa
            </a>
          </div>
        </button>
      </div>
    </div>
  );
};

interface CategoryTableAdminProps {
  value: CategoryModel[];
  _onClickDetail: (item: CategoryModel) => void;
  _onClickDelete: (item: CategoryModel) => void;
  isLoading: boolean;
}
const CategoryTableAdminMobile: React.FC<CategoryTableAdminProps> = ({
  value,
  _onClickDelete,
  _onClickDetail,
  isLoading,
}) => {
  return (
    <>
      <table className="min-w-full divide-y divide-borderColor cursor-default">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-2 py-1.5 text-base font-medium text-center text-gray-600 w-full"
            >
              Danh sách nhãn
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-borderColor">
          {isLoading ? (
            <tr className="bg-white">
              <td className="py-3 whitespace-no-wrap" colSpan={1}>
                <Loading />
              </td>
            </tr>
          ) : (
            <>
              {!value ? (
                <tr className="bg-white">
                  <td className="py-3 whitespace-no-wrap" colSpan={1}>
                    <ListEmpty />
                  </td>
                </tr>
              ) : (
                value?.map((item: CategoryModel, index: number) => (
                  <tr key={index}>
                    <ItemTSX
                      index={index}
                      item={item}
                      _onClickDelete={_onClickDelete}
                      _onClickDetail={_onClickDetail}
                    />
                  </tr>
                ))
              )}
            </>
          )}
        </tbody>
      </table>
    </>
  );
};
export default CategoryTableAdminMobile;
