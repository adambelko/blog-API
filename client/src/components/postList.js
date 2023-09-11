import styled from "styled-components";
import { Link } from "react-router-dom";

import Dropdown from "./Dropdown";

const StyledPostList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-bottom: 5em;
`;

const StyledList = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.8em 0em 0.8em 0;
  div {
    display: flex;
    align-items: center;
    position: relative;
  }
`;

const Separator = styled.hr`
  border-bottom: none;
  height: 1px;
`;

const StyledLink = styled(Link)`
  color: #1e2020;
  font-weight: ${(props) => (props.boldfont ? "bold" : "regular")};
`;

const StyledDate = styled.div`
  color: #707170;
  font-weight: 400;
  margin-left: 2em;
`;

const PostList = (props) => {
  return (
    <StyledPostList>
      <Separator />
      {props.postList &&
        props.postList.map((post, index) => (
          <div key={post._id}>
            <StyledList>
              <div>
                {localStorage.getItem("token") && props.dashboard && (
                  <Dropdown
                    StyledLink={StyledLink}
                    postList={props.postList}
                    post={post}
                    index={index}
                    fetchPostList={props.fetchPostList}
                    openStates={props.openStates}
                    setOpenStates={props.setOpenStates}
                  />
                )}
                <StyledLink to={`/${post.formattedTitle}`} boldfont="true">
                  {post.title}
                </StyledLink>
              </div>
              <StyledLink to={`/${post.formattedTitle}`}>
                <StyledDate>{props.formatDate(post.timestamp)}</StyledDate>
              </StyledLink>
            </StyledList>
            <Separator />
          </div>
        ))}
    </StyledPostList>
  );
};

export default PostList;
