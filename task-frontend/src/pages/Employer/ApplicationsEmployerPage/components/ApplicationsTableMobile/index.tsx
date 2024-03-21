import { StateHelper } from "@/utils/helpers/stateHelper";
import { useEffect, useRef, useState } from "react";
import { IoMdMore } from "react-icons/io";
import NON_USER from "@/assets/images/non-user.jpg";
import { AiFillDelete, AiFillEye } from "react-icons/ai";

interface ApplicationProps {
  image: string;
  personName: string;
  email: string;
  jobTitle: string;
  applyDate: string;
  state: string;
}
interface ApplicationsTableMobileProps {
  value: ApplicationProps[];
  _onClickDelete: () => void;
  _onClickDetail: () => void;
}

const ItemTSX: React.FC<{
  item: ApplicationProps;
  index: number;
  _onClickDelete: () => void;
  _onClickDetail: () => void;
}> = ({ item, index, _onClickDelete, _onClickDetail }) => {
  let data = StateHelper.findApplicationStateById(item.state);
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
          <span className="mt-auto">{index}.&nbsp;&nbsp;&nbsp;</span>
          <div className="flex items-center w-full gap-2 justify-start">
            <div className="flex items-center gap-3">
              <img
                className="object-cover w-10 h-10 rounded-full"
                src={item.image ? item.image : NON_USER}
                alt="logo"
              />
              <div>
                <h2
                  className="text-base font-semibold text-gray-800 cursor-pointer hover:text-orangetext line-clamp-2"
                  onClick={() => {}}
                >
                  {item.personName}
                </h2>
                <p className="text-sm font-normal text-gray-600 line-clamp-1">
                  {item.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full justify-start text-base leading-8 font-medium text-gray-800 gap-2">
          <p className="font-normal text-base text-gray-600 w-max mb-auto mt-1">
            Tên công việc:&nbsp;&nbsp;
          </p>
          <p className="">{item.jobTitle}</p>
        </div>
        <div className="flex items-center w-full justify-start ">
          <p className="text-base leading-8 font-medium text-gray-800">
            <span className="font-normal text-base text-gray-600">
              Ngày ứng tuyển:&nbsp;&nbsp;
            </span>
            {item.applyDate}
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
              className={`absolute top-9 right-0 w-max rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-0.5 group ${
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

const ApplicationsTableMobile: React.FC<ApplicationsTableMobileProps> = ({
  value,
  _onClickDelete,
  _onClickDetail,
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
              />
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default ApplicationsTableMobile;
