import { ListEmpty, Loading } from "@/components/ui";
import { DateHelper } from "@/utils/helpers";
import { AiFillEye } from "react-icons/ai";
import NON_USER from "@/assets/images/non-user.jpg";
interface TrasactionTableProps {
  value: TrasactionModel[];
  _onClickDetail: (item: TrasactionModel) => void;
  isLoading: boolean;
  isEmpty: boolean;
  currentPage: number;
  itemPerpage: number;
}
const Table: React.FC<TrasactionTableProps> = ({
  value,
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
              className="px-4 py-3.5 text-base font-semibold text-center  text-gray-600 w-[15%]"
            >
              Mã giao dịch
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-base font-semibold text-left text-gray-600 w-[30%]"
            >
              Tài khoản
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-base font-semibold text-center  text-gray-600 w-[10%]"
            >
              Tên gói
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-base font-semibold text-center  text-gray-600 w-[15%]"
            >
              Thành tiền
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-base font-semibold text-center text-gray-600 w-[10%]"
            >
              Bắt đầu từ
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-base font-semibold text-center text-gray-600 w-[10%]"
            >
              Kết thúc vào
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-sm font-semibold text-left text-gray-600 w-[5%]"
            ></th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-borderColor">
          {isLoading ? (
            <tr className="bg-white">
              <td className="py-3 whitespace-no-wrap" colSpan={10}>
                <Loading />
              </td>
            </tr>
          ) : (
            <>
              {isEmpty ? (
                <tr className="bg-white">
                  <td className="py-3 whitespace-no-wrap" colSpan={10}>
                    <ListEmpty />
                  </td>
                </tr>
              ) : (
                value?.map((item: any, index: number) => (
                  <tr>
                    <td className="table-cell">
                      <div className="px-4 py-4 font-medium text-gray-700 w-full text-center">
                        <span>
                          {currentPage * itemPerpage - itemPerpage + index}
                        </span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="px-4 py-4 font-medium text-gray-600  w-full text-center">
                        {item?.invoice_id}
                      </div>
                    </td>

                    <td className="table-cell">
                      <div className="flex items-center gap-3">
                        <img
                          className="object-cover w-10 h-10 rounded-full"
                          src={
                            item?.employer?.image
                              ? item?.employer?.image
                              : NON_USER
                          }
                          alt="logo"
                        />
                        <div>
                          <h2 className="text-base font-medium text-gray-800 line-clamp-2">
                            {item?.employer?.name}
                          </h2>
                          <p className="text-sm font-normal text-gray-600 line-clamp-1">
                            {item?.employer?.user?.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="px-4 py-4 font-medium text-gray-600 w-full text-center">
                        {item?.vip?.name}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="px-4 py-4 font-medium text-gray-600 w-full text-center">
                        {item?.vip?.price?.toLocaleString()} VNĐ
                      </div>
                    </td>

                    <td className="table-cell">
                      <div className="px-4 py-4 text-center text-gray-600">
                        {DateHelper.formatDateTime(item?.fromDate!)}
                      </div>
                    </td>

                    <td className="table-cell">
                      <div className="px-4 py-4 text-center text-gray-600">
                        {DateHelper.formatDateTime(item?.toDate!)}
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex justify-end gap-5 text-2xl text-gray-600">
                        <AiFillEye
                          className=" cursor-pointer hover:text-blue-600"
                          onClick={() => _onClickDetail(item)}
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
