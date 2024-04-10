const dataURItoFile = (dataURI: string, name: string) => {
  const byteCharacters = atob(dataURI.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const convertedFile = new File([byteArray], `${name}.jpg`, {
    type: "image/jpeg",
  });
  return convertedFile;
};

export const ImageHelper = {
  dataURItoFile,
};
