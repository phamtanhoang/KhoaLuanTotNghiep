import { AiOutlineClose } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";

import { ChangeEvent, useContext, useEffect, useState } from "react";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import { categoriesService, tagsService } from "@/services";

import { DateHelper } from "@/utils/helpers/dateHelper";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import { LoadingContext } from "@/App";
import { MdOutlineFileUpload } from "react-icons/md";
import ModalBase from "../..";
import { ImageHelper } from "@/utils/helpers/imageHelper";

const UpdateCategory = (props: any) => {
  const handleClose = props.handleClose;
  const fetchListData = props.fetchData;
  const context = useContext(LoadingContext);

  const [openSub, setOpenSub] = useState(false);
  const [funcsSub, setFuncsSub] = useState<string>("");
  const handleOpenSub = () => setOpenSub(true);
  const handleCloseSub = () => setOpenSub(false);

  const id = props.id;
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<string | null>(null);
  const [croppedImg, setCroppedImg] = useState<string | null>(null);
  const [created, setCreated] = useState<Date | null>(null);
  const [updated, setUpdated] = useState<Date | null>(null);

  const _onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  };
  const _onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setCroppedImg(null);
    }

    handleOpenSub();
    setFuncsSub(MODAL_KEYS.chooseImage);
  };

  const _onClickSave = () => {
    if (name === "") {
      SwalHelper.MiniAlert("Vui lòng nhập tên danh mục!", "warning");
      return;
    }

    let img: File | null = null;
    if (croppedImg !== null && croppedImg !== undefined) {
      img = ImageHelper.dataURItoFile(croppedImg, name);
    }

    context.handleOpenLoading();
    categoriesService
      .updateById(id, name.trim(), img || null)
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
    categoriesService
      .getById(id)
      .then((res) => {
        if (res.status === 200 && res.data.Status === 200) {
          setName(res?.data?.Data?.name);
          // console.log("res?.data?.Data?.image, ", res?.data?.Data?.image);
          setImage(res?.data?.Data?.image);
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
  const _onClickUploadFile = () => {
    document.getElementById("fileInput")?.click();
  };

  // console.log("image, ", image);

  return (
    <>
      <ModalBase
        open={openSub}
        handleClose={handleCloseSub}
        funcs={funcsSub}
        image={newImage}
        setCroppedImg={setCroppedImg}
      />
      <div className="md:w-[50%] xl:w-[30%] w-screen bg-white relative lg:rounded">
        <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-bgBlue lg:rounded-t">
          <h2 className="text-xl font-medium  line-clamp-1 my-auto">
            Chi tiết danh mục
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
              {croppedImg ? (
                <img
                  className="mb-2 w-1/2 mx-auto"
                  src={croppedImg}
                  alt="Cropped Image"
                />
              ) : image ? (
                <img
                  className="mb-2 w-1/2 mx-auto"
                  src={image}
                  alt="Image Preview"
                />
              ) : (
                ""
              )}
              <label className="font-medium tracking-wide text-sm">
                Hình ảnh <span className="text-red-500">*</span>
              </label>
              <div
                className="flex items-center gap-2 cursor-pointer bg-blue-500 hover:bg-blue-500/85 w-max text-white p-2 mt-1 rounded"
                onClick={_onClickUploadFile}
              >
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={_onChangeImage}
                />
                <MdOutlineFileUpload className="text-lg" />
                <span className="text-sm font-[450]">Tải ảnh</span>
              </div>
            </div>
            <div className="content-center">
              <label className="font-medium tracking-wide text-sm">
                Tên danh mục <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-bgBlue"
                type="text"
                value={name}
                onChange={_onChangeName}
              />
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
export default UpdateCategory;
