import styled from "styled-components";
import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const NewPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 2em;
  color: #000000;
  font-weight: bold;
  margin: 0.4em 0 1.2em 0;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
  label {
    margin-bottom: 0.5em;
  }
`;

const StyledInput = styled.input`
  width: 22em;
  font-size: 0.8em;
  padding: 0.2em;
  border-radius: 7px;
  margin-bottom: 0.5em;
`;

const StyledSubmitButton = styled.button`
  font-size: 0.9em;
  width: fit-content;
  padding: 0.2em 0.7em;
  border-radius: 7px;
  margin-bottom: 3em; ;
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
        <NewPostWrapper>
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
            <StyledSubmitButton type="submit">Create Post</StyledSubmitButton>
          </form>
        </NewPostWrapper>
      )}
    </>
  );
};

export default NewPost;
