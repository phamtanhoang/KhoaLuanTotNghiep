import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IoMdExit } from "react-icons/io";
import { MdAdd } from "react-icons/md";

interface ItemProps {
  id: string;
  name: string;
  fromDate?: string;
  toDate?: string;
  description?: string;
}

const data = [
  {
    id: "1",
    name: "name1",
    fromDate: "2024-02-29 10:36:13.063466",
    toDate: "2024-02-29 10:36:13.063466",
    description: "des1",
  },
  {
    id: "2",
    name: "name2",
    fromDate: "2024-02-29 10:36:13.063466",
    toDate: "2024-02-29 10:36:13.063466",
    description: "des2",
  },
  {
    id: "3",
    name: "name3",
    fromDate: "2024-02-29 10:36:13.063466",
    toDate: "now",
    description: "des3",
  },
];

const ChangeExpSkillInfoCandidate = (props: any) => {
  const handleClose = props.handleClose;
  const type = props.type;
  const [items, setItems] = useState<ItemProps[]>([]);
  const scrollRef = useRef<any>(null);
  useEffect(() => {
    setItems(data);
  }, []);

  const _onClickNow = (item: ItemProps) => {
    let data = [...items];
    let updatedData = data.map((i) => {
      if (i.id === item.id) {
        if (i.toDate == "now") {
          return { ...i, toDate: "" };
        } else {
          return { ...i, toDate: "now" };
        }
      }
      return i;
    });
    setItems(updatedData);
  };

  const _onClickDelete = (item: ItemProps) => {
    const updatedData = items.filter((i) => i.id !== item.id);
    setItems(updatedData);
  };

  const _onClickAdd = () => {
    const newData = [...items];
    const newItem: ItemProps = {
      id: (items.length + 1).toString(),
      name: "",
      fromDate: "",
      toDate: "",
      description: "",
    };
    newData.push(newItem);
    setItems(newData);
  };

  return (
    <div className="lg:w-[40%] w-screen bg-white relative rounded">
      <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-orangetext rounded-t">
        <h2 className="text-xl font-semibold  line-clamp-1 my-auto">
          Chỉnh sửa{" "}
          {type === "skill"
            ? "kĩ năng"
            : type === "exp"
            ? "kinh nghiệm làm việc"
            : type === "edu"
            ? "trình độ học vấn"
            : ""}
        </h2>
        <button
          className="p-1 rounded-md text-lg hover:text-orangetext hover:bg-white"
          onClick={handleClose}
        >
          <AiOutlineClose />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="overflow-auto scrollbar-custom h-max max-h-[75vh]"
      >
        <div className="my-4 mx-4 text-gray-700 flex flex-col gap-2 lg:gap-4 text-sm">
          {items.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between bg-gray-200  gap-2 px-4 py-2">
                <div className="flex gap-2 w-full">
                  <label className="text-lg font-semibold my-auto">
                    {index + 1}.{" "}
                  </label>
                  <input
                    className="w-full content-center text-base  p-2 border rounded focus:outline-none focus:border-orangetext"
                    type="text"
                    value={item.name}
                  />
                </div>
                <button
                  className="text-lg my-auto bg-red-500 hover:bg-red-500/90 text-white p-1.5 rounded"
                  onClick={() => _onClickDelete(item)}
                >
                  <FaTrashCan />
                </button>
              </div>
              <div className="border border-dashed border-t-0 rounded-b-lg px-4 py-2 flex flex-col gap-2">
                {(type === "edu" || type === "exp") && (
                  <div className="flex lg:gap-4 gap-2 ">
                    <div className="content-center w-full">
                      <label className="font-medium tracking-wide text-sm ">
                        Từ ngày
                      </label>
                      <input
                        type="date"
                        className="w-full content-center text-sm p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                        value={item.fromDate}
                      />
                    </div>
                    <div className="content-center w-full">
                      <div className="flex justify-between gap-2">
                        <label className="font-medium tracking-wide text-sm">
                          Đến ngày
                        </label>
                        <button
                          className="text-red-500 text-xs hover:text-red-700"
                          onClick={() => _onClickNow(item)}
                        >
                          {item.toDate == "now" ? "Chọn ngày" : "Hiện nay"}
                        </button>
                      </div>
                      {item.toDate == "now" ? (
                        <input
                          type="text"
                          className="w-full content-center text-sm p-2 mt-1 border rounded focus:outline-none focus:border-orangetext "
                          value="Hiện nay"
                          disabled
                        />
                      ) : (
                        <input
                          type="date"
                          className="w-full content-center text-sm p-2 mt-1 border rounded focus:outline-none focus:border-orangetext "
                          value={item.toDate}
                        />
                      )}
                    </div>
                  </div>
                )}

                <div className="content-center">
                  <label className="font-medium tracking-wide text-sm ">
                    Mô tả&nbsp;
                  </label>
                  <textarea
                    className="w-full content-center text-sm p-2 mt-1 border rounded focus:outline-none focus:border-orangetext h-16"
                    value={item.description}
                    // placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu, sở thích...)."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between gap-4 px-4 py-3 border-t ">
        <button
          className="flex items-center gap-2 w-max h-max px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-600/85 font-medium"
          onClick={_onClickAdd}
        >
          <MdAdd className="text-lg" />
          <p>Thêm</p>
        </button>

        <div className="flex gap-4">
          <button className="flex items-center gap-2 w-max h-max px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600/85 font-medium">
            <FaRegSave className="text-lg" />
            <p>Lưu</p>
          </button>
          <button
            className="flex items-center gap-2 w-max h-max px-4 py-2 bg-slate-300 text-white rounded-md hover:bg-slate-300/90 font-medium"
            onClick={handleClose}
          >
            <IoMdExit className="text-lg" />
            <p>Đóng</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChangeExpSkillInfoCandidate;
