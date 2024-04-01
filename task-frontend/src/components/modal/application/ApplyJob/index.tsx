import { ChangeEvent, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdExit } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { TextEditor } from "@/components/form";

const ApplyJob = (props: any) => {
  const handleClose = props.handleClose;
  const [checked, setChecked] = useState<boolean>(true);
  const [cvFile, setCVFile] = useState<File | null>(null);

  const _onClickCVType = (type: boolean) => {
    setChecked(type);
  };
  const _onClickChooseCV = () => {
    if (checked) document.getElementById("input-CV")?.click();
  };

  const _onChangeCV = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCVFile(e.target.files[0]);
    }
  };
  const _onClickClearCV = () => {
    setCVFile(null);
  };

  return (
    <div className="lg:w-[45%] w-screen bg-white relative rounded">
      <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-orangetext rounded-t">
        <h2 className="text-lg font-bold  uppercase line-clamp-1 my-auto">
          Ứng tuyển vị trí Front-end
        </h2>
        <button
          className="p-1 rounded-md text-lg hover:text-orangetext hover:bg-white"
          onClick={handleClose}
        >
          <AiOutlineClose />
        </button>
      </div>

      <div className="overflow-auto scrollbar-custom h-max max-h-[75vh]">
        <div className="my-4 mx-4 text-gray-700 flex flex-col gap-4">
          <div className="p-4 border border-orangetext border-dotted rounded-lg flex flex-col gap-2 text-sm ">
            <div className="content-center">
              <label className="font-semibold tracking-wide">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                type="text"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div className="lg:flex justify-between gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-semibold tracking-wide">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  placeholder="nguyenvana@example.com"
                />
              </div>
              <div className="content-center w-full">
                <label className="font-semibold tracking-wide">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  placeholder="0123456789"
                />
              </div>
            </div>
            <div className="content-center">
              <label className="font-semibold tracking-wide">
                Chọn CV để ứng tuyển <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 flex flex-col gap-2 ">
                <div
                  className="flex gap-2 cursor-pointer"
                  onClick={() => _onClickCVType(true)}
                >
                  <input
                    type="checkbox"
                    className={`cursor-pointer relative h-4 w-4 rounded-md border transition-all appearance-none my-auto ${
                      checked && "border-orangetext bg-orangetext"
                    }`}
                    checked={checked == true ? true : false}
                  />
                  <label
                    htmlFor="isExChange"
                    className="cursor-pointer text-slate-500 flex justify-center items-center font-bold pl-2 pr-2 bg-slate-200 uppercase text-xs py-0.5"
                  >
                    Tải CV lên từ máy của tôi
                  </label>
                </div>
                <div
                  className="flex gap-2 cursor-pointer"
                  onClick={() => _onClickCVType(false)}
                >
                  <input
                    type="checkbox"
                    className={`cursor-pointer relative h-4 w-4 rounded-md border transition-all appearance-none my-auto ${
                      !checked && "border-orangetext bg-orangetext"
                    }`}
                    checked={checked == false ? true : false}
                  />
                  <label
                    htmlFor="isExChange"
                    className="cursor-pointer text-slate-500 flex justify-center items-center font-bold pl-2 pr-2 bg-slate-200 uppercase text-xs py-0.5"
                  >
                    Chọn CV trong thư viện của tôi
                  </label>
                </div>

                <div
                  className="border-dashed border  p-5 flex flex-col justify-center items-center"
                  onClick={_onClickChooseCV}
                >
                  <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                    {checked
                      ? "Tải lên CV từ thiết bị của bạn."
                      : "Tải lên CV từ thư viện của bạn."}
                  </p>
                  <input
                    id="input-CV"
                    type="file"
                    multiple
                    className="hidden"
                    accept=".doc,.docx,.pdf"
                    onChange={_onChangeCV}
                  />
                  <button
                    id="button"
                    className="rounded-sm px-3 py-1 bg-slate-200 hover:bg-slate-300 font-medium"
                  >
                    Chọn CV
                  </button>
                </div>

                {checked && (
                  <p className=" text-sm text-gray-400">
                    <span>Loại tệp: .doc, .docs, .pdf.</span>
                  </p>
                )}

                {cvFile && (
                  <div className="rounded-md bg-gray-100 py-3 px-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-base font-medium truncate">
                        {cvFile.name}
                      </p>
                      <button className="" onClick={_onClickClearCV}>
                        <AiOutlineClose />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="content-center">
            <label className="font-semibold tracking-wide text-lg">
              Thư giới thiệu:&nbsp;
            </label>
            <p className="text-gray-600 font-normal text-sm pb-1">
              Một thư giới thiệu ngắn gọn, chỉn chu sẽ giúp bạn trở nên chuyên
              nghiệp và gây ấn tượng hơn với nhà tuyển dụng.
            </p>
            {/* <textarea
              className="w-full content-center text-sm p-2 mt-1 border rounded focus:outline-none focus:border-orangetext h-24"
              placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do bạn muốn ứng tuyển vị trí này."
            /> */}
            <TextEditor placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do bạn muốn ứng tuyển vị trí này." />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 px-4 py-3 border-t  ">
        <button className="flex items-center gap-2 w-max h-max px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600/90 font-medium">
          <IoSend className="text-base" />
          <p>Ứng tuyển</p>
        </button>
        <button className="flex items-center gap-2 w-max h-max px-4 py-2 bg-slate-300 text-white rounded-md hover:bg-slate-300/90 font-medium">
          <IoMdExit className="text-lg" />
          <p>Đóng</p>
        </button>
      </div>
    </div>
  );
};
export default ApplyJob;