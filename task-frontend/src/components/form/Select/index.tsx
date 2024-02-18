import { FC } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

interface SelectProps {
  label?: string;
  value?: any;
  options?: any;
  placeholder?: string;
  error?: string;
  isClearable?: boolean;
  isSearchable?: boolean;
  required?: boolean;
  isMulti?: boolean;
  onChange?: any;
}

const SelectCustom: FC<SelectProps> = (props) => {
  const borderStyle = {
    control: (base: any) => ({
      ...base,
      boxShadow: "none",
      borderColor: props.error ? "#ff4d4f" : "#B3B3B3",
      borderWidth: 2,
      ":hover": {
        borderColor: props.error && "#ff4d4f",
      },
      ":focus": {
        borderColor: props.error && "#ff4d4f",
      },
    }),
  };
  const animatedComponents = makeAnimated();

  return (
    <>
      {props.label && (
        <label className="block mb-1 font-medium text-gray-900">
          {props.label}{" "}
          {props.required && <span className="text-red-500 font-bold">*</span>}
        </label>
      )}
      <Select
        closeMenuOnSelect={!props.isMulti}
        components={animatedComponents}
        placeholder={props.placeholder}
        value={props.value}
        options={props.options}
        required={props.required}
        isClearable={props.isClearable}
        isSearchable={props.isSearchable}
        isMulti={props.isMulti}
        onChange={props.onChange}
        styles={borderStyle}
      />
      {props.error && (
        <p className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 italic">
          {props.error}!
        </p>
      )}
    </>
  );
};

export default SelectCustom;
