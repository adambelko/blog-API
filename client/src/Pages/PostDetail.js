import styled from "styled-components";
import { Wrapper, Title } from "../styles/CommonStyledComponents";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostTitle = styled(Title)`
  font-size: 2.6em;
  margin: 0.4em 0 0 0;
`;

const PublishedDate = styled.div`
  margin: auto;
  margin-top: 0.5em;
  color: #707170;
  font-weight: bold;
`;

const PostBody = styled.div`
  display: flex;
  margin-top: 3em;
`;

const PostDetail = ({ formatDate }) => {
  const [post, setPost] = useState({});
  const { postTitle } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/${postTitle}/`)
      .then((res) => setPost(res.data.post))
      .catch((err) => console.log(err));
  }, [postTitle]);

  return (
    <Wrapper>
      <PostTitle>{post.title}</PostTitle>
      <PublishedDate>Published {formatDate(post.timestamp)}</PublishedDate>
      <PostBody>{post.body}</PostBody>
    </Wrapper>
  );
};

export default PostDetail;
