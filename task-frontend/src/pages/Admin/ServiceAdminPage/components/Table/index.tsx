import {
  AiFillDelete,
  AiFillEye,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { ListEmpty, Loading } from "@/components/ui";
import { DateHelper } from "@/utils/helpers";
import { DataConstants } from "@/utils/constants";

interface VipTableProps {
  value: VipModel[];
  _onClickDetail: (item: VipModel) => void;
  _onClickDelete: (item: VipModel) => void;
  setStatus: (status: string) => void;
  status: string;
  isLoading: boolean;
  isEmpty: boolean;
  currentPage: number;
  itemPerpage: number;
}
const Table: React.FC<VipTableProps> = ({
  value,
  _onClickDelete,
  _onClickDetail,
  setStatus,
  status,
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
              className="px-4 py-3.5 text-base font-semibold text-left text-gray-600 w-[21%]"
            >
              Tên dịch vụ
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
              className="px-4 py-3.5 text-base font-semibold text-center  text-gray-600 w-[24%] "
            >
              <span className="pr-2">Trạng thái:</span>
              <select
                className="bg-gray-50 "
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {DataConstants.SERVICE_DROPDOWN.map((item, index) => (
                  <option key={index} value={item.id} className="p-2 text-sm">
                    {item.name}
                  </option>
                ))}
              </select>
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
                value?.map((item: VipModel, index: number) => (
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

                    <td className="px-4 py-4 text-center text-gray-600 ">
                      {item.status === DataConstants.STATUS_DATA.ACTIVE ? (
                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-green-500 bg-green-500/10">
                          <AiOutlineCheck />
                          <h2 className="text-sm font-normal">Hoạt động</h2>
                        </div>
                      ) : (
                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-500/10">
                          <AiOutlineClose />
                          <h2 className="text-sm font-normal">
                            Không hoạt động
                          </h2>
                        </div>
                      )}
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
