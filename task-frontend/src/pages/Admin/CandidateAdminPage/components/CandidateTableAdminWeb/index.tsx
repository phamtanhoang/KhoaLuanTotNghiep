import {
  AiFillDelete,
  AiFillEye,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineExclamation,
} from "react-icons/ai";
import { ListEmpty, Loading } from "@/components/ui";
import { DateHelper } from "@/utils/helpers/dateHelper";
import NON_USER from "@/assets/images/non-user.jpg";
import { ConstantsHelper } from "@/utils/helpers/constantsHelper";
import { DataConstants } from "@/utils/constants/dataConstants";
import { ChangeEvent } from "react";

interface CandidateTableAdminProps {
  value: CandidateModel[];
  _onClickDetail: (item: CandidateModel) => void;
  _onClickDelete: (item: CandidateModel) => void;
  _onChangeStatus: (e: ChangeEvent<HTMLSelectElement>) => void;
  status: string;
  isLoading: boolean;
  currentPage: number;
  itemPerpage: number;
}
const CandidateTableAdminWeb: React.FC<CandidateTableAdminProps> = ({
  value,
  _onClickDelete,
  _onClickDetail,
  _onChangeStatus,
  status,
  isLoading,
  currentPage,
  itemPerpage,
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
              className="px-4 py-3.5 text-base font-semibold text-left text-gray-600 w-[40%]"
            >
              Tài khoản ứng viên
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-base font-semibold text-center  text-gray-600 w-[25%]"
            >
              <span className="pr-2">Trạng thái:</span>
              <select
                className="bg-gray-50 border border-borderColor"
                value={status}
                onChange={_onChangeStatus}
              >
                <option value="" className="p-2 text-sm">
                  Toàn bộ
                </option>
                <option
                  value={DataConstants.USER_STATUS_DATA.ACTIVE}
                  className="p-2 text-sm"
                >
                  Hoạt động
                </option>
                <option
                  value={DataConstants.USER_STATUS_DATA.INACTIVE}
                  className="p-2 text-sm"
                >
                  Không hoạt động
                </option>
              </select>
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-base font-semibold text-center text-gray-600 w-[20%]"
            >
              Ngày tạo
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
              {!value ? (
                <tr className="bg-white">
                  <td className="py-3 whitespace-no-wrap" colSpan={6}>
                    <ListEmpty />
                  </td>
                </tr>
              ) : (
                value?.map((item: CandidateModel, index: number) => (
                  <tr>
                    <td className="px-4 py-4 font-medium text-gray-700 ">
                      <span>
                        {currentPage * itemPerpage - itemPerpage + index}
                      </span>
                    </td>

                    <td className="px-4 py-4 font-medium text-gray-600 ">
                      <div className="flex items-center gap-3">
                        <img
                          className="object-cover w-10 h-10 rounded-full"
                          src={item.avatar ? item.avatar : NON_USER}
                          alt="logo"
                        />
                        <div>
                          <h2 className="text-base font-medium text-gray-800 line-clamp-2">
                            {item.firstName} {item.lastName}
                          </h2>
                          <p className="text-sm font-normal text-gray-600 line-clamp-1">
                            {item.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-left text-gray-600 ">
                      {item.status === DataConstants.USER_STATUS_DATA.ACTIVE ? (
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
                    <td className="px-4 py-4 text-center text-gray-600 ">
                      {DateHelper.formatDateTime(item.created)}
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
export default CandidateTableAdminWeb;
