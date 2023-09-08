import styled from "styled-components";
import {
  Wrapper,
  Title,
  StyledInput,
  StyledButton,
} from "../styles/CommonStyledComponents";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

const FormSection = styled(Wrapper)`
  margin-bottom: 1em;
  label {
    margin-bottom: 0.5em;
  }
`;

const StyledEditor = styled(Editor)`
  border: 1px solid #ccc;
  padding: 10px;
  width: 100%;
  min-height: 300px;
`;

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("sad");
  const [tags, setTags] = useState("");

  const navigate = useNavigate();

  const REACT_APP_TINY_API_KEY = process.env.REACT_APP_TINY_API_KEY;

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      setBody(editorRef.current.getContent());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title: title,
      body: body,
      tags: tags.split(",").map((tag) => tag.trim()),
      published: true,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/admin/new-post",
        postData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Error creating a new post", error);
    }
  };

  return (
    <>
      {localStorage.getItem("token") && (
        <Wrapper>
          <Title>New Post</Title>
          <form onSubmit={handleSubmit}>
            <FormSection>
              <label htmlFor="title">Title:</label>
              <StyledInput
                id="title"
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </FormSection>
            <FormSection>
              <label htmlFor="tags">Tags:</label>
              <StyledInput
                id="tags"
                type="text"
                name="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                required
              />
            </FormSection>
            <FormSection>
              <label htmlFor="body">Content:</label>
              <StyledEditor
                apiKey={REACT_APP_TINY_API_KEY}
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                  height: 500,
                  menubar: false,
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
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
              <button onClick={log}>Log editor content</button>
            </FormSection>
            <StyledButton type="submit">Create Post</StyledButton>
          </form>
        </Wrapper>
      )}
    </>
  );
};

export default NewPost;
