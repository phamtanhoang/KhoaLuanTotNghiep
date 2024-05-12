import { ConstantsHelper } from "@/utils/helpers/constantsHelper";
import { AiFillDelete, AiFillEye } from "react-icons/ai";

import NON_USER from "@/assets/images/non-user.jpg";
import { ApplicationTableProps } from "../..";
import { ListEmpty, Loading } from "@/components/ui";
import { DateHelper } from "@/utils/helpers";

const ItemTSX: React.FC<{
  item: ApplicationModel;
  index: number;
  _onClickDelete: (item: ApplicationModel) => void;
  _onClickDetail: (item: ApplicationModel) => void;
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
  let data = ConstantsHelper.findApplicationStateById(item.status);

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
          <div className="flex items-center gap-3">
            <img
              className="object-cover w-10 h-10 rounded-full"
              src={item.candidate?.avatar ? item.candidate?.avatar : NON_USER}
              alt="logo"
            />
            <div>
              <h2
                className="text-base font-semibold text-gray-800 cursor-pointer hover:text-orangetext line-clamp-2"
                onClick={() => {}}
              >
                {item.candidate?.firstName} {item.candidate?.lastName}
              </h2>
              <p className="text-sm font-normal text-gray-600 line-clamp-1">
                {item.candidate?.email}
              </p>
            </div>
          </div>
        </div>
      </td>
      <td className="table-cell">
        <div className="flex items-center px-5 w-full gap-2 justify-start">
          <p className="text-base font-semibold text-gray-700 line-clamp-3">
            {item.job?.name}
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
          <p className="text-base leading-8 text-gray-600 text-center">
            {DateHelper.formatDateTime(item.applyDate)}
          </p>
        </div>
      </td>
      <td className="table-cell">
        <div className="flex items-center gap-5 text-2xl text-gray-600 justify-end px-4">
          <AiFillEye
            className=" cursor-pointer hover:text-orangetext"
            onClick={() => _onClickDetail(item)}
          />
          <AiFillDelete
            className=" cursor-pointer hover:text-red-500"
            onClick={() => _onClickDetail(item)}
          />
        </div>
      </td>
    </tr>
  );
};

const ApplicationsTableWeb: React.FC<ApplicationTableProps> = ({
  value,
  _onClickDelete,
  _onClickDetail,
  isLoading,
  isEmpty,
  currentPage,
  itemPerpage,
}) => {
  return (
    <>
      <table className="w-full text-gray-600 table-fixed">
        <thead>
          <th className="px-5 w-[5%]">STT</th>
          <th className="px-5 w-[20%] text-left">Ứng viên</th>
          <th className="px-5 w-[30%] text-left">Tên công việc</th>
          <th className="px-5 w-[20%] text-left">Tình trạng</th>
          <th className="px-5 w-[15%]">Ngày ứng tuyển</th>
          <th className="px-5 w-[10%]"></th>
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
                  {value?.map((item: ApplicationModel, index: number) => (
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
export default ApplicationsTableWeb;
