import { AiOutlineClose } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { HexColorPicker } from "react-colorful";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { SwalHelper, DateHelper } from "@/utils/helpers";
import { tagsService } from "@/services";
import { LoadingContext } from "@/App";

const UpdateTag = (props: any) => {
  const handleClose = props.handleClose;
  const fetchListData = props.fetchData;
  const context = useContext(LoadingContext);

  const id = props.id;
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [created, setCreated] = useState<Date | null>(null);
  const [updated, setUpdated] = useState<Date | null>(null);

  const _onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  };
  const _onChangeColor = (e: string) => {
    const value = e;
    setColor(value);
  };
  const _onClickSave = () => {
    if (name === "" || color! === "") {
      SwalHelper.MiniAlert("Vui lòng nhập đầy đủ thông tin!", "warning");
      return;
    }
    context.handleOpenLoading();
    tagsService
      .updateById(id, name.trim(), color.trim())
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

  useEffect(() => {
    context.handleOpenLoading();
    tagsService
      .getById(id)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setName(res?.data?.Data?.name);
          setColor(res?.data?.Data?.color);
          setCreated(res?.data?.Data?.created);
          setUpdated(res?.data?.Data?.updated);
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
  }, []);

  return (
    <>
      <div className="md:w-[50%] xl:w-[30%] w-screen bg-white relative lg:rounded">
        <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-bgBlue lg:rounded-t">
          <h2 className="text-xl font-medium  line-clamp-1 my-auto">
            Chi tiết nhãn
          </h2>
          <button
            className="p-1 rounded-md text-lg hover:text-bgBlue hover:bg-white"
            onClick={handleClose}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="overflow-auto scrollbar-custom h-max max-h-[75vh] my-4 ">
          <div className="mx-4 text-gray-700 flex flex-col gap-2">
            <p className="font-semibold text-black bg-body2 pl-1 pr-1 pt-1.5 pb-1.5 rounded-sm shadow-sm w-full truncate">
              Mã - {id}
            </p>
            <div className="content-center">
              <label className="font-medium tracking-wide text-sm">
                Tên nhãn <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-bgBlue"
                type="text"
                value={name}
                onChange={_onChangeName}
              />
            </div>
            <div className="content-center">
              <label className="font-medium tracking-wide text-sm">
                Màu sắc <span className="text-red-500">*</span>
              </label>
              <div className="flex justify-center">
                <HexColorPicker
                  color={color}
                  onChange={_onChangeColor}
                  className="w-[6rem] h-[6rem]"
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-2 lg:gap-4">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Ngày tạo
                </label>
                <input
                  className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-bgBlue"
                  type="text"
                  value={created ? DateHelper.formatDateTime(created) : ""}
                  disabled
                />
              </div>
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Chỉnh sửa gần đây
                </label>
                <input
                  className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-bgBlue"
                  type="text"
                  value={updated ? DateHelper.formatDateTime(updated) : ""}
                  disabled
                />
              </div>
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
    </>
  );
};
export default UpdateTag;
