import styled from "styled-components";
import {
  Wrapper,
  Title,
  StyledInput,
  StyledButton,
} from "../styles/CommonStyledComponents";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import MyEditor from "../components/Editor";

const FormSection = styled(Wrapper)`
  margin-bottom: 1em;
  label {
    margin-bottom: 0.5em;
  }
`;

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (body === "") return;

    const postData = {
      title: title,
      body: body,
      tags: tags.split(",").map((tag) => tag.trim()),
      published: false,
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
              <MyEditor setBody={setBody} />
            </FormSection>
            <StyledButton type="submit">Create Post</StyledButton>
          </form>
        </Wrapper>
      )}
    </>
  );
};

export default NewPost;
