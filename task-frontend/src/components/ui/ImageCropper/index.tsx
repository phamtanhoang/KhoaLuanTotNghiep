import { ChangeEvent, useState } from "react";

import "react-cropper-custom/dist/index.css";
import { Area } from "./types";
import "./module.style.css";
import { Cropper, getCroppedImg } from "react-cropper-custom";
interface ImageCropperProps {
  img: any;
  setCroppedImg: any;
  width: number;
  height: number;
}
const ImageCropper: React.FC<ImageCropperProps> = ({
  img,
  setCroppedImg,
  width,
  height,
}) => {
  const [zoom, setZoom] = useState(1);
  let scale = height / width;
  const onCropComplete = async (croppedArea: Area) => {
    try {
      const canvasSize = {
        width: 1200,
        height: 1200 * scale,
      };
      const image = await getCroppedImg(img, croppedArea, canvasSize);
      setCroppedImg(image);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Cropper
      src={img}
      zoom={zoom}
      aspect={scale}
      onZoomChange={setZoom}
      onCropComplete={onCropComplete}
    />
  );
};

export default ImageCropper;
