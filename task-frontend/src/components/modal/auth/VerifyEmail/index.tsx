import { LoadingContext } from "@/App";
import { authsService } from "@/services";
import { ModalConstants, PathConstants } from "@/utils/constants";
import { SwalHelper } from "@/utils/helpers";
import { createRef, useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useLocation } from "react-router-dom";

const VerifyEmail = (props: any) => {
  const location = useLocation();
  const context = useContext(LoadingContext);
  const handleClose = props.handleClose;
  const email = props.id;
  const fetchData = props.fetchData;
  const inputRefs = Array(5)
    .fill(0)
    .map(() => createRef<HTMLInputElement>());

  const handleInputChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextInput = inputRefs[index + 1];
      if (e.target.value.length === 1 && nextInput) {
        nextInput.current?.focus();
      }
    };

  const handleKeyDown =
    (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && e.currentTarget.value === "") {
        const prevInput = inputRefs[index - 1];
        if (prevInput) {
          prevInput.current?.focus();
        }
      }
    };

  const _onClickSubmit = () => {
    if (
      inputRefs.every((ref) => ref.current && ref.current.value.trim() !== "")
    ) {
      context.handleOpenLoading();
      const verificationCode = inputRefs
        .map((ref) => ref.current?.value)
        .join("");
      if (location.pathname == PathConstants.EMPLOYER_PATHS.signin) {
        authsService
          .verifyEmployer(email, verificationCode)
          .then((res) => {
            if (res.status === 200 && res.data.Status === 200) {
              handleClose();
              fetchData();
              SwalHelper.MiniAlert(res.data.Message, "success");
            } else {
              SwalHelper.MiniAlert(res.data.Message, "error");
            }
          })
          .catch(() => {
            SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
          })
          .finally(() => {
            context.handleCloseLoading();
          });
      } else {
        authsService
          .verifyCandidate(email, verificationCode)
          .then((res) => {
            if (res.status === 200 && res.data.Status === 200) {
              handleClose();
              fetchData();
              SwalHelper.MiniAlert(res.data.Message, "success");
            } else {
              SwalHelper.MiniAlert(res.data.Message, "error");
            }
          })
          .catch(() => {
            SwalHelper.MiniAlert("Có lỗi xảy ra!", "error");
          })
          .finally(() => {
            context.handleCloseLoading();
          });
      }
    }
  };
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        _onClickSubmit();
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (timeLeft === 0) {
      handleClose();
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);
  const _onClickResent = () => {
    setTimeLeft(15 * 60);
  };
  return (
    <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-md dark:bg-gray-950 dark:text-gray-200 relative">
      <button
        className="p-2 rounded-full absolute top-2 right-2 text-xl text-gray-800 hover:text-white hover:bg-orangetext"
        onClick={handleClose}
      >
        <AiOutlineClose />
      </button>
      <h1 className="text-3xl font-semibold text-center mb-4">
        Xác thực Email
      </h1>
      <p className="text-gray-700 text-center mb-4">Mã được gửi tới {email}</p>
      <div className="grid grid-cols-5 gap-x-4 my-2 mx-auto">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="w-16 h-16">
            <input
              ref={inputRefs[index]}
              className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-borderColor text-xl  bg-gray-50 focus:bg-gray-100 focus:ring-1 ring-orangetext"
              type="text"
              pattern="\d*"
              maxLength={1}
              onChange={handleInputChange(index)}
              onKeyDown={handleKeyDown(index)}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </div>
        ))}
      </div>

      <p className="py-3 text-sm font-medium  text-gray-500 ">
        Quá trình xác thực sẽ hết hạn sau ({Math.floor(timeLeft / 60)}:
        {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60})
      </p>

      <button
        className="w-full px-4 py-3 text-base font-medium text-white bg-orangetext rounded-md hover:bg-orangetext/85"
        onClick={_onClickSubmit}
      >
        Xác thực
      </button>
      <div className="flex gap-2 justify-center mt-3">
        <p className=" text-gray-600 text-sm">Tôi không nhận được mã?</p>
        <button
          className=" text-sm font-medium rounded text-gray-500 hover:text-orangetext"
          onClick={_onClickResent}
        >
          Gửi lại
        </button>
      </div>
    </div>
  );
};
export default VerifyEmail;
