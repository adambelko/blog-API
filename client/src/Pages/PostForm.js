import styled from "styled-components";
import {
  Wrapper,
  Title,
  StyledInput,
  StyledButton,
} from "../styles/CommonStyledComponents";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

import MyEditor from "../components/Editor";
import { protectedAxios } from "../utils/Axios";
import PageNotFound from "./PageNotFound";

const FormSection = styled(Wrapper)`
  margin-bottom: 1em;
  label {
    margin-bottom: 0.5em;
  }
`;

const NewPost = () => {
  const [mode, setMode] = useState("create");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // If postId exists in URL params, we are in edit mode
    if (postId) {
      setMode("edit");

      protectedAxios
        .get(`/admin/${postId}/edit-post`)
        .then((res) => {
          const { title, body, tags } = res.data.currentPost;
          setTitle(title);
          setBody(body);
          setTags(tags.join(", "));
        })
        .catch((error) => {
          console.error("Error fetching post data for editing:", error);
        });
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (body === "") return;

    const postData = {
      title: title,
      body: body,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    try {
      if (mode === "create") {
        const response = await protectedAxios.post("/admin/new-post", postData);

        if (response.status === 200) navigate("/admin/dashboard");
      } else if (mode === "edit") {
        await protectedAxios.post(`/admin/${postId}/edit-post`, postData);
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error(
        `Error ${mode === "create" ? "creating" : "editing"} a post:`,
        error
      );
    }
  };

  return (
    <>
      {Cookies.get("access_token") ? (
        <Wrapper>
          <Title>{mode === "create" ? "New Post" : "Edit Post"}</Title>
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
              <MyEditor setBody={setBody} initialContent={body} />
            </FormSection>
            <StyledButton type="submit">
              {mode === "create" ? "Create Post" : "Save Changes"}
            </StyledButton>
          </form>
        </Wrapper>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default NewPost;
