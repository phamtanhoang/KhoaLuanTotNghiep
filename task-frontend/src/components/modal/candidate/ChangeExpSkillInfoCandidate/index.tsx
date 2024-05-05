import { LoadingContext } from "@/App";
import { candidatesService } from "@/services";
import { DataConstants } from "@/utils/constants";
import { SwalHelper } from "@/utils/helpers";
import { toDate } from "date-fns";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IoMdExit } from "react-icons/io";
import { MdAdd } from "react-icons/md";

const ChangeExpSkillInfoCandidate = (props: any) => {
  const context = useContext(LoadingContext);
  const handleClose = props.handleClose;
  const type = props.type;
  const fetchData = props.fetchData;

  const [items, setItems] = useState<any>([]);
  const fetchSkills = () => {
    context.handleOpenLoading();
    candidatesService
      .getSkills()
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setItems(res.data.Data);
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
  const fetchEducations = () => {
    context.handleOpenLoading();
    candidatesService
      .getEducations()
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setItems(res.data.Data);
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
  const fetchExperiences = () => {
    context.handleOpenLoading();
    candidatesService
      .getExperiences()
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setItems(res.data.Data);
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
    if (type === DataConstants.TYPE_EXTRA_DATA.SKILL) {
      fetchSkills();
    } else if (type === DataConstants.TYPE_EXTRA_DATA.EDU) {
      fetchEducations();
    } else if (type === DataConstants.TYPE_EXTRA_DATA.EXP) {
      fetchExperiences();
    } else {
    }
  }, []);

  const _onClickNow = (item: any) => {
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

  const _onClickDelete = (item: any) => {
    const updatedData = items.filter((i: any) => i.id !== item.id);
    updatedData.forEach((item: any, index: number) => {
      item.sequence = index;
    });
    setItems(updatedData);
  };

  const _onClickAdd = () => {
    const newData = [...(items || [])];
    let newItem: any;
    if (type === DataConstants.TYPE_EXTRA_DATA.SKILL) {
      newItem = {
        id: (newData?.length + 1).toString(),
        skill: "",
        description: "",
        sequence: (newData?.length + 1).toString(),
      };
    } else if (type === DataConstants.TYPE_EXTRA_DATA.EDU) {
      newItem = {
        id: (newData?.length + 1).toString(),
        education: "",
        fromDate: "",
        toDate: "",
        description: "",
        sequence: (newData?.length + 1).toString(),
      };
    } else if (type === DataConstants.TYPE_EXTRA_DATA.EXP) {
      newItem = {
        id: (newData?.length + 1).toString(),
        experience: "",
        fromDate: "",
        toDate: "",
        description: "",
        sequence: (newData?.length + 1).toString(),
      };
    }
    newData.push(newItem);
    console.log("newItem, ", newItem);
    setItems(newData);
  };

  const _onChangeName = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const updatedData = [...items];
    if (type == DataConstants.TYPE_EXTRA_DATA.SKILL)
      updatedData[index].skill = e.target.value;
    else if (type == DataConstants.TYPE_EXTRA_DATA.EDU)
      updatedData[index].education = e.target.value;
    else if (type == DataConstants.TYPE_EXTRA_DATA.EXP)
      updatedData[index].experience = e.target.value;
    setItems(updatedData);
  };
  const _onChangeDescription = (
    index: number,
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const updatedData = [...items];
    updatedData[index].description = e.target.value;
    setItems(updatedData);
  };
  const _onChangeFromDate = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedData = [...items];
    updatedData[index].fromDate = e.target.value;
    setItems(updatedData);
  };
  const _onChangeToDate = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const updatedData = [...items];
    updatedData[index].toDate = e.target.value;
    setItems(updatedData);
  };

  const _onClickSave = () => {
    if (type == DataConstants.TYPE_EXTRA_DATA.SKILL) {
      const checked: boolean = items.every((item: any) => item.skill !== "");
      if (!checked) {
        SwalHelper.MiniAlert("Vui lòng nhập đầy đủ thông tin!", "warning");
        return;
      }
      context.handleOpenLoading();
      candidatesService
        .saveSkills(items)
        .then((res) => {
          if (res.status === 200 && res.data.Status === 200) {
            SwalHelper.MiniAlert("Lưu thành công", "success");
            handleClose();
            fetchData();
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
    } else if (type == DataConstants.TYPE_EXTRA_DATA.EDU) {
      const checked: boolean =
        items.every((item: any) => item.education !== "") &&
        items.every((item: any) => item.fromDate !== "") &&
        items.every((item: any) => item.toDate !== "");
      if (!checked) {
        SwalHelper.MiniAlert("Vui lòng nhập đầy đủ thông tin!", "warning");
        return;
      }
      context.handleOpenLoading();
      candidatesService
        .saveEducations(items)
        .then((res) => {
          if (res.status === 200 && res.data.Status === 200) {
            SwalHelper.MiniAlert("Lưu thành công", "success");
            handleClose();
            fetchData();
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
    } else if (type == DataConstants.TYPE_EXTRA_DATA.EXP) {
      const checked: boolean =
        items.every((item: any) => item.education !== "") &&
        items.every((item: any) => item.fromDate !== "") &&
        items.every((item: any) => item.toDate !== "");
      if (!checked) {
        SwalHelper.MiniAlert("Vui lòng nhập đầy đủ thông tin!", "warning");
        return;
      }
      context.handleOpenLoading();
      candidatesService
        .saveExperiences(items)
        .then((res) => {
          if (res.status === 200 && res.data.Status === 200) {
            SwalHelper.MiniAlert("Lưu thành công", "success");
            handleClose();
            fetchData();
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
    }
  };
  console.log("items, ", items);
  return (
    <div className="lg:w-[40%] w-screen bg-white relative rounded">
      <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-orangetext rounded-t">
        <h2 className="text-xl font-semibold  line-clamp-1 my-auto">
          Chỉnh sửa{" "}
          {type === DataConstants.TYPE_EXTRA_DATA.SKILL
            ? "kĩ năng"
            : type === DataConstants.TYPE_EXTRA_DATA.EXP
            ? "kinh nghiệm làm việc"
            : type === DataConstants.TYPE_EXTRA_DATA.EDU
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

      <div className="overflow-auto scrollbar-custom h-max max-h-[75vh] my-2 mx-1">
        <div className="my-2 mx-3 text-gray-700 flex flex-col gap-2 lg:gap-4 text-sm">
          {type === DataConstants.TYPE_EXTRA_DATA.SKILL ? (
            <>
              {items?.map((item: SkillModel, index: number) => (
                <div key={index}>
                  <div className="flex justify-between bg-gray-200  gap-2 p-2">
                    <div className="flex gap-2 w-full">
                      <label className="text-lg font-semibold my-auto">
                        {index + 1}.<span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full content-center text-base  px-2 py-1 border rounded focus:outline-none focus:border-orangetext"
                        type="text"
                        value={item.skill}
                        placeholder="Nhập tên kĩ năng..."
                        onChange={(e) => _onChangeName(index, e)}
                      />
                    </div>
                    <button
                      className="text-base my-auto bg-red-500 hover:bg-red-500/90 text-white p-2 rounded"
                      onClick={() => _onClickDelete(item)}
                    >
                      <FaTrashCan />
                    </button>
                  </div>
                  <div className="border border-dashed border-t-0 rounded-b-lg p-2 flex flex-col gap-2">
                    <div className="content-center">
                      <label className="font-medium tracking-wide text-sm ">
                        Mô tả&nbsp;
                      </label>
                      <textarea
                        className="w-full text-sm p-2 mt-1 border rounded focus:outline-none focus:border-orangetext h-20"
                        value={item.description}
                        placeholder="Mô tả về kĩ năng..."
                        onChange={(e) => _onChangeDescription(index, e)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : type === DataConstants.TYPE_EXTRA_DATA.EDU ? (
            <>
              {items?.map((item: EducationlModel, index: number) => (
                <div key={index}>
                  <div className="flex justify-between bg-gray-200  gap-2 p-2">
                    <div className="flex gap-2 w-full">
                      <label className="text-lg font-semibold my-auto">
                        {index + 1}.<span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full content-center text-base  px-2 py-1 border rounded focus:outline-none focus:border-orangetext"
                        type="text"
                        value={item?.education}
                        placeholder="Nhập học vấn..."
                        onChange={(e) => _onChangeName(index, e)}
                      />
                    </div>
                    <button
                      className="text-base my-auto bg-red-500 hover:bg-red-500/90 text-white p-2 rounded"
                      onClick={() => _onClickDelete(item)}
                    >
                      <FaTrashCan />
                    </button>
                  </div>
                  <div className="border border-dashed border-t-0 rounded-b-lg p-2 flex flex-col gap-2">
                    <div className="flex lg:gap-4 gap-2 ">
                      <div className="content-center w-full">
                        <label className="font-medium tracking-wide text-sm ">
                          Từ ngày&nbsp;<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          className="w-full content-center text-sm p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                          value={item.fromDate}
                          onChange={(e) => _onChangeFromDate(index, e)}
                        />
                      </div>
                      <div className="content-center w-full">
                        <div className="flex justify-between gap-2">
                          <label className="font-medium tracking-wide text-sm">
                            Đến ngày&nbsp;
                            <span className="text-red-500">*</span>
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
                            onChange={(e) => _onChangeToDate(index, e)}
                          />
                        )}
                      </div>
                    </div>

                    <div className="content-center">
                      <label className="font-medium tracking-wide text-sm ">
                        Mô tả&nbsp;
                      </label>
                      <textarea
                        className="w-full text-sm p-2 mt-1 border rounded focus:outline-none focus:border-orangetext h-16"
                        value={item.description}
                        placeholder="Mô tả về học vấn..."
                        onChange={(e) => _onChangeDescription(index, e)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : type === DataConstants.TYPE_EXTRA_DATA.EXP ? (
            <>
              {items?.map((item: ExperienceModel, index: number) => (
                <div key={index}>
                  <div className="flex justify-between bg-gray-200  gap-2 p-2">
                    <div className="flex gap-2 w-full">
                      <label className="text-lg font-semibold my-auto">
                        {index + 1}.<span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full content-center text-base  px-2 py-1 border rounded focus:outline-none focus:border-orangetext"
                        type="text"
                        value={item?.experience}
                        placeholder="Nhập kinh nghiệm..."
                        onChange={(e) => _onChangeName(index, e)}
                      />
                    </div>
                    <button
                      className="text-base my-auto bg-red-500 hover:bg-red-500/90 text-white p-2 rounded"
                      onClick={() => _onClickDelete(item)}
                    >
                      <FaTrashCan />
                    </button>
                  </div>
                  <div className="border border-dashed border-t-0 rounded-b-lg p-2 flex flex-col gap-2">
                    <div className="flex lg:gap-4 gap-2 ">
                      <div className="content-center w-full">
                        <label className="font-medium tracking-wide text-sm ">
                          Từ ngày&nbsp;<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          className="w-full content-center text-sm p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                          value={item.fromDate}
                          onChange={(e) => _onChangeFromDate(index, e)}
                        />
                      </div>
                      <div className="content-center w-full">
                        <div className="flex justify-between gap-2">
                          <label className="font-medium tracking-wide text-sm">
                            Đến ngày&nbsp;
                            <span className="text-red-500">*</span>
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
                            onChange={(e) => _onChangeToDate(index, e)}
                          />
                        )}
                      </div>
                    </div>

                    <div className="content-center">
                      <label className="font-medium tracking-wide text-sm ">
                        Mô tả&nbsp;
                      </label>
                      <textarea
                        className="w-full text-sm p-2 mt-1 border rounded focus:outline-none focus:border-orangetext h-16"
                        value={item.description}
                        placeholder="Mô tả về kinh nghiệm..."
                        onChange={(e) => _onChangeDescription(index, e)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            ""
          )}
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
          <button
            className="flex items-center gap-2 w-max h-max px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600/85 font-medium"
            onClick={_onClickSave}
          >
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
