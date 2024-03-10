import { CiLink } from "react-icons/ci";
import Swal from "sweetalert2";

const ShareCard = () => {
  const currentUrl = window.location.href;
  const _onClickCopyClick = () => {
    const inputField = document.getElementById("urlInput") as HTMLInputElement;

    if (inputField) {
      inputField.select();
      document.execCommand("copy");
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Đã sao chép Link!",
      });
    }
  };
  return (
    <>
      <CiLink className="text-3xl" />
      <input
        id="urlInput"
        className="w-full outline-none bg-transparent truncate"
        type="text"
        placeholder="link"
        value={currentUrl}
        readOnly
      />

      <button
        className="w-max py-1 px-2.5 text-white rounded lg:rounded-md flex  justify-center items-center min-w-max outline-none relative overflow-hidden duration-300 ease-linear
                    after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-500 hover:after:opacity-100 hover:after:scale-[2.5] bg-orangetext border-transparent hover:border-orange-500"
        onClick={_onClickCopyClick}
      >
        <span className="flex relative z-[1] text-sm font-normal">
          Sao chép
        </span>
      </button>
    </>
  );
};
export default ShareCard;
