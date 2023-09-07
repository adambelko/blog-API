import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const StyledPostList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-bottom: 5em;
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

const PostList = ({ formatDate }) => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((res) => {
        setPostList(res.data.postList);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <StyledPostList>
      <Separator />
      {postList &&
        postList.map((post) => (
          <div key={post._id}>
            <li>
              <StyledLink to={`/${post.formattedTitle}`}>
                {post.title}
              </StyledLink>
              <StyledLink to={`/${post.formattedTitle}`}>
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
