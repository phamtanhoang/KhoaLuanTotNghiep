import { useEffect, useRef } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import { MdAttachFile } from "react-icons/md";

const ChatEmployerPage = () => {
  const chatContainerRef = useRef<any>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);

  return (
    <>
      <div className="bg-white lg:rounded-t-xl relative w-full flex border border-borderColor  h-[100vh] lg:h-[83vh]  lg:-my-4">
        <div className="w-full lg:w-[35%] bg-white border-r flex flex-col rounded-tl-xl text-sm font-medium">
          <div className="border-b border-borderColor flex items-center justify-center gap-4">
            <div className="px-4 py-3 border-b-4 border-b-orangetext">
              Bộ phận tuyển dụng
            </div>
            <div className="px-4 py-3 ">Ứng viên</div>
          </div>
          <div className="h-full overflow-y-auto scrollbar-custom">
            <div className="p-4 flex items-center bg-body cursor-pointer border-l-4 border-l-orangetext border-y hover:bg-body2">
              <img
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500 "
                className="h-10 w-10 border-2 border-white rounded-full"
                alt=""
              />
              <div className="ml-4">
                <p className="text-md font-semibold text-slate-600 m-0 p-0 line-clamp-1">
                  Mircel Jones
                </p>
                <p className="text-xs text-slate-400 font-semibold line-clamp-1">
                  Ok, Thanks. Ok, Thanks. Ok, Thanks. Ok, Thanks. Ok, Thanks.
                  Ok, Thanks. Ok, Thanks. Ok, Thanks. Ok, Thanks. Ok, Thanks.
                  Ok, Thanks.
                </p>
              </div>
            </div>
            <div className="p-4 flex items-center bg-white cursor-pointer border-y hover:bg-body2">
              <img
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500 "
                className="h-10 w-10 border-2 border-white rounded-full"
                alt=""
              />
              <div className="ml-4">
                <p className="text-md font-semibold text-slate-600 m-0 p-0 line-clamp-1">
                  Mircel Jones
                </p>
                <p className="text-xs text-slate-400 font-semibold line-clamp-1">
                  Ok, Thanks. Ok, Thanks. Ok, Thanks. Ok, Thanks. Ok, Thanks.
                  Ok, Thanks. Ok, Thanks. Ok, Thanks. Ok, Thanks. Ok, Thanks.
                  Ok, Thanks.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-lg:hidden w-[65%] flex flex-col relative">
          <div className="border-b border-borderColor flex justify-between items-center w-full px-5 py-2 shadow-sm">
            <div className="flex items-center gap-4">
              <img
                className="h-10 w-10 overflow-hidden rounded-full"
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                alt=""
              />
              <p className="font-semibold text-slate-600">Mircel Jones</p>
            </div>
            <button className="relative items-center">
              <HiDotsHorizontal className="text-black text-xl" />
            </button>
          </div>
          <div
            ref={chatContainerRef}
            className="w-full px-5 py-2 overflow-y-auto scrollbar-custom flex flex-col gap-3 mb-16"
          >
            <div className="w-full flex flex-start">
              <div className="w-1/2">
                <div className="flex items-center gap-3">
                  <img
                    className="h-5 w-5 overflow-hidden rounded-full"
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                    alt=""
                  />
                  <p className="font-semibold  text-sm text-slate-600">
                    Mircel Jones{" "}
                    <span className="text-slate-400 text-xs">3:21 PM</span>
                  </p>
                </div>

                <div className="mt-3 w-full bg-body p-4 rounded-b-xl rounded-tr-xl">
                  <p className=" text-sm text-slate-500">
                    Hey all, <br />
                    There are many variation of passages of Lorem ipsum
                    avaliable, but the jority have alternation in some form , by
                    injected humor, or randomise words which don't look even
                    slightly believable.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <div className="w-1/2 ">
                <div className="flex items-center gap-3 justify-end">
                  <p className="font-semibold text-sm text-slate-600">
                    Me{" "}
                    <span className="text-slate-400 text-xs font-normal">
                      3:25 PM
                    </span>
                  </p>

                  <img
                    className="h-5 w-5 overflow-hidden rounded-full"
                    src="https://source.unsplash.com/random/500x500/?face"
                    alt=""
                  />
                </div>

                <div className="mt-3 w-full bg-orangetext p-4 rounded-b-xl rounded-tl-xl">
                  <p className=" text-sm text-white">
                    Hey, <br />
                    we are own hidden lake forest which is netural lake are
                    generaly found in mountain.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-start">
              <div className="w-1/2">
                <div className="flex items-center gap-3">
                  <img
                    className="h-5 w-5 overflow-hidden rounded-full"
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                    alt=""
                  />
                  <p className="font-semibold  text-sm text-slate-600">
                    Mircel Jones{" "}
                    <span className="text-slate-400 text-xs">3:21 PM</span>
                  </p>
                </div>

                <div className="mt-3 w-full bg-body p-4 rounded-b-xl rounded-tr-xl">
                  <p className=" text-sm text-slate-500">
                    Hey all, <br />
                    There are many variation of passages of Lorem ipsum
                    avaliable, but the jority have alternation in some form , by
                    injected humor, or randomise words which don't look even
                    slightly believable.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-start">
              <div className="w-1/2">
                <div className="flex items-center gap-3">
                  <img
                    className="h-5 w-5 overflow-hidden rounded-full"
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                    alt=""
                  />
                  <p className="font-semibold  text-sm text-slate-600">
                    Mircel Jones{" "}
                    <span className="text-slate-400 text-xs">3:21 PM</span>
                  </p>
                </div>

                <div className="mt-3 w-full bg-body p-4 rounded-b-xl rounded-tr-xl">
                  <p className=" text-sm text-slate-500">
                    Hey all, <br />
                    There are many variation of passages of Lorem ipsum
                    avaliable, but the jority have alternation in some form , by
                    injected humor, or randomise words which don't look even
                    slightly believable.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-start">
              <div className="w-1/2">
                <div className="flex items-center gap-3">
                  <img
                    className="h-5 w-5 overflow-hidden rounded-full"
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                    alt=""
                  />
                  <p className="font-semibold  text-sm text-slate-600">
                    Mircel Jones{" "}
                    <span className="text-slate-400 text-xs">3:21 PM</span>
                  </p>
                </div>

                <div className="mt-3 w-full bg-body p-4 rounded-b-xl rounded-tr-xl">
                  <p className=" text-sm text-slate-500">
                    Hey all, <br />
                    There are many variation of passages of Lorem ipsum
                    avaliable, but the jority have alternation in some form , by
                    injected humor, or randomise words which don't look even
                    slightly believable.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 left-0  w-full  px-5 py-3 bg-white">
            <div className="h-12 flex gap-4 justify-between px-3 items-center border border-transparent bg-body2 focus-within:border-borderColor rounded-lg">
              <button className="text-slate-600 text-lg">
                <MdAttachFile />
              </button>
              <input
                type="text"
                className="w-full bg-transparent outline-none text-slate-600"
                placeholder="Nhập tin nhắn.."
              />
              <button className="text-slate-600 text-lg">
                <IoSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChatEmployerPage;
