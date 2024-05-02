import { ImageCropper } from "@/components/ui";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { GrClear } from "react-icons/gr";

const ChooseImage = (props: any) => {
  const handleClose = props.handleClose;
  const image = props.image;
  const setCroppedImg = props.setCroppedImg;
  const [termImg, setTermImg] = useState<string | undefined>();

  const _onClickSubmit = () => {
    setCroppedImg(termImg);
    handleClose();
  };

  return (
    <div className="w-full sm:w-[400px] lg:w-[450px] max-lg:px-5 p-8 bg-white lg:rounded-xl max-h-[90vh] relative">
      <button
        className="p-2 rounded-full absolute top-2 right-2 text-xl text-gray-800 hover:text-white hover:bg-bgBlue"
        onClick={handleClose}
      >
        <AiOutlineClose />
      </button>
      <div className="text-center ">
        <h2 className="text-2xl font-bold text-gray-900">Chỉnh sửa ảnh!</h2>
        <p className=" text-sm text-gray-400 ">Tỉ lệ (1 : 1)</p>
      </div>

      {image && (
        <>
          <div className="my-5 w-full overflow-auto border-2 border-borderColor border-dotted flex justify-center">
            <ImageCropper
              img={image}
              setCroppedImg={setTermImg}
              width={1}
              height={1}
            />
          </div>

          <div className="flex justify-end gap-4 -mx-8 -mb-8 px-8 py-4 border-t  ">
            <button
              className="flex items-center gap-2 w-max h-max px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-500/85 font-[450]"
              onClick={handleClose}
            >
              <GrClear className="text-base" />
              <p>Hủy bỏ</p>
            </button>
            <button
              className="flex items-center gap-2 w-max h-max px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600/85 font-[450]"
              onClick={_onClickSubmit}
            >
              <FaRegSave className="text-lg" />
              <p>Xác nhận</p>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default ChooseImage;
