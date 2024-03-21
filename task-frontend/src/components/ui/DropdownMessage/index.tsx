import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import NON_USER from "@/assets/images/non-user.jpg";
import { AiOutlineMessage } from "react-icons/ai";

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
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
    <li className="relative" x-data="{ dropdownOpen: false, notifying: true }">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="relative flex items-center justify-center rounded-full  hover:text-orangetext p-0.5"
        to="#"
      >
        <span className="absolute top-[0.175rem] right-[0.25rem] h-2 w-2 rounded-full bg-red-500 ">
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60"></span>
        </span>

        <AiOutlineMessage className="text-2xl" />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`bg-white absolute -right-1 mt-2.5 lg:right-0  w-72 lg:w-80 h-max max-h-96 flex flex-col rounded-sm border border-borderColor ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3">
          <h5 className="text-sm font-medium text-lightGray">Messages</h5>
        </div>

        <ul className="flex h-max flex-col overflow-y-auto scrollbar-custom">
          <li>
            <Link
              className="flex gap-4 border-t px-4 py-3 hover:bg-body2"
              to="/messages"
            >
              <img
                src={NON_USER}
                alt="User"
                className="h-14 w-14 rounded-full"
              />

              <div>
                <h6 className="text-sm font-medium text-black">
                  Mariya Desoja
                </h6>
                <p className="text-sm line-clamp-1">
                  I like your confidence 💪 I like your confidence 💪
                </p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t px-4 py-3 hover:bg-body2"
              to="/messages"
            >
              <img
                src={NON_USER}
                alt="User"
                className="h-14 w-14 rounded-full"
              />

              <div>
                <h6 className="text-sm font-medium text-black">
                  Mariya Desoja
                </h6>
                <p className="text-sm line-clamp-1">
                  I like your confidence 💪 I like your confidence 💪
                </p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t px-4 py-3 hover:bg-body2"
              to="/messages"
            >
              <img
                src={NON_USER}
                alt="User"
                className="h-14 w-14 rounded-full"
              />

              <div>
                <h6 className="text-sm font-medium text-black">
                  Mariya Desoja
                </h6>
                <p className="text-sm line-clamp-1">
                  I like your confidence 💪 I like your confidence 💪
                </p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t px-4 py-3 hover:bg-body2"
              to="/messages"
            >
              <img
                src={NON_USER}
                alt="User"
                className="h-14 w-14 rounded-full"
              />

              <div>
                <h6 className="text-sm font-medium text-black">
                  Mariya Desoja
                </h6>
                <p className="text-sm line-clamp-1">
                  I like your confidence 💪 I like your confidence 💪
                </p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4 border-t px-4 py-3 hover:bg-body2"
              to="/messages"
            >
              <img
                src={NON_USER}
                alt="User"
                className="h-14 w-14 rounded-full"
              />

              <div>
                <h6 className="text-sm font-medium text-black">
                  Mariya Desoja
                </h6>
                <p className="text-sm line-clamp-1">
                  I like your confidence 💪 I like your confidence 💪
                </p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default DropdownMessage;
