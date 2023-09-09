import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import DOMPurify from "dompurify";

const MyEditor = ({ setBody }) => {
  const editorRef = useRef(null);
  const REACT_APP_TINY_API_KEY = process.env.REACT_APP_TINY_API_KEY;

  const log = () => {
    if (editorRef.current) {
      const sanitizedBody = DOMPurify.sanitize(editorRef.current.getContent());
      setBody(sanitizedBody);
    }
  };

  return (
    <>
      <Editor
        apiKey={REACT_APP_TINY_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 700,
          menubar: true,
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
            "codesample",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help | code | codesample | fullscreen",

          codesample_languages: [
            { text: "HTML/XML", value: "markup" },
            { text: "JavaScript", value: "javascript" },
            { text: "CSS", value: "css" },
          ],

          content_style:
            "body { font-family: Albert Sans, Roboto, sans-serif; font-size:20px }",
        }}
      />
      <button type="button" onClick={log}>
        Log editor content
      </button>
    </>
  );
};

export default MyEditor;
