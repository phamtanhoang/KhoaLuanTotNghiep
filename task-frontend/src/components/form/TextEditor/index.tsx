import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { useRef } from "react";

interface EditorInterface {
  value?: string;
  placeholder?: string;
  onChange?: any;
}

const TextEditor: React.FC<EditorInterface> = ({
  value,
  placeholder,
  onChange,
}) => {
  const editorRef = useRef<any>(null);
  return (
    <>
      <Editor
        apiKey="0rzlxi2ly7dyfurhu9kcyk5gwq6t2z2iypfq0o16xnyzn6e0"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={value}
        init={{
          placeholder: placeholder,
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
              onChange(editor.getContent());
            });
          },
        }}
      />
    </>
  );
};

export default TextEditor;
