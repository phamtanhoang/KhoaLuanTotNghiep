import { FC } from "react";

interface TextAreaProps {
  label?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: any;
}

const TextAreaCustom: FC<TextAreaProps> = (props) => {
  return (
    <>
      {props.label && (
        <label className="block mb-1 font-medium text-gray-900">
          {props.label}{" "}
          {props.required && <span className="text-red-500 font-bold">*</span>}
        </label>
      )}

      <textarea
        className={`h-[2.4rem] w-full rounded-[4px] border px-3 py-2 text-[#333333] focus:outline-none ${
          props.error
            ? "border-2 border-red-500"
            : "focus:border-2 focus:border-[#2684ff] border-[#B3B3B3]"
        }`}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        disabled={props.disabled}
        required={props.required}
      />

      {props.error && (
        <p className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 italic">
          {props.error}!
        </p>
      )}
    </>
  );
};

export default TextAreaCustom;
