import ImageCropper from "@/components/ui/ImageCropper";
import { ChangeEvent, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import UPLOAD_IMG from "@/assets/images/upload_image.avif";
import { FaRegSave } from "react-icons/fa";
import { GrClear } from "react-icons/gr";

const ChangeAvatar: React.FC<{ handleClose: () => void }> = (props) => {
  const { handleClose } = props;
  const [img, setImg] = useState<any>(null);
  const [croppedImg, setCroppedImg] = useState<any>(null);
  const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    setImg(URL.createObjectURL(e.target.files[0]));
  };
  const _onClearImage = () => {
    setImg(null);
  };
  const handleDropAreaClick = () => {
    document.getElementById("fileInput")?.click();
  };
  return (
    <div className="w-full sm:w-[400px] lg:w-[500px] max-lg:px-5 p-10 bg-white lg:rounded-xl max-h-[90vh] relative">
      <button
        className="p-2 rounded-full absolute top-2 right-2 text-xl text-gray-800 hover:text-white hover:bg-gray-300"
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

      {!img && (
        <div className="mt-8 ">
          <div
            className="flex items-center justify-center w-full flex-col rounded-lg border-4 border-dashed group text-center p-8 cursor-pointer"
            onClick={handleDropAreaClick}
          >
            <div className="h-full w-full sm:w-[500px] text-center flex flex-col items-center justify-center">
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
          <p className="mt-1.5 text-sm text-gray-300">
            <span>Loại tệp: .png, .jpg, types of images</span>
          </p>
        </div>
      )}

      {img && (
        <>
          <div className="my-8 w-full overflow-auto border-2 border-borderColor border-dotted flex justify-center">
            <ImageCropper
              img={img}
              setCroppedImg={setCroppedImg}
              width={1}
              height={1}
            />
          </div>

          <div className="flex justify-end items-center gap-5 text-lg font-medium">
            <button
              className="flex items-center gap-2.5 w-max h-max px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-500/85 font-base"
              onClick={_onClearImage}
            >
              <GrClear />
              <p>Hủy bỏ</p>
            </button>
            <button className="flex items-center gap-2.5 w-max h-max px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600/85 font-base">
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
