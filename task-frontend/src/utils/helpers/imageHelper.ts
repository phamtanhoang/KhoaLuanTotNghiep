const dataURItoFile = (dataURI: string, filename: string): File => {
  const byteString = atob(dataURI.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new File([ab], filename, { type: "image/jpeg" });
};

export const ImageHelper = {
  dataURItoFile,
};
