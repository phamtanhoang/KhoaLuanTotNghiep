import { useEffect, useRef, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        to="#"
        className="relative flex items-center justify-center rounded-full  hover:text-orangetext p-0.5"
      >
        <span className="absolute top-[0.175rem] right-[0.25rem] h-2 w-2 rounded-full bg-red-500 ">
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60"></span>
        </span>
        <IoNotificationsOutline className="text-2xl" />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`bg-white absolute -right-5 mt-2.5 lg:right-0  w-72 lg:w-80 h-max max-h-96 flex flex-col rounded-sm border border-borderColor ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3">
          <h5 className="text-sm font-medium text-lightGray">Thông báo</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto scrollbar-custom">
          <li>
            <Link
              className="flex flex-col gap-2.5 border-t border-borderColor px-4 py-3 hover:bg-body2"
              to="#"
            >
              <p className="text-sm text-black line-clamp-3">
                Edit your information in a swipe Sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim.Edit
                your information in a swipe Sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim.
              </p>

              <p className="text-xs">12 May, 2025</p>
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default DropdownNotification;
