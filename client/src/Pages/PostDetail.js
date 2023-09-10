import styled from "styled-components";
import { Wrapper, Title } from "../styles/CommonStyledComponents";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import Prism from "prismjs";
import "../styles/prism.css";

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
  margin-top: 3em;
  pre {
    font-size: 16px;
  }
`;

const PostDetail = ({ formatDate }) => {
  const [post, setPost] = useState({});
  const { postTitle } = useParams();
  Prism.highlightAll();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/${postTitle}/`)
      .then((res) => setPost(res.data.post))
      .catch((err) => console.log(err));
  }, [postTitle]);

  const sanitizedContent = DOMPurify.sanitize(post.body);

  return (
    <Wrapper>
      <PostTitle>{post.title}</PostTitle>
      <PublishedDate>Posted on {formatDate(post.timestamp)}</PublishedDate>
      <PostBody dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </Wrapper>
  );
};

export default PostDetail;
