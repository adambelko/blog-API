import styled from "styled-components";
import { Wrapper, Title, SectionTitle } from "../styles/CommonStyledComponents";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import Prism from "prismjs";
import "../styles/prism.css";
import CommentForm from "../components/CommentForm";
import PageNotFound from "./PageNotFound";

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

const CommentSection = styled(Wrapper)`
  margin-top: 5em;
`;

const CommentSectionHeader = styled.div`
  padding: 0.7em;
  background-color: #e2ded9;
  h3 {
    margin: 0;
  }
`;

const Comment = styled(Wrapper)`
  margin-top: 0.5em;
  padding: 0.4em 0.8em;
  background-color: #ede9e6;
`;

const CommentUsername = styled.div`
  font-weight: bold;
`;

const CommentBody = styled.div`
  font-size: 0.9rem;
`;

const PostDetail = ({ formatDate }) => {
  const [post, setPost] = useState(null);
  const { postTitle } = useParams();

  Prism.highlightAll();

  useEffect(() => {
    fetchPostData();
  }, [postTitle]);

  const fetchPostData = () => {
    axios
      .get(`http://localhost:8000/${postTitle}/`)
      .then((res) => {
        if (res.data.post && Object.keys(res.data.post).length > 0) {
          setPost(res.data.post);
        } else {
          setPost(null);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setPost(null);
        } else {
          console.log(err);
        }
      });
  };

  console.log(post);

  const estimateReadingTime = (text) => {
    const wordsPerMinute = 250;
    const wordCount = text.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

    return readingTimeMinutes;
  };

  const sanitizeCommentUrl = (comment) => {
    const userProvidedUrl = comment.website;

    if (!userProvidedUrl) return <div>{comment.username}</div>;

    // Regular expression to check if the URL starts with a valid protocol
    const validProtocol = /^(https?):\/\//i;
    if (validProtocol.test(userProvidedUrl)) {
      return (
        <a href={userProvidedUrl} target="_blank" rel="noopener noreferrer">
          {comment.username}
        </a>
      );
    } else {
      const formattedUrl = `http://${userProvidedUrl}`;
      return (
        <a href={formattedUrl} target="_blank" rel="noopener noreferrer">
          {comment.username}
        </a>
      );
    }
  };

  const sanitizedContent = post ? DOMPurify.sanitize(post.body) : "";
  const readingTime = post ? estimateReadingTime(sanitizedContent) : 0;

  console.log(post);

  return (
    <Wrapper>
      {post !== null ? (
        <>
          <StyledArticle>
            <PostTitle>{post.title}</PostTitle>
            <PostData>
              Posted on {formatDate(post.timestamp)} &#183; {readingTime} min
              read
            </PostData>
            <PostBody dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </StyledArticle>
          <CommentSection>
            <CommentSectionHeader>
              <SectionTitle>Discussion</SectionTitle>
            </CommentSectionHeader>
            {post.comments &&
              post.comments.map((comment) => (
                <Comment key={comment._id}>
                  <CommentUsername>
                    {sanitizeCommentUrl(comment)}
                  </CommentUsername>
                  <CommentBody>{comment.body}</CommentBody>
                </Comment>
              ))}
            <CommentForm postId={post._id} fetchPostData={fetchPostData} />
          </CommentSection>
        </>
      ) : (
        <PageNotFound />
      )}
    </Wrapper>
  );
};

export default PostDetail;
