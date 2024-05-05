import { TextEditor } from "@/components/form";
import { useEffect, useRef } from "react";
import { AiFillMessage, AiOutlineClose } from "react-icons/ai";
import { IoMdExit } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { MdAttachFile } from "react-icons/md";

const ApplicationDetail = (props: any) => {
  const handleClose = props.handleClose;
  const chatContainerRef = useRef<any>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);
  return (
    <div className="lg:w-[75%] w-screen bg-white relative rounded">
      <div className="flex justify-between gap-4 px-4 py-3 text-white border-b bg-orangetext rounded-t">
        <h2 className="text-xl font-semibold  line-clamp-1 my-auto">
          Thông tin ứng tuyển
        </h2>
        <button
          className="p-1 rounded-md text-lg hover:text-orangetext hover:bg-white"
          onClick={handleClose}
        >
          <AiOutlineClose />
        </button>
      </div>

      <div className="h-max max-h-[75vh] my-2 mx-1 flex">
        <div className="mr-1 px-3 text-gray-700 flex flex-col gap-4 overflow-auto scrollbar-custom lg:w-[55%]">
          <div className="content-center flex flex-col gap-2.5 text-sm ">
            <div className="lg:flex justify-between gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Họ và tên
                </label>
                <input
                  className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  placeholder="Nguyễn Văn A..."
                  disabled
                  // value={name}
                  // onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="lg:flex justify-between gap-4 content-center">
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Email
                </label>
                <input
                  className="w-full content-center  p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  placeholder="candidate@gmail.com"
                  disabled
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="content-center w-full">
                <label className="font-medium tracking-wide text-sm">
                  Số điện thoại
                </label>
                <input
                  className="w-full content-center p-2 mt-1 border rounded focus:outline-none focus:border-orangetext"
                  type="text"
                  placeholder="(+84) xxxxxxxx"
                  disabled
                  // value={phoneNumber}
                  // onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="content-center">
              <div className="content-center w-full flex">
                <label className="font-medium tracking-wide text-sm">
                  CV đã ứng tuyển:&nbsp;&nbsp;
                </label>
                <p className="text-bgBlue hover:text-bgBlue/85 cursor-pointer">
                  Xem chi tiết
                </p>
              </div>
            </div>
          </div>
          <div className="content-center">
            <label className="font-medium tracking-wide">
              Thư giới thiệu:&nbsp;
            </label>

            <div className="text-sm mt-1">
              <TextEditor
                // value={coverLetter}
                // onChange={_onChangeCoverLetter}
                disabled
              />
            </div>
          </div>

          <div className="content-center">
            <label className="font-medium tracking-wide text-base">
              Quá trình ứng tuyển:&nbsp;
            </label>

            <table className="border-collapse w-full mt-1 text-sm">
              <thead>
                <tr>
                  <th className="px-1 py-1.5 font-semibold uppercase bg-gray-100 text-gray-600 border border-borderColor htable-cell">
                    STT
                  </th>

                  <th className="px-1 py-1.5 font-semibold   bg-gray-100 text-gray-600 border border-borderColor htable-cell">
                    Tên bước
                  </th>

                  <th className="px-1 py-1.5 font-semibold   bg-gray-100 text-gray-600 border border-borderColor table-cell">
                    Thời gian phỏng vấn
                  </th>
                  <th className="px-1 py-1.5 font-semibold   bg-gray-100 text-gray-600 border border-borderColor table-cell">
                    Kết quả
                  </th>

                  <th className="px-1 py-1.5 font-semibold   bg-gray-100 text-gray-600 border border-borderColor table-cell">
                    Đánh giá
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    1
                  </td>

                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    Duyệt hồ sơ
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    09:00 03/02/2002
                  </td>

                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    <span className="rounded bg-green-400 py-1 px-3 text-sm font-medium text-white ">
                      Pass
                    </span>
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    Hồ sơ hợp lệ
                  </td>
                </tr>
                <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    2
                  </td>

                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    phỏng vấn Online
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    09:00 03/02/2002
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    <span className="rounded bg-green-400 py-1 px-3 text-sm font-medium text-white ">
                      Pass
                    </span>
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    Kĩ thuật tốt
                  </td>
                </tr>
                <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    3
                  </td>

                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    Phỏng vấn trực tiếp
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    09:00 03/02/2002
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    <span className="rounded bg-green-400 py-1 px-3 text-sm font-medium text-white ">
                      Pass
                    </span>
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    Kĩ năng tốt
                  </td>
                </tr>
                <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    4
                  </td>

                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    Deal lương
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    09:00 03/02/2002
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    <span className="rounded bg-red-400 py-1 px-3 text-sm font-medium text-white ">
                      Fail
                    </span>
                  </td>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                    Lương quá cao
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="border border-orangetext/50"></div>
        <div className="ml-1  text-gray-700 flex flex-col gap-2 lg:w-[45%]">
          <label className="font-medium tracking-wide text-lg px-2">
            Thông tin trao đổi:
          </label>

          <div
            ref={chatContainerRef}
            className="w-full px-2 overflow-y-auto scrollbar-custom flex flex-col gap-3"
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
                    avaliable, but the jority have alternation in some form , by
                    injected humor, or randomise words which don't look even
                    slightly believable.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <div className="w-[80%]">
                <div className="flex items-center gap-3 justify-end">
                  <p className="font-semibold text-sm text-slate-600">
                    Me&nbsp;
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
                    avaliable, but the jority have alternation in some form , by
                    injected humor, or randomise words which don't look even
                    slightly believable.
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
        <button className="flex items-center gap-2 w-max h-max px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600/90 font-medium">
          <AiFillMessage className="text-lg" />
          <p>Trao đổi</p>
        </button>
        <button className="flex items-center gap-2 w-max h-max px-4 py-2 bg-slate-300 text-white rounded-md hover:bg-slate-300/90 font-medium">
          <IoMdExit className="text-lg" />
          <p>Đóng</p>
        </button>
      </div>
    </div>
  );
};
export default ApplicationDetail;
