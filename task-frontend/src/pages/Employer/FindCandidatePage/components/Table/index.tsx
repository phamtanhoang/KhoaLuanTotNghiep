import { ListEmpty, Loading } from "@/components/ui";
import { DateHelper } from "@/utils/helpers";
import { AiFillEye } from "react-icons/ai";
import NON_USER from "@/assets/images/non-user.jpg";
interface CandidateTableProps {
  value: any[];
  _onClickDetail: (item: any) => void;
  isLoading: boolean;
  isEmpty: boolean;
}
const Table: React.FC<CandidateTableProps> = ({
  value,
  _onClickDetail,
  isLoading,
  isEmpty,
}) => {
  return (
    <>
      <table className="min-w-full divide-y divide-borderColor cursor-default">
        <thead className="bg-gray-50 ">
          <tr>
            <th
              scope="col"
              className="px-2 py-3.5 text-base font-semibold text-center text-gray-600 w-[20%] border-r border-borderColor"
            >
              Ứng viên
            </th>
            <th
              scope="col"
              className="px-2 py-3.5 text-base font-semibold text-center  text-gray-600 w-[20%] border-r border-borderColor"
            >
              Thông tin cơ bản
            </th>

            <th
              scope="col"
              className="px-2 py-3.5 text-base font-semibold text-center  text-gray-600 w-[15%] border-r border-borderColor"
            >
              Kỹ năng
            </th>
            <th
              scope="col"
              className="px-2 py-3.5 text-base font-semibold text-center  text-gray-600 w-[20%] border-r border-borderColor"
            >
              Kinh nghiệm
            </th>
            <th
              scope="col"
              className="px-2 py-3.5 text-base font-semibold text-center text-gray-600 w-[20%] border-r border-borderColor"
            >
              Học vấn
            </th>

            <th
              scope="col"
              className="px-4 py-3.5 text-sm font-semibold text-center text-gray-600 w-[5%]"
            ></th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-borderColor">
          {isLoading ? (
            <tr className="bg-white">
              <td className="py-3 whitespace-no-wrap" colSpan={7}>
                <Loading />
              </td>
            </tr>
          ) : (
            <>
              {isEmpty ? (
                <tr className="bg-white">
                  <td className="py-3 whitespace-no-wrap" colSpan={7}>
                    <ListEmpty />
                  </td>
                </tr>
              ) : (
                value?.map((item: any, index: number) => (
                  <tr key={index}>
                    <td className="table-cell border-r border-borderColor">
                      <div className="px-2 py-4 font-medium text-gray-700 w-full">
                        <div className="flex items-center gap-2">
                          <img
                            className="object-cover w-10 h-10 rounded-full"
                            src={item.avatar ? item.avatar : NON_USER}
                            alt="logo"
                          />
                          <div>
                            <h2 className="text-base font-semibold text-gray-800  line-clamp-2">
                              {item.firstName} {item.lastName}
                            </h2>
                            <p className="text-sm font-normal text-gray-600 line-clamp-1">
                              {item.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell border-r border-borderColor">
                      <div className="px-2 py-4 text-gray-600 w-full text-sm font-medium flex flex-col gap-1">
                        {item?.job && (
                          <p>
                            <span>Công việc: </span>
                            {item?.job}
                          </p>
                        )}

                        {item?.dateOfBirth && (
                          <p>
                            <span>Ngày sinh: </span>
                            {DateHelper.formatDate(item.dateOfBirth)}
                          </p>
                        )}
                        {item?.sex && (
                          <p>
                            <span>Giới tính: </span>
                            {item?.sex == "MALE"
                              ? "Nam"
                              : item?.sex == "FEMALE"
                              ? "Nữ"
                              : "Khác"}
                          </p>
                        )}
                        {item?.phoneNumber && (
                          <p>
                            <span>SĐT: </span>
                            {item.phoneNumber}
                          </p>
                        )}
                        {item?.address && (
                          <p>
                            <span>Vị trí: </span>
                            {item.address}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="table-cell border-r border-borderColor">
                      <div className="px-2 py-4 text-gray-600 w-full text-sm font-medium flex flex-col gap-1">
                        {item?.extra?.skills?.map((s: any, index: number) => (
                          <p key={index}>- {s.skill}</p>
                        ))}
                      </div>
                    </td>
                    <td className="table-cell border-r border-borderColor">
                      <div className="px-2 py-4 text-gray-600 w-full text-sm font-medium flex flex-col gap-1">
                        {item?.extra?.experiences?.map(
                          (s: any, index: number) => (
                            <p key={index}>- {s.experience}</p>
                          )
                        )}
                      </div>
                    </td>
                    <td className="table-cell border-r border-borderColor">
                      <div className="px-2 py-4 text-gray-600 w-full text-sm font-medium flex flex-col gap-1">
                        {item?.extra?.educations?.map(
                          (s: any, index: number) => (
                            <p key={index}>- {s.education}</p>
                          )
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex justify-center gap-5 text-2xl text-gray-600">
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
