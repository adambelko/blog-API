import styled from "styled-components";
import { StyledInput, StyledButton } from "../styles/CommonStyledComponents";
import { useState } from "react";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2em 0;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  textarea {
    min-height: 10em;
    font-size: 0.8em;
    padding: 0.2em;
    border: 2px solid #212121;
    border-radius: 6px;
    margin-bottom: 1em;
  }
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5em;
  input {
    width: 100%;
  }
`;

const CommentForm = ({ postId, fetchPostData }) => {
  const [comment, setComment] = useState({
    username: "",
    email: "",
    website: "",
    body: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:8000/${postId}/new-comment`, comment);
      fetchPostData();
      setComment({
        username: "",
        email: "",
        website: "",
        body: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };

  return (
    <Wrapper>
      <StyledForm onSubmit={handleSubmit}>
        <UserInfo>
          <StyledInput
            type="text"
            name="username"
            value={comment.username}
            onChange={handleChange}
            placeholder="Name"
          />
          <StyledInput
            type="email"
            name="email"
            value={comment.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <StyledInput
            type="text"
            name="website"
            value={comment.website}
            onChange={handleChange}
            placeholder="Website"
          />
        </UserInfo>
        <textarea name="body" value={comment.body} onChange={handleChange} />
        <StyledButton type="submit">Post comment!</StyledButton>
      </StyledForm>
    </Wrapper>
  );
};

export default CommentForm;
