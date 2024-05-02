import { ConstantsHelper } from "@/utils/helpers/constantsHelper";
import { DateHelper } from "@/utils/helpers/dateHelper";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { JobsTableProps } from "../..";
import { ListEmpty, Loading } from "@/components/ui";

const ItemTSX: React.FC<{
  item: JobModel;
  index: number;
  _onClickDelete: (item: JobModel) => void;
  _onClickEdit: (item: JobModel) => void;
  currentPage: number;
  itemPerpage: number;
}> = ({
  item,
  index,
  _onClickDelete,
  _onClickEdit,
  currentPage,
  itemPerpage,
}) => {
  let data = ConstantsHelper.findJobStateById(item.status);

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
          <p className="text-base font-semibold text-gray-700 line-clamp-3">
            {item.name}
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
          <p className="text-base leading-8 text-gray-600 text-center">
            {item.categoryName}
          </p>
        </div>
      </td>
      <td className="table-cell">
        <div className="flex items-center px-5 w-full gap-2 justify-center">
          <p className="text-base leading-8 text-gray-600 text-center">
            {DateHelper.formatDateTime(item.updated)}
          </p>
        </div>
      </td>

      <td className="table-cell">
        <div className="flex items-center gap-5 text-2xl text-gray-600 justify-end px-4">
          <AiFillEye
            className=" cursor-pointer hover:text-orange-500"
            onClick={() => _onClickEdit(item)}
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

const JobsTableWeb: React.FC<JobsTableProps> = ({
  value,
  _onClickDelete,
  _onClickEdit,
  isLoading,
  isEmpty,
  currentPage,
  itemPerpage,
}) => {
  return (
    <>
      <table className="w-full text-gray-600 table-fixed">
        <thead>
          <th className="w-[5%]">STT</th>
          <th className="px-5 w-[35%] text-left">Tên công việc</th>
          <th className="px-5 w-[15%] text-left">Tình trạng</th>
          <th className="px-5 w-[20%]">Danh mục</th>
          <th className="px-5 w-[15%]">Ngày hết hạn</th>
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
                  {value?.map((item, index) => (
                    <>
                      <tr className="h-3"></tr>
                      <ItemTSX
                        item={item}
                        index={index}
                        _onClickDelete={_onClickDelete}
                        _onClickEdit={_onClickEdit}
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
export default JobsTableWeb;
