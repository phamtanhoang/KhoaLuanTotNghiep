import { ChangeEvent } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
interface SettingAccountProps {
  myCV?: string;
  _onClickChangeMyCV?: (e: ChangeEvent<HTMLInputElement>) => void;
  _onClickDeleteCV?: () => void;
  isFindJob?: boolean;
  _onClickFindJob?: () => void;
}

const SettingAccount: React.FC<SettingAccountProps> = ({
  myCV,
  _onClickChangeMyCV,
  _onClickDeleteCV,
  isFindJob,
  _onClickFindJob,
}) => {
  return (
    <div className="bg-white p-5 shadow-sm rounded-sm">
      <h2 className="tracking-wide text-lg flex font-semibold">
        <span className="text-orangetext text-xl my-auto ">
          <IoSettings />
        </span>
        &nbsp;&nbsp;Thiết lập
      </h2>
      <div className="mt-4 flex flex-col gap-4">
        <div className="">
          <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer ${
                isFindJob ? "right-0 border-orangetext" : "left-0"
              }`}
              checked={isFindJob}
              readOnly
              onClick={_onClickFindJob}
            />
            <label
              htmlFor="toggle"
              className={`toggle-label block overflow-hidden h-6 rounded-full ${
                isFindJob ? "bg-orangetext" : "bg-gray-300"
              }`}
            ></label>
          </div>
          <label
            className={`text-gray-400 text-base font-semibold ${
              isFindJob ? "text-orangetext" : "text-gray-300"
            }`}
          >
            Cho phép NTD xem hồ sơ
          </label>
        </div>
        <div className="flex flex-col ">
          <div className="mb-0.5">
            <p className="font-medium mb-1">CV của bạn:</p>
            {myCV && (
              <div className="flex gap-2">
                <p
                  className="truncate text-bgBlue hover:text-bgBlue/85 my-auto cursor-pointer w-full"
                  onClick={() => window.open(myCV, "_blank")}
                >
                  {myCV}
                </p>
                <AiFillDelete
                  className=" cursor-pointer text-gray-700 hover:text-red-500 text-2xl my-auto w-max"
                  onClick={_onClickDeleteCV}
                />
              </div>
            )}
          </div>
          <label className="flex cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-2 py-5 text-sm transition hover:border-gray-400 focus:border-solid focus:border-orangetext focus:outline-none focus:ring-1 focus:ring-orangetext disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75 gap-1.5">
            <FaCloudUploadAlt className="text-xl" />
            <span className="flex items-center">
              <span className="text-sm font-medium text-gray-600">
                Tải lên CV của bạn
              </span>
            </span>
            <input
              id="photo-dropbox"
              type="file"
              className="sr-only"
              accept=".doc,docx,.pdf"
              onChange={_onClickChangeMyCV}
            />
          </label>
        </div>
      </div>
    </div>
  );
};
export default SettingAccount;
