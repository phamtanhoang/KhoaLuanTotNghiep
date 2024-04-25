import ImageCropper from "@/components/ui/ImageCropper";
import { ChangeEvent, useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import UPLOAD_IMG from "@/assets/images/upload_image.avif";
import { FaRegSave } from "react-icons/fa";
import { GrClear } from "react-icons/gr";
import { LoadingContext } from "@/App";
import { SwalHelper } from "@/utils/helpers/swalHelper";
import { ImageHelper } from "@/utils/helpers/imageHelper";
import employersService from "@/services/employersService";
import { AuthHelper } from "@/utils/helpers/authHelper";
import candidatesService from "@/services/candidatesService";
import humanResourcesService from "@/services/humanResourcesService";

const ChangeAvatar = (props: any) => {
  const handleClose = props.handleClose;
  const fetchData = props.fetchData;
  const context = useContext(LoadingContext);
  const [image, setImage] = useState<string | null>(null);
  const [croppedImg, setCroppedImg] = useState<string | null>(null);
  const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setCroppedImg(null);
    }
  };

  const handleDropAreaClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const _onClearImage = () => {
    setImage(null);
  };

  const _onSave = () => {
    if (croppedImg === null || croppedImg === undefined) {
      SwalHelper.MiniAlert("Vui lòng chọn hình ảnh!", "warning");
      return;
    }
    context.handleOpenLoading();
    let img: File = ImageHelper.dataURItoFile(
      croppedImg,
      "avatar" + AuthHelper.getUser().id
    );
    if (AuthHelper.isCandidate()) {
      candidatesService
        .changeImage(img)
        .then((res) => {
          if (res.status === 200 && res.data.Status === 200) {
            SwalHelper.MiniAlert(res.data.Message, "success");
            fetchData();
            handleClose();
          } else {
            SwalHelper.MiniAlert(res.data.Message, "error");
          }
        })
        .catch((e) => {
          console.log(e.message);
          SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
        })
        .finally(() => {
          context.handleCloseLoading();
        });
    } else if (AuthHelper.isEmployer()) {
      employersService
        .changeImage(img)
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
    } else if (AuthHelper.isHR()) {
      humanResourcesService
        .updateAvatar(img)
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
    }
  };
  return (
    <div className="w-full sm:w-[400px] lg:w-[450px] max-lg:px-5 p-8 bg-white lg:rounded-xl max-h-[90vh] relative">
      <button
        className="p-2 rounded-full absolute top-2 right-2 text-xl text-gray-800 hover:text-white hover:bg-orangetext"
        onClick={handleClose}
      >
        <AiOutlineClose />
      </button>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Đổi ảnh đại diện!</h2>
        <p className="mt-2 text-sm text-gray-400">
          Chọn ảnh đại diện phù hợp tỉ lệ (1 : 1)
        </p>
      </div>

      {!image && (
        <div className="mt-5 ">
          <div
            className="flex items-center justify-center w-full flex-col rounded-lg border-4 border-dashed group text-center p-8 cursor-pointer"
            onClick={handleDropAreaClick}
          >
            <div className="h-full w-full sm:w-[450px] text-center flex flex-col items-center justify-center">
              <div className="flex flex-auto mx-auto -mt-8">
                <img
                  className="has-mask h-40 object-center"
                  src={UPLOAD_IMG}
                  alt="freepik image"
                />
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Tải lên hình ảnh từ thiết bị của bạn{" "}
                <a
                  className="text-blue-600 hover:underline"
                  onClick={handleDropAreaClick}
                >
                  tại đây
                </a>
                .
              </p>
            </div>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={_onChange}
            />
          </div>
          <p className="mt-1.5 text-sm text-gray-400">
            <span>Loại tệp: .png, .jpg, types of images</span>
          </p>
        </div>
      )}

      {image && (
        <>
          <div className="my-5 w-full overflow-auto border-2 border-borderColor border-dotted flex justify-center">
            <ImageCropper
              img={image}
              setCroppedImg={setCroppedImg}
              width={1}
              height={1}
            />
          </div>

          <div className="flex justify-end gap-4 -mx-8 -mb-8 px-8 py-4 border-t  ">
            <button
              className="flex items-center gap-2 w-max h-max px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-500/85 font-medium"
              onClick={_onClearImage}
            >
              <GrClear className="text-base" />
              <p>Hủy bỏ</p>
            </button>
            <button
              className="flex items-center gap-2 w-max h-max px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600/85 font-medium"
              onClick={_onSave}
            >
              <FaRegSave className="text-lg" />
              <p>Lưu</p>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default ChangeAvatar;
