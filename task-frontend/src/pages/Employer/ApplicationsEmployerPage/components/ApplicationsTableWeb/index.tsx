import { StateHelper } from "@/utils/helpers/stateHelper";
import { AiFillDelete, AiFillEye } from "react-icons/ai";

import NON_USER from "@/assets/images/non-user.jpg";

interface ApplicationProps {
  image: string;
  personName: string;
  email: string;
  jobTitle: string;
  applyDate: string;
  state: string;
}
interface ApplicationsTableWebProps {
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
            {item.jobTitle}
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
          <p className="text-base leading-8 text-gray-600">{item.applyDate}</p>
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

const ApplicationsTableWeb: React.FC<ApplicationsTableWebProps> = ({
  value,
  _onClickDelete,
  _onClickDetail,
}) => {
  return (
    <>
      <table className="w-full text-gray-600 table-fixed">
        <thead>
          <th className="px-5 w-[5%]">STT</th>
          <th className="px-5 w-[30%] text-left">Ứng viên</th>
          <th className="px-5 w-[25%] text-left">Tên công việc</th>
          <th className="px-5 w-[17%] text-left">Tình trạng</th>
          <th className="px-5 w-[13%]">Ngày đăng</th>
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
export default ApplicationsTableWeb;
