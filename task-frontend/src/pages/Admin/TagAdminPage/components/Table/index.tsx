import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { ListEmpty, Loading } from "@/components/ui";
import { DateHelper } from "@/utils/helpers";

interface TagTableProps {
  value: TagModel[];
  _onClickDetail: (item: TagModel) => void;
  _onClickDelete: (item: TagModel) => void;
  isLoading: boolean;
  isEmpty: boolean;
  currentPage: number;
  itemPerpage: number;
}
const Table: React.FC<TagTableProps> = ({
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
      <table className="min-w-full divide-y divide-borderColor cursor-default">
        <thead className="bg-gray-50 ">
          <tr>
            <th
              scope="col"
              className="py-3.5 px-4 text-base font-semibold text-left text-gray-600 w-[5%]"
            >
              STT
            </th>

            <th
              scope="col"
              className="px-4 py-3.5 text-base font-semibold text-left text-gray-600 w-[35%]"
            >
              Tên nhãn
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-base font-semibold text-center  text-gray-600 w-[10%]"
            >
              Màu sắc
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-base font-semibold text-center  text-gray-600 w-[20%]"
            >
              Ngày tạo
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-base font-semibold text-center text-gray-600 w-[20%]"
            >
              Chỉnh sửa gần đây
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-sm font-semibold text-left text-gray-600 w-[10%]"
            ></th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-borderColor">
          {isLoading ? (
            <tr className="bg-white">
              <td className="py-3 whitespace-no-wrap" colSpan={6}>
                <Loading />
              </td>
            </tr>
          ) : (
            <>
              {isEmpty ? (
                <tr className="bg-white">
                  <td className="py-3 whitespace-no-wrap" colSpan={6}>
                    <ListEmpty />
                  </td>
                </tr>
              ) : (
                value?.map((item: TagModel, index: number) => (
                  <tr>
                    <td className="table-cell">
                      <div className="px-4 py-4 font-medium text-gray-700 w-full">
                        <span>
                          {currentPage * itemPerpage - itemPerpage + index}
                        </span>
                      </div>
                    </td>

                    <td className="table-cell">
                      <div className="px-4 py-4 font-medium text-gray-600  w-full">
                        {item.name}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="px-4 py-4 flex justify-center">
                        <div
                          className="w-20 h-6 rounded block"
                          style={{ backgroundColor: item.color }}
                        ></div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="px-4 py-4 text-center text-gray-600 ">
                        {DateHelper.formatDateTime(item.created)}
                      </div>
                    </td>

                    <td className="table-cell">
                      <div className="px-4 py-4 text-center text-gray-600 ">
                        {DateHelper.formatDateTime(item.updated)}
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex justify-end gap-5 text-2xl text-gray-600">
                        <AiFillEye
                          className=" cursor-pointer hover:text-blue-600"
                          onClick={() => _onClickDetail(item)}
                        />
                        <AiFillDelete
                          className=" cursor-pointer hover:text-red-500"
                          onClick={() => _onClickDelete(item)}
                        />
                      </div>
                    </td>
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
export default Table;
