import { AiFillDelete, AiFillEye } from "react-icons/ai";

interface ApplicationProps {
  name?: string;
  createBy?: string;
  createDate?: string;
  totalStep?: number;
}
interface ProceduresTableWebProps {
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
          <p className="text-base font-semibold text-gray-800 line-clamp-3">
            {item.name}
          </p>
        </div>
      </td>
      <td className="table-cell">
        <div className="flex items-center px-5 w-full gap-2 justify-start">
          <p className="text-base font-semibold text-gray-700 line-clamp-3">
            {item.createBy}
          </p>
        </div>
      </td>
      <td className="table-cell">
        <div className="flex items-center px-5 w-full gap-2  justify-center">
          {item.createDate}
        </div>
      </td>
      <td className="table-cell">
        <div className="flex items-center px-5 w-full gap-2 justify-center">
          <p className="text-base leading-8 text-gray-700">{item.totalStep}</p>
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

const ProceduresTableWeb: React.FC<ProceduresTableWebProps> = ({
  value,
  _onClickDelete,
  _onClickDetail,
}) => {
  return (
    <>
      <table className="w-full text-gray-600 table-fixed">
        <thead>
          <th className="px-5 w-[5%]">STT</th>
          <th className="px-5 w-[30%] text-left">Tên quy trình</th>
          <th className="px-5 w-[25%] text-left">Người tạo</th>
          <th className="px-5 w-[15%]">Ngày tạo</th>
          <th className="px-5 w-[10%]">Sô bước</th>
          <th className="px-5 w-[15%]"></th>
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
export default ProceduresTableWeb;
