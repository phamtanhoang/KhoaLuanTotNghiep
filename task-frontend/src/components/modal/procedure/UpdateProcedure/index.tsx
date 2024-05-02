import { LoadingContext } from "@/App";
import { proceduresService } from "@/services";
import { AuthHelper, SwalHelper } from "@/utils/helpers";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IoMdExit } from "react-icons/io";
import { MdAdd } from "react-icons/md";

const UpdateProcedure = (props: any) => {
  const context = useContext(LoadingContext);
  const handleClose = props.handleClose;
  const fetchData = props.fetchData;
  const id = props.id;

  const scrollRef = useRef<any>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [steps, setSteps] = useState<StepModel[]>([
    { number: 0, name: "", description: "" },
  ]);

  const _onClickDelete = (item: StepModel) => {
    const updatedData = steps.filter(
      (i: StepModel) => i.number !== item.number
    );
    updatedData.forEach((item: StepModel, index: number) => {
      item.number = index;
    });
    setSteps(updatedData);
  };

  const _onClickAdd = () => {
    const data = [...steps];
    const newStep: StepModel = {
      number: data.length,
      name: "",
      description: "",
    };
    data.push(newStep);
    setSteps(data);
  };

  const _onChangeStepName = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedData = [...steps];
    updatedData[index].name = e.target.value;
    setSteps(updatedData);
  };

  const _onChangeStepDescription = (
    index: number,
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const updatedData = [...steps];
    updatedData[index].description = e.target.value;
    setSteps(updatedData);
  };


  useEffect(() => {
    context.handleOpenLoading();
    proceduresService
      .getById(id)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setName(res.data.Data.name);
          setDescription(res.data.Data.description);
          setSteps(res.data.Data.step);
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

  const _onClickSave = () => {
    const checkSteps: boolean = steps.every((step) => step.name !== "");
    if (!name || !checkSteps) {
      SwalHelper.MiniAlert("Vui lòng nhập đầy đủ thông tin!", "warning");
      return;
    }

    context.handleOpenLoading();
    proceduresService
      .updateById(id, name, description, steps)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          SwalHelper.MiniAlert(res.data.Message, "success");
          fetchData();
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

  return (
    <>
      <div className="lg:w-[40%] w-screen bg-white relative rounded">
        <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-orangetext rounded-t">
          <h2 className="text-xl font-semibold  line-clamp-1 my-auto">
            Chi tiết quy trình phỏng vấn
          </h2>
          <button
            className="p-1 rounded-md text-lg hover:text-orangetext hover:bg-white"
            onClick={handleClose}
          >
            <AiOutlineClose />
          </button>
        </div>
        <div
          className="overflow-auto scrollbar-custom h-max max-h-[75vh] my-2 mr-1"
          ref={scrollRef}
        >
          <div className="my-4 mx-4 text-gray-700 flex flex-col gap-2 lg:gap-4 text-sm">
            <div className="lg:flex justify-between gap-3 lg:gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Tên quy trình <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  placeholder="Nhập tên quy trình..."
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  disabled={AuthHelper.isHR() ? true : false}
                />
              </div>
            </div>
            <div className="lg:flex justify-between gap-3 lg:gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Mô tả
                </label>
                <textarea
                  className="w-full p-2 h-20 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  placeholder="Mô tả quy trình..."
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  disabled={AuthHelper.isHR() ? true : false}
                />
              </div>
            </div>
          </div>
          <div className="my-4 mx-4 text-gray-700 flex flex-col gap-1 text-sm border border-borderColor rounded p-2">
            <label className="font-medium tracking-wide text-sm mb">
              Danh sách bước:
            </label>
            <div className="content-center w-full flex flex-col gap-1">
              {steps.map((item: StepModel, index: number) => (
                <div key={index}>
                  <div className="flex justify-between bg-gray-200  gap-2 p-2">
                    <div className="flex gap-2 w-full">
                      <label className="text-base font-semibold my-auto">
                        {item.number! + 1}.
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full content-center text-sm  px-2 py-1 border rounded focus:outline-none focus:border-orangetext font-medium"
                        type="text"
                        placeholder="Nhập tên bước..."
                        value={item.name}
                        onChange={(e) => _onChangeStepName(index, e)}
                        disabled={AuthHelper.isHR() ? true : false}
                      />
                    </div>
                    {AuthHelper.isEmployer() && (
                      <button
                        className={`text-base my-auto text-white p-1.5 rounded ${
                          steps.length == 1
                            ? "bg-red-300/50"
                            : "bg-red-500 hover:bg-red-500/90"
                        }`}
                        onClick={() => _onClickDelete(item)}
                        disabled={steps.length == 1 ? true : false}
                      >
                        <FaTrashCan />
                      </button>
                    )}
                  </div>
                  <div className="border border-dashed border-t-0 rounded-b-lg p-2 flex flex-col gap-2">
                    <div className="content-center">
                      <label className="font-normal tracking-wide text-sm">
                        Mô tả bước&nbsp;
                      </label>
                      <textarea
                        className="w-full text-sm px-2 py-1 mt-1 border rounded focus:outline-none focus:border-orangetext h-20"
                        value={item.description}
                        placeholder="Nhập mô tả bước.."
                        onChange={(e) => _onChangeStepDescription(index, e)}
                        disabled={AuthHelper.isHR() ? true : false}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`flex gap-4 px-4 py-3 border-t ${
            AuthHelper.isEmployer() ? "justify-between " : "justify-end"
          }`}
        >
          {AuthHelper.isEmployer() && (
            <button
              className="flex items-center gap-2 w-max h-max px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-600/85 font-medium"
              onClick={_onClickAdd}
            >
              <MdAdd className="text-lg" />
              <p>Thêm</p>
            </button>
          )}

          <div className="flex gap-4">
            {AuthHelper.isEmployer() && (
              <button
                className="flex items-center gap-2 w-max h-max px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600/85 font-medium"
                onClick={_onClickSave}
              >
                <FaRegSave className="text-lg" />
                <p>Lưu</p>
              </button>
            )}
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
    </>
  );
};
export default UpdateProcedure;
