import { AiOutlineClose } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { ChangeEvent, useContext, useState } from "react";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import { categoriesService } from "@/services";
import { MdOutlineFileUpload } from "react-icons/md";
import ModalBase from "../..";
import { MODAL_KEYS } from "@/utils/constants/modalConstants";
import { ImageHelper } from "@/utils/helpers/imageHelper";
import { LoadingContext } from "@/App";

const CreateCategory = (props: any) => {
  const handleClose = props.handleClose;
  const fetchListData = props.fetchData;
  const context = useContext(LoadingContext);

  const [openSub, setOpenSub] = useState(false);
  const [funcsSub, setFuncsSub] = useState<string>("");
  const handleOpenSub = () => setOpenSub(true);
  const handleCloseSub = () => setOpenSub(false);

  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string | undefined>();
  const [croppedImg, setCroppedImg] = useState<string | undefined>();

  const _onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  };
  const _onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];
    setImage(URL.createObjectURL(selectedFile));

    handleOpenSub();
    setFuncsSub(MODAL_KEYS.chooseImage);
  };

  const _onClickSave = () => {
    if (name === "") {
      SwalHelper.MiniAlert("Vui lòng nhập tên danh mục!", "warning");
      return;
    }

    if (croppedImg === null || croppedImg === undefined) {
      SwalHelper.MiniAlert("Vui lòng chọn hình ảnh!", "warning");
      return;
    }

    context.handleOpenLoading();
    categoriesService
      .create(name.trim(), ImageHelper.dataURItoFile(croppedImg, ""))
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
  const _onClickUploadFile = () => {
    document.getElementById("fileInput")?.click();
  };
  return (
    <>
      <ModalBase
        open={openSub}
        handleClose={handleCloseSub}
        funcs={funcsSub}
        image={image}
        setCroppedImg={setCroppedImg}
      />
      <div className="md:w-[50%] xl:w-[30%] w-screen bg-white relative lg:rounded">
        <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-bgBlue lg:rounded-t">
          <h2 className="text-xl font-medium  line-clamp-1 my-auto">
            Thêm danh mục mới
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
              {croppedImg && (
                <img
                  className="mb-2 w-1/2 mx-auto"
                  src={croppedImg}
                  alt="Cropped Image"
                />
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
                placeholder="Nhập tên danh mục..."
                value={name}
                onChange={_onChangeName}
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
    </>
  );
};
export default CreateCategory;
