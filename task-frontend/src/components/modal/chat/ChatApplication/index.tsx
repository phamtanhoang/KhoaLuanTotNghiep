import { AiOutlineClose } from "react-icons/ai";
import { IoMdExit } from "react-icons/io";
import { useEffect, useRef } from "react";
import { MdAttachFile } from "react-icons/md";
import { IoSend } from "react-icons/io5";

const ChatApplication = (props: any) => {
  const handleClose = props.handleClose;

  const chatContainerRef = useRef<any>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);

  return (
    <>
      <div className="md:w-[50%] xl:w-[40%] w-screen bg-white relative lg:rounded">
        <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-orangetext lg:rounded-t">
          <h2 className="text-xl font-medium  line-clamp-1 my-auto">
            Thông tin trao đổi
          </h2>
          <button
            className="p-1 rounded-md text-lg hover:text-orangetext hover:bg-white"
            onClick={handleClose}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="h-max  my-2 mx-1 flex">
          <div className="ml-1  text-gray-700 flex flex-col gap-2 w-full">
            <div
              ref={chatContainerRef}
              className="w-full px-2 h-[60vh] overflow-y-auto scrollbar-custom flex flex-col gap-3"
            >
              <div className="w-full flex flex-start">
                <div className="w-[80%]">
                  <div className="flex items-center gap-3">
                    <img
                      className="h-5 w-5 overflow-hidden rounded-full"
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                      alt=""
                    />
                    <p className="font-semibold  text-sm text-slate-600">
                      Mircel Jones&nbsp;
                      <span className="text-slate-400 text-xs">3:21 PM</span>
                    </p>
                  </div>

                  <div className="mt-3 w-full bg-body p-4 rounded-b-xl rounded-tr-xl">
                    <p className=" text-sm text-slate-500">
                      Hey all, <br />
                      There are many variation of passages of Lorem ipsum
                      avaliable, but the jority have alternation in some form ,
                      by injected humor, or randomise words which don't look
                      even slightly believable.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-start">
                <div className="w-[80%]">
                  <div className="flex items-center gap-3">
                    <img
                      className="h-5 w-5 overflow-hidden rounded-full"
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                      alt=""
                    />
                    <p className="font-semibold  text-sm text-slate-600">
                      Mircel Jones&nbsp;
                      <span className="text-slate-400 text-xs">3:21 PM</span>
                    </p>
                  </div>

                  <div className="mt-3 w-full bg-body p-4 rounded-b-xl rounded-tr-xl">
                    <p className=" text-sm text-slate-500">
                      Hey all, <br />
                      There are many variation of passages of Lorem ipsum
                      avaliable, but the jority have alternation in some form ,
                      by injected humor, or randomise words which don't look
                      even slightly believable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" w-full  px-2  bg-white">
              <div className="h-12 flex gap-4 justify-between px-3 items-center border border-transparent bg-body2 focus-within:border-borderColor rounded-lg">
                <button className="text-slate-600 text-lg">
                  <MdAttachFile />
                </button>
                <input
                  type="text"
                  className="w-full bg-transparent outline-none text-slate-600"
                  placeholder="Nhập tin nhắn.."
                />
                <button className="text-slate-600 text-lg hover:text-orangetext">
                  <IoSend />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 px-4 py-3 border-t  ">
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
export default ChatApplication;
