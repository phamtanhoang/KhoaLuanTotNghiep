import React from "react";
import Select, { StylesConfig, ThemeConfig } from "react-select";

interface SelectCustomProps {
  className?: string;
  options?: any;
  value?: any;
  onChange?: any;
  isMulti?: boolean;
  placeholder?: string;
  theme?: ThemeConfig;
  styles?: StylesConfig<any, boolean>;
}

const SelectCustom: React.FC<SelectCustomProps> = ({
  className,
  options,
  value,
  onChange,
  isMulti,
  placeholder,
  theme,
  styles,
}) => {
  return (
    <Select
      className={className}
      placeholder={placeholder}
      options={options}
      value={value}
      onChange={onChange}
      theme={theme}
      isMulti={isMulti}
      styles={styles}
    />
  );
};

export default SelectCustom;
