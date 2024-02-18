import React from "react";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface EditorInterface {
  label?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  onChange?: any;
}

const TextEditorCustom: React.FC<EditorInterface> = (props) => {
  const editorRef = useRef<any>(null);

  return (
    <>
      {props.label && (
        <label className="block mb-1 font-medium text-gray-900">
          {props.label}{" "}
          {props.required && <span className="text-red-500 font-bold">*</span>}
        </label>
      )}

      <Editor
        apiKey="0rzlxi2ly7dyfurhu9kcyk5gwq6t2z2iypfq0o16xnyzn6e0"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={props.value}
        init={{
          placeholder: props.placeholder,
          language: "vi",
          menubar: false,
          entity_encoding: "raw",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "wordcount",
          ],
          toolbar_mode: "wrap",
          toolbar:
            "undo redo | fontfamily | fontsize | table | language | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat",
          content_style:
            "body { font-family:Times New Roman,Arial,sans-serif;font-size: 12pt }",

          setup: (editor) => {
            editor.on("keyup", () => {
              props.onChange(editor.getContent());
            });
          },
        }}
      />

      {props.error && (
        <p className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 italic">
          {props.error}!
        </p>
      )}
    </>
  );
};

export default TextEditorCustom;
