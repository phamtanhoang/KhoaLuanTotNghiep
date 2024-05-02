import React from "react";
import Select, { StylesConfig, ThemeConfig } from "react-select";
import makeAnimated from "react-select/animated";

interface SelectCustomProps {
  className?: string;
  options?: any;
  value?: any;
  onChange?: any;
  isMulti?: boolean;
  placeholder?: string;
  theme?: ThemeConfig;
  styles?: StylesConfig<any, boolean>;
  disabled?: boolean;
}
const animatedComponents = makeAnimated();

const SelectCustom: React.FC<SelectCustomProps> = ({
  className,
  options,
  value,
  onChange,
  isMulti,
  placeholder,
  theme,
  styles,
  disabled,
}) => {
  return (
    <Select
      className={`${className}`}
      placeholder={placeholder}
      options={options}
      value={value}
      onChange={onChange}
      theme={theme}
      isMulti={isMulti}
      styles={styles}
      isClearable
      components={animatedComponents}
      isDisabled={disabled}
    />
  );
};

export default SelectCustom;
