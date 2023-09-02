import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledPostList = styled.ul`
  display: flex;
  flex-direction: column;
  li {
    display: flex;
    justify-content: space-between;
    padding: 0.8em 0em 0.8em 0;
  }
`;

const Separator = styled.hr`
  border-bottom: none;
  height: 1px;
`;

const StyledLink = styled(Link)`
  color: #1e2020;
  font-weight: bold;
`;

const StyledDate = styled.div`
  color: #707170;
  font-weight: 400;
  margin-left: 2em;
`;

const PostList = ({ postList, formatDate }) => {
  return (
    <StyledPostList>
      <Separator />
      {postList &&
        postList.map((post) => (
          <div key={post._id}>
            <li>
              <StyledLink to={post.formattedTitle}>{post.title}</StyledLink>
              <StyledLink to={post.formattedTitle}>
                <StyledDate>{formatDate(post.timestamp)}</StyledDate>
              </StyledLink>
            </li>
            <Separator />
          </div>
        ))}
    </StyledPostList>
  );
};

export default PostList;