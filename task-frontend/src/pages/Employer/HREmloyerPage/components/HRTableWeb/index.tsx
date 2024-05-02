import { ConstantsHelper } from "@/utils/helpers/constantsHelper";
import { AiFillDelete, AiFillEye } from "react-icons/ai";

import NON_USER from "@/assets/images/non-user.jpg";
import { DateHelper } from "@/utils/helpers/dateHelper";
import { ListEmpty, Loading } from "@/components/ui";
import { HRTableProps } from "../..";

const ItemTSX: React.FC<{
  item: HumanResourceModel;
  index: number;
  _onClickDetail: (item: HumanResourceModel) => void;
  _onClickDelete: (item: HumanResourceModel) => void;
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
  let data = ConstantsHelper.findHRStateById(item.status);

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
              src={item.avatar ? item.avatar : NON_USER}
              alt="logo"
            />
            <div>
              <h2
                className="text-base font-semibold text-gray-800 line-clamp-2"
                onClick={() => {}}
              >
                {item.firstName} {item.lastName}
              </h2>
              <p className="text-sm font-normal text-gray-600 line-clamp-1">
                {item.email}
              </p>
            </div>
          </div>
        </div>
      </td>
      <td className="table-cell">
        <div className="flex items-center px-5 w-full gap-2 justify-center">
          <p className="text-base leading-8 text-gray-600 ">
            {item.phoneNumber}
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
          <p className="text-base leading-8 text-gray-600">
            {DateHelper.formatDateTime(item.created)}
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
            onClick={() => _onClickDelete(item)}
          />
        </div>
      </td>
    </tr>
  );
};

const HRTableWeb: React.FC<HRTableProps> = ({
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
          <th className="px-5 w-[30%] text-left">Nhân sự</th>
          <th className="px-5 w-[20%] text-center">Số điện thoại</th>
          <th className="px-5 w-[20%] text-left">Tình trạng</th>
          <th className="px-5 w-[15%] text-center">Ngày tạo</th>
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
                  {value?.map((item: HumanResourceModel, index: number) => (
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
export default HRTableWeb;
