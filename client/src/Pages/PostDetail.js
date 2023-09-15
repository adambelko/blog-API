import styled from "styled-components";
import { Title } from "../styles/CommonStyledComponents";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import Prism from "prismjs";
import "../styles/prism.css";

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
`;

const PostTitle = styled(Title)`
  font-size: 2.6em;
  margin: 0.4em 0 0 0;
  line-height: 1em;
`;

const PostData = styled.div`
  margin: auto;
  margin-top: 0.5em;
  color: #707170;
  font-size: 0.9em;
  font-weight: 500;
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

  const estimateReadingTime = (text) => {
    const wordsPerMinute = 250;
    const wordCount = text.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

    return readingTimeMinutes;
  };

  const sanitizedContent = DOMPurify.sanitize(post.body);
  const readingTime = estimateReadingTime(sanitizedContent);

  return (
    <StyledArticle>
      <PostTitle>{post.title}</PostTitle>
      <PostData>
        Posted on {formatDate(post.timestamp)} &#183; {readingTime} min read
      </PostData>
      <PostBody dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </StyledArticle>
  );
};

export default PostDetail;
