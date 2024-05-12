import { ListEmpty, Loading } from "@/components/ui";
import { DateHelper } from "@/utils/helpers/dateHelper";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
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
  return (
    <tr
      key={index}
      className="focus:outline-none h-[5.6rem] border border-borderColor border-dashed"
    >
      <td className="table-cell">
        <div className="flex items-center w-full gap-2 justify-center">
          <p className="text-base font-medium leading-none text-gray-700">
            {currentPage * itemPerpage - itemPerpage + index}
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
        <div className="flex items-center px-5 w-full gap-2 justify-center">
          {DateHelper.formatDateTime(new Date(item.created!))}
        </div>
      </td>
      <td className="table-cell">
        <div className="flex items-center px-5 w-full gap-2  justify-center">
          {DateHelper.formatDateTime(new Date(item.updated!))}
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
            onClick={() => _onClickDetail(item)}
          />
          {AuthHelper.isEmployer() && (
            <AiFillDelete
              className=" cursor-pointer hover:text-red-500"
              onClick={() => _onClickDelete(item)}
            />
          )}
        </div>
      </td>
    </tr>
  );
};

const ProceduresTableWeb: React.FC<ProceduresTableProps> = ({
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
      <table className="w-full text-gray-600 table-fixed">
        <thead className="">
          <th className="px-5 w-[10%]">STT</th>
          <th className="px-5 w-[25%] text-left">Tên quy trình</th>
          <th className="px-5 w-[20%]">Ngày tạo</th>
          <th className="px-5 w-[20%]">Cập nhật gần đây</th>
          <th className="px-5 w-[10%]">Số bước</th>
          <th className="px-5 w-[15%]"></th>
        </thead>
        <tbody>
          {isLoading ? (
            <tr className="bg-white">
              <td className="pt-6 whitespace-no-wrap" colSpan={6}>
                <Loading />
              </td>
            </tr>
          ) : (
            <>
              {isEmpty ? (
                <tr className="bg-white">
                  <td className="pt-6 whitespace-no-wrap" colSpan={6}>
                    <ListEmpty />
                  </td>
                </tr>
              ) : (
                <>
                  {value.map((item, index) => (
                    <>
                      <tr className="h-3 w-full"></tr>
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
export default ProceduresTableWeb;
