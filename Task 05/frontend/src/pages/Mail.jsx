import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";

const Mail = () => {
  const editorRef = useRef(null);
  const [textValue, setTextValue] = useState("");
  const handleHTML = () => {
    if (editorRef.current) {
      setTextValue(editorRef.current.getContent());
    }
  };
  const handleMail = () => {
    handleHTML();
    alert(textValue);
  };
  return (
    // create a new mail composing box
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "950px",
        gap: 5,
        color: "#fff",
        textAlign: "left",
      }}
    >
      <label htmlFor="to">To</label>
      <input type="text" placeholder="To" id="to" />
      <label htmlFor="subject">Subject</label>
      <input type="text" placeholder="Subject" id="subject" />
      <label htmlFor="message">Message</label>
      <Editor
        apiKey="gt5lw2bn5uq5z59cbwh8yuh5l7avrf1tb7infx7217qw4w0d"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        init={{
          skin: "naked",
          height: 500,
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
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "emoticons",
            "hackcolor"
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic underline hackcolor forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "image link preview visualblocks | emoticons " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onChange={() => {
          handleHTML();
        }}
        initialValue=""
      />
      <button onClick={handleMail}>Send</button>
    </div>
  );
};

export default Mail;
