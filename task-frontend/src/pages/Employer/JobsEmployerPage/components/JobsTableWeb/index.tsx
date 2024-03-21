import { StateHelper } from "@/utils/helpers/stateHelper";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";

interface JobProps {
  title: string;
  createDate: string;
  dealine: string;
  state: string;
}
interface JobsTableWebProps {
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
          <p className="text-base font-semibold text-gray-700 line-clamp-3">
            {item.title}
          </p>
        </div>
      </td>
      <td className="table-cell">
        <div className="flex items-center px-5 w-full gap-2  justify-start">
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
        <div className="flex items-center px-5 w-full gap-2 justify-center">
          <p className="text-base leading-8 text-gray-600">{item.dealine}</p>
        </div>
      </td>

      <td className="table-cell">
        <div className="flex items-center gap-5 text-2xl text-gray-600 justify-end px-4">
          <AiFillEye
            className=" cursor-pointer hover:text-orange-500"
            onClick={_onClickDetail}
          />
          <AiFillEdit
            className=" cursor-pointer hover:text-blue-500"
            onClick={_onClickEdit}
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

const JobsTableWeb: React.FC<JobsTableWebProps> = ({
  value,
  _onClickDelete,
  _onClickDetail,
  _onClickEdit,
}) => {
  return (
    <>
      <table className="w-full text-gray-600 table-fixed">
        <thead>
          <th className="w-[5%]">STT</th>
          <th className="px-5 w-[40%] text-left">Tên công việc</th>
          <th className="px-5 w-[15%] text-left">Tình trạng</th>
          <th className="px-5 w-[15%]">Ngày đăng</th>
          <th className="px-5 w-[15%]">Ngày hết hạn</th>
          <th className="px-5 w-[15%]"></th>
        </thead>
        <tbody>
          {value.map((item, index) => (
            <>
              <tr className="h-3"></tr>
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
export default JobsTableWeb;
