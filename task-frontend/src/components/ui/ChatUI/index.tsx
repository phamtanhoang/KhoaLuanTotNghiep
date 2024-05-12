import { AuthHelper, DateHelper, SwalHelper } from "@/utils/helpers";
import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import {
  MdAttachFile,
  MdOutlineAttachment,
  MdOutlineEmojiEmotions,
} from "react-icons/md";
import NONE_USER from "@/assets/images/non-user.jpg";
import { AiOutlineClose } from "react-icons/ai";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface ChatUIProps {
  messages: MessageModel[];
  content: string;
  setContent: any;
  file: File | null;
  setFile: any;
  _onClickSend: () => void;
  isLoading: boolean;
}
const ChatUI: React.FC<ChatUIProps> = ({
  messages,
  content,
  setContent,
  file,
  setFile,
  _onClickSend,
  isLoading,
}) => {
  const chatContainerRef = useRef<any>(null);

  const triggerEmoji = useRef<any>(null);
  const dropdownEmoji = useRef<any>(null);

  const [isEmojiPickerVisible, setEmojiPickerVisible] =
    useState<boolean>(false);

  const onEmojiClick = (emojiObject: any) => {
    setContent(content + emojiObject.native);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  const _onClickChooseFile = () => {
    document.getElementById("file-input")?.click();
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdownEmoji.current) return;
      if (
        !isEmojiPickerVisible ||
        dropdownEmoji.current.contains(target) ||
        triggerEmoji.current.contains(target)
      )
        return;
      setEmojiPickerVisible(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!isEmojiPickerVisible || keyCode !== 27) return;
      setEmojiPickerVisible(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <>
      <div
        ref={chatContainerRef}
        className="w-full px-2 h-full overflow-y-auto scrollbar-custom flex flex-col gap-3"
      >
        {messages.map((item, index) => {
          if (item?.userId === AuthHelper.getUser()?.id) {
            return (
              <div key={index} className="w-full flex justify-end">
                <div className="w-[70%]">
                  <div className="flex items-center gap-1.5 justify-end">
                    <p className="font-medium text-sm text-slate-700">Tôi</p>

                    <img
                      className="h-5 w-5 overflow-hidden rounded-full"
                      src={item?.avatar ? item?.avatar : NONE_USER}
                      alt="avatar"
                    />
                  </div>

                  <div className="mt-1 w-full bg-blue-500/85 py-2.5 px-3 rounded-b-md rounded-tl-md">
                    {item?.file && (
                      <div
                        className="text-sm text-white hover:text-white/85  cursor-pointer mb-1 flex gap-1"
                        onClick={() => window.open(item?.file, "_blank")}
                      >
                        <MdOutlineAttachment className="w-max mt-1" />

                        <p className="truncate w-full">{item?.file}</p>
                      </div>
                    )}
                    <p className="text-sm text-white">{item?.content}</p>
                    <p className="text-white text-xs text-right">
                      {DateHelper.formatDateTime(item?.created!)}
                    </p>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div key={index} className="w-full flex flex-start">
                <div className="w-[70%]">
                  <div className="flex items-center gap-1.5">
                    <img
                      className="h-5 w-5 overflow-hidden rounded-full"
                      src={item?.avatar ? item?.avatar : NONE_USER}
                      alt="avatar"
                    />
                    <p className="font-medium text-sm text-slate-700">
                      {item?.userName}&nbsp;
                    </p>
                  </div>

                  <div className="mt-1 w-full bg-body/85 py-2.5 px-3 rounded-b-md rounded-tr-md">
                    {item?.file && (
                      <div
                        className="text-sm text-bgBlue hover:text-bgBlue/85  cursor-pointer mb-1 flex gap-1"
                        onClick={() => window.open(item?.file, "_blank")}
                      >
                        <MdOutlineAttachment className="w-max mt-1" />

                        <p className="truncate w-full">{item?.file}</p>
                      </div>
                    )}

                    <p className="text-sm text-slate-800">{item?.content}</p>
                    <p className="text-slate-400 text-xs text-right">
                      {DateHelper.formatDateTime(item?.created!)}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className=" w-full  px-2 bg-white ">
        <div className="h-10 flex gap-4 justify-between px-3 items-center border border-transparent bg-body2 focus-within:border-borderColor rounded">
          <button
            className="text-slate-600 text-lg relative"
            onClick={_onClickChooseFile}
            disabled={isLoading}
          >
            {file && (
              <button
                className="rounded-full absolute -top-1 -right-1 bg-red-600 text-white h-3 w-3 text-xs "
                onClick={(e) => {
                  setFile(null);
                  e.stopPropagation();
                }}
              >
                <AiOutlineClose className="w-full p-0.5" />
              </button>
            )}

            <MdAttachFile />
            <input
              id="file-input"
              type="file"
              multiple
              className="hidden"
              accept=".doc,.docx,.pdf, .jpg, .png, .jpeg"
              onChange={(e) => {
                if (e?.target?.files) {
                  var maxFileSizeMB = 1;
                  var maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;

                  if (e.target.files[0]?.size > maxFileSizeBytes) {
                    SwalHelper.MiniAlert(
                      "Vui lòng chọn File dưới 1MB!",
                      "warning"
                    );
                    return;
                  }
                  setFile(e.target.files[0]);
                }
              }}
            />
          </button>
          <input
            type="text"
            className="w-full bg-transparent outline-none text-slate-600"
            placeholder="Nhập tin nhắn.."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isLoading}
          />

          <div className="relative">
            <button
              className="text-xl pt-1.5"
              ref={triggerEmoji}
              onClick={() => setEmojiPickerVisible(true)}
            >
              <MdOutlineEmojiEmotions />
            </button>

            {isEmojiPickerVisible && (
              <div
                ref={dropdownEmoji}
                className="absolute bottom-[110%] right-0 z-[999] font-light"
              >
                <Picker data={data} onEmojiSelect={onEmojiClick} />
              </div>
            )}
          </div>
          <button
            className={` text-lg  " ${
              !isLoading && "text-slate-600 hover:text-bgBlue"
            }`}
            onClick={_onClickSend}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center w-full h-full">
                <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
                  <svg
                    fill="none"
                    className="w-10 h-10 animate-spin"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                      fill="currentColor"
                      fill-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              <IoSend />
            )}
          </button>
        </div>
      </div>
    </>
  );
};
export default ChatUI;
