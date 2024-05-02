import React from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./index.css";

interface EditorInterface {
  value?: string;
  onChange?: (event: any, editor: any) => void;
  disabled?: boolean;
  onReady?: (editor: any) => void;
  onBlur?: (event: any, editor: any) => void;
  onFocus?: (event: any, editor: any) => void;
}
const customToolbarConfig = {
  toolbar: {
    items: [
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "blockQuote",
    ],
  },
};

const TextEditor: React.FC<EditorInterface> = ({
  value,
  onChange,
  onReady,
  onBlur,
  onFocus,
  disabled,
}) => {
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        config={customToolbarConfig}
        data={value}
        onReady={onReady}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
      />
    </>
  );
};

export default TextEditor;
