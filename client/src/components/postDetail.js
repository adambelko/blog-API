import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostTitle = styled.h2`
  font-size: 2.6em;
  color: #000000;
  font-weight: bold;
  margin-top: 0.4em;
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
    <PostDetailWrapper>
      <PostTitle>{post.title}</PostTitle>
      <PublishedDate>Published {formatDate(post.timestamp)}</PublishedDate>
      <PostBody>{post.body}</PostBody>
    </PostDetailWrapper>
  );
};

export default PostDetail;
