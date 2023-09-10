import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { RiArrowDropDownLine } from "react-icons/ri";

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
  font-weight: bold;
`;

const StyledDate = styled.div`
  color: #707170;
  font-weight: 400;
  margin-left: 2em;
`;

const DropdownButton = styled(RiArrowDropDownLine)`
  cursor: pointer;
`;

const Dropdown = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  list-style: none;
  top: 1.6em;
  z-index: 1;
  border-radius: 7px;
  background-color: white;
`;

const DropdownItem = styled.li`
  padding: 0.35em 0.6em;
  cursor: pointer;
  &:hover {
    background-color: #efefef;
  }
`;

const PostList = ({ formatDate }) => {
  const [postList, setPostList] = useState([]);
  const [openStates, setOpenStates] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((res) => {
        setPostList(res.data.postList);
        // Initialize the open states array with false for each post
        setOpenStates(new Array(res.data.postList.length).fill(false));
      })
      .catch((err) => console.log(err));
  }, []);

  // Function to toggle the dropdown for a specific post
  const toggleDropdown = (index) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };

  console.log(openStates);

  return (
    <StyledPostList>
      <Separator />
      {postList &&
        postList.map((post, index) => (
          <div key={post._id}>
            <StyledList>
              <div>
                {openStates[index] && (
                  <Dropdown>
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem>Publish</DropdownItem>
                    <DropdownItem>Remove</DropdownItem>
                  </Dropdown>
                )}
                <DropdownButton
                  size="30px"
                  onClick={() => toggleDropdown(index)}
                />
                <StyledLink to={`/${post.formattedTitle}`}>
                  {post.title}
                </StyledLink>
              </div>
              <StyledLink to={`/${post.formattedTitle}`}>
                <StyledDate>{formatDate(post.timestamp)}</StyledDate>
              </StyledLink>
            </StyledList>
            <Separator />
          </div>
        ))}
    </StyledPostList>
  );
};

export default PostList;
