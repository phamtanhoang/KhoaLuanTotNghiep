import { LoadingContext } from "@/App";
import vipsService from "@/services/vipsService";
import { SwalHelper } from "@/utils/helpers";
import { useContext, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";

const CreateVip = (props: any) => {
  const handleClose = props.handleClose;
  const fetchListData = props.fetchData;
  const context = useContext(LoadingContext);

  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("#aabbcc");
  const [month, setMonth] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [decription, setDescription] = useState<string>("");

  const _onClickSave = () => {
    if (name === "") {
      SwalHelper.MiniAlert("Vui lòng nhập tên dịch vụ thông tin!", "warning");
      return;
    }
    if (month <= 0) {
      SwalHelper.MiniAlert("Vui lòng nhập số tháng lớn hơn 0!", "warning");
      return;
    }
    if (!decription) {
      SwalHelper.MiniAlert("Vui lòng nhập số mô tả!", "warning");
      return;
    }
    context.handleOpenLoading();
    vipsService
      .create(name.trim(), month, price, color.trim(), decription.trim())
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          SwalHelper.MiniAlert(res.data.Message, "success");
          fetchListData();
          handleClose();
        } else {
          SwalHelper.MiniAlert(res.data.Message, "error");
        }
      })
      .catch(() => {
        SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
      })
      .finally(() => {
        context.handleCloseLoading();
      });
  };
  const _handleAmountChange = (event: any) => {
    const inputAmount: number = parseInt(event.target.value, 10);
    if (!isNaN(inputAmount)) {
      setMonth(inputAmount);
    }
  };
  const _handlePriceChange = (event: any) => {
    const inputAmount: number = parseInt(event.target.value, 10);
    if (!isNaN(inputAmount)) {
      setPrice(inputAmount);
    }
  };
  return (
    <div className="md:w-[50%] xl:w-[30%] w-screen bg-white relative lg:rounded">
      <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-bgBlue lg:rounded-t">
        <h2 className="text-xl font-medium  line-clamp-1 my-auto">
          Thêm dịch vụ mới
        </h2>
        <button
          className="p-1 rounded-md text-lg hover:text-bgBlue hover:bg-white"
          onClick={handleClose}
        >
          <AiOutlineClose />
        </button>
      </div>

      <div className="overflow-auto scrollbar-custom h-max max-h-[75vh] my-4">
        <div className="mx-4 text-gray-700 flex flex-col gap-4">
          <div className="content-center">
            <label className="font-medium tracking-wide text-sm">
              Tên dịch vụ <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-bgBlue"
              type="text"
              placeholder="Nhập tên dịch vụ..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="content-center">
              <label className="font-medium tracking-wide text-sm">
                Thời gian (Tháng) <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-bgBlue"
                type="number"
                placeholder="Nhập thời gian..."
                value={month}
                min="1"
                step="1"
                onChange={_handleAmountChange}
              />
            </div>
            <div className="content-center">
              <label className="font-medium tracking-wide text-sm">
                Giá tiền (VNĐ) <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-bgBlue"
                type="number"
                placeholder="Nhập giá tiền..."
                value={price}
                min="0"
                step="100000"
                onChange={_handlePriceChange}
              />
            </div>
          </div>

          <div className="content-center">
            <label className="font-medium tracking-wide text-sm">
              Màu sắc <span className="text-red-500">*</span>
            </label>
            <div className="flex justify-center">
              <HexColorPicker
                color={color}
                onChange={(value) => setColor(value)}
                className="w-[6rem] h-[6rem]"
              />
            </div>
          </div>
          <div className="content-center">
            <label className="font-medium tracking-wide text-sm">
              Mô tả <span className="text-red-500">*</span>
            </label>

            <textarea
              className="w-full  p-2 mt-1 border rounded focus:outline-none focus:border-bgBlue h-20"
              placeholder="Nhập mô tả..."
              value={decription}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 px-4 py-3 border-t  ">
        <button
          className="flex items-center gap-2 w-max h-max px-4 py-2 bg-bgBlue text-white rounded-md hover:bg-bgBlue/90 font-[450]"
          onClick={_onClickSave}
        >
          <FaRegSave className="text-base" />
          <p>Lưu</p>
        </button>
        <button
          className="flex items-center gap-2 w-max h-max px-4 py-2 bg-slate-300 text-white rounded-md hover:bg-slate-300/80 font-[450]"
          onClick={handleClose}
        >
          <IoMdExit className="text-lg" />
          <p>Đóng</p>
        </button>
      </div>
    </div>
  );
};
export default CreateVip;
