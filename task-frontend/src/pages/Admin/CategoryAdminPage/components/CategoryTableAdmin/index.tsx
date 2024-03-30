import { AiFillDelete, AiFillEye } from "react-icons/ai";

interface CategoryTableAdminProps {
  value: any[];
  _onClickDetail: (item: any) => void;
  _onClickDelete: (item: any) => void;
}

const CategoryTableAdmin: React.FC<CategoryTableAdminProps> = ({
  value,
  _onClickDelete,
  _onClickDetail,
}) => {
  return (
    <table className="min-w-full divide-y divide-borderColor cursor-default">
      <thead className="bg-gray-50 ">
        <tr>
          <th
            scope="col"
            className="py-3.5 px-4 text-base font-semibold text-left rtl:text-right text-gray-600 w-[10%]"
          >
            STT
          </th>

          <th
            scope="col"
            className="px-4 py-3.5 text-base font-semibold text-left rtl:text-right text-gray-600 w-[80%]"
          >
            Tên danh mục
          </th>

          <th
            scope="col"
            className="px-4 py-3.5 text-sm font-semibold text-left rtl:text-right text-gray-600 w-[10%]"
          ></th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-borderColor">
        {value.map((item, index) => (
          <tr>
            <td className="px-4 py-4 text-sm font-medium text-gray-700 ">
              <div className="inline-flex items-center gap-x-3">
                <span>{index}</span>
              </div>
            </td>

            <td className="px-4 py-4 text-sm text-gray-600 ">
              {item.name}
            </td>

            <td className="px-4 py-4 text-sm whitespace-nowrap">
              <div className="flex justify-end gap-5 text-2xl text-gray-600">
                <AiFillEye
                  className=" cursor-pointer hover:text-orange-500"
                  onClick={() => _onClickDetail(item)}
                />
                <AiFillDelete
                  className=" cursor-pointer hover:text-red-500"
                  onClick={() => _onClickDelete(item)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default CategoryTableAdmin;
