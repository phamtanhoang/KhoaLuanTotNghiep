import { ColorHelper } from "@/utils/helpers/colorHelper";
import { StylesConfig, ThemeConfig } from "react-select";

const customTheme: ThemeConfig = (theme) => ({
  ...theme,
  borderRadius: 3,
  colors: {
    ...theme.colors,
    primary: "#f2994a",
  },
});

const tagStyles: StylesConfig<any, boolean> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
  }),
  option: (styles, { data, isFocused }) => ({
    ...styles,
    backgroundColor: isFocused
      ? ColorHelper.convertHexToRgba(data.color, 0.1)
      : undefined,
    color: "black",
    cursor: "pointer",
  }),
  multiValue: (styles, { data }) => ({
    ...styles,
    backgroundColor: data.color,
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: "white",
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: "white",
    ":hover": {
      backgroundColor: ColorHelper.convertHexToRgba(data.color, 0.1),
      color: "black",
    },
  }),
};

export const ConfigSelect = {
  customTheme,
  tagStyles,
};
