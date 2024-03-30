import Swal, { SweetAlertIcon } from "sweetalert2";
import "@/assets/style/Swal-Custom.css";

const Confirm = (
  title: string,
  icon: SweetAlertIcon,
  isConfirmed: () => void,
  isDismissed: () => void,
  confirmButtonText?: string,
  cancelButtonText?: string
) => {
  Swal.fire({
    icon: icon,
    title: title,
    showCancelButton: true,
    cancelButtonText: confirmButtonText || "Hủy bỏ",
    confirmButtonText: cancelButtonText || "Đồng ý",
    customClass: {
      title: "title-confirm",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      isConfirmed();
    } else if (result.isDismissed) {
      isDismissed();
    }
  });
};
const MiniAlert = (
  title: string,
  icon: SweetAlertIcon,
  timer?: number,
  showConfirmButton?: boolean,
  timerProgressBar?: boolean
) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: showConfirmButton || false,
    timer: timer || 3000,
    timerProgressBar: timerProgressBar || true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    customClass: {
      title: "title-mini-alert",
    },
  });
  Toast.fire({
    icon: icon,
    title: title,
  });
};

const BigAlert = (
  title: string,
  icon: SweetAlertIcon,
  confirmText?: string,
  cancelText?: string,
  _func?: () => void
) => {
  Swal.fire({
    title: title,
    icon: icon,
    customClass: {
      title: "title-big-alert",
    },
    showCancelButton: cancelText ? true : false,
    confirmButtonText: confirmText || "Xác nhận",
    cancelButtonText: cancelText,
  }).then(() => {
    _func;
  });
};

export const SwalHelper = {
  Confirm,
  MiniAlert,
  BigAlert,
};
