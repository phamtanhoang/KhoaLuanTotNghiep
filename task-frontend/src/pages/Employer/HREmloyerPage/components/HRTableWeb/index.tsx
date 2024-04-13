import { ConstantsHelper } from "@/utils/helpers/constantsHelper";
import { AiFillDelete, AiFillEye } from "react-icons/ai";

import NON_USER from "@/assets/images/non-user.jpg";

interface HRProps {
  image: string;
  personName: string;
  email: string;
  permissions: string[];
  createDate: string;
  state: string;
}
interface HRTableWebProps {
  value: HRProps[];
  _onClickDelete: () => void;
  _onClickDetail: () => void;
}

const ItemTSX: React.FC<{
  item: HRProps;
  index: number;
  _onClickDelete: () => void;
  _onClickDetail: () => void;
}> = ({ item, index, _onClickDelete, _onClickDetail }) => {
  let data = ConstantsHelper.findHRStateById(item.state);

  return (
    <tr
      key={index}
      className="focus:outline-none h-[5.6rem] border border-borderColor border-dashed"
    >
      <td className="table-cell">
        <div className="flex items-center w-full gap-2 justify-center">
          <p className="text-base font-medium leading-none text-gray-700">
            {index}
          </p>
        </div>
      </td>
      <td className="table-cell">
        <div className="flex items-center px-5 w-full gap-2 justify-start">
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
      </td>
      <td className="table-cell">
        <div className="flex items-center px-5 w-full gap-2 justify-start">
          <p className="text-base font-semibold text-gray-700 line-clamp-3">
            <p className="text-base font-semibold text-gray-700 line-clamp-3">
              {item.permissions.map(
                (item, index) => (index ? ", " : "") + item
              )}
            </p>
          </p>
        </div>
      </td>
      <td className="table-cell">
        <div className="flex items-center px-5 w-full gap-2  justify-star">
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
      </td>
      <td className="table-cell">
        <div className="flex items-center px-5 w-full gap-2 justify-center">
          <p className="text-base leading-8 text-gray-600">{item.createDate}</p>
        </div>
      </td>
      <td className="table-cell">
        <div className="flex items-center gap-5 text-2xl text-gray-600 justify-end px-4">
          <AiFillEye
            className=" cursor-pointer hover:text-orangetext"
            onClick={_onClickDetail}
          />
          <AiFillDelete
            className=" cursor-pointer hover:text-red-500"
            onClick={_onClickDelete}
          />
        </div>
      </td>
    </tr>
  );
};

const HRTableWeb: React.FC<HRTableWebProps> = ({
  value,
  _onClickDelete,
  _onClickDetail,
}) => {
  return (
    <>
      <table className="w-full text-gray-600 table-fixed">
        <thead>
          <th className="px-5 w-[5%]">STT</th>
          <th className="px-5 w-[30%] text-left">Nhân sự</th>
          <th className="px-5 w-[25%] text-left">Nhóm quyền</th>
          <th className="px-5 w-[17%] text-left">Tình trạng</th>
          <th className="px-5 w-[13%]">Ngày tạo</th>
          <th className="px-5 w-[10%]"></th>
        </thead>
        <tbody>
          {value.map((item, index) => (
            <>
              <tr className="h-3 w-full"></tr>
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
export default HRTableWeb;
