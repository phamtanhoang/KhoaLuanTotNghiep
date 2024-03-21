import { StateHelper } from "@/utils/helpers/stateHelper";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { IoMdMore } from "react-icons/io";

interface JobProps {
  title: string;
  createDate: string;
  dealine: string;
  state: string;
}
interface JobsTableMobileProps {
  value: JobProps[];
  _onClickDelete: () => void;
  _onClickDetail: () => void;
  _onClickEdit: () => void;
}

const ItemTSX: React.FC<{
  item: JobProps;
  index: number;
  _onClickDelete: () => void;
  _onClickDetail: () => void;
  _onClickEdit: () => void;
}> = ({ item, index, _onClickDelete, _onClickDetail, _onClickEdit }) => {
  let data = StateHelper.findJobStateById(item.state);
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
            <span>{index}.&nbsp;&nbsp;</span>
            {item.title}
          </p>
        </div>

        <div className="flex items-center w-full gap-2 justify-start ">
          <p className="text-base leading-8 font-medium text-gray-800">
            <span className="font-normal text-base text-gray-600">
              Ngày đăng:&nbsp;&nbsp;
            </span>
            {item.createDate}
          </p>
        </div>
        <div className="flex items-center w-full gap-2 justify-start ">
          <p className="text-base leading-8 font-medium text-gray-800">
            <span className="font-normal text-base text-gray-600">
              Ngày hết hạn:&nbsp;&nbsp;
            </span>
            {item.dealine}
          </p>
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex items-center w-full gap-2 justify-start">
            <span className="font-normal text-base font-medium text-gray-600">
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
              className={`absolute top-9 right-0 w-max rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-0.5 ${
                dropdownOpen === true ? "block" : "hidden"
              }`}
            >
              <a
                className="flex px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-2"
                onClick={_onClickDetail}
              >
                <AiFillEye
                  className="text-orangetext text-lg"
                  onClick={_onClickDetail}
                />
                Chi tiết
              </a>
              <a
                className="flex px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-2"
                onClick={_onClickEdit}
              >
                <AiFillEdit
                  className="text-orangetext text-lg"
                  onClick={_onClickDetail}
                />
                Sửa
              </a>
              <a
                className="flex px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-2"
                onClick={_onClickDelete}
              >
                <AiFillDelete
                  className="text-red-500 text-lg"
                  onClick={_onClickDelete}
                />
                Xóa
              </a>
            </div>
          </button>
        </div>
      </div>
    </tr>
  );
};

const JobsTableMobile: React.FC<JobsTableMobileProps> = ({
  value,
  _onClickDelete,
  _onClickDetail,
  _onClickEdit,
}) => {
  return (
    <>
      <table className="w-full text-gray-600">
        <tbody className="flex flex-col gap-2">
          {value.map((item, index) => (
            <>
              <ItemTSX
                item={item}
                index={index}
                _onClickDelete={_onClickDelete}
                _onClickDetail={_onClickDetail}
                _onClickEdit={_onClickEdit}
              />
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default JobsTableMobile;
