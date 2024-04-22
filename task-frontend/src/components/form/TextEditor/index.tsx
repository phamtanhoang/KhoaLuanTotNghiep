import React from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./index.css";

interface EditorInterface {
  value?: string;
  onChange?: (event: any, editor: any) => void;
  onReady?: (editor: any) => void;
  onBlur?: (event: any, editor: any) => void;
  onFocus?: (event: any, editor: any) => void;
}

const TextEditor: React.FC<EditorInterface> = ({
  value,
  onChange,
  onReady,
  onBlur,
  onFocus,
}) => {
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onReady={onReady}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </>
  );
};

export default TextEditor;
