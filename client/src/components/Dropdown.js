import styled from "styled-components";
import React, { useEffect } from "react";
import axiosInstance from "../utils/Axios";
import { RiArrowDropDownLine } from "react-icons/ri";

const StyledDropdown = styled.ul`
  position: absolute;
  top: 1.6em;
  z-index: 1;
  border-radius: 7px;
  background-color: #ffffff;
  a {
    text-decoration: none;
  }
`;

const DropdownItem = styled.li`
  padding: 0.35em 0.6em;
  cursor: pointer;
  &:hover {
    background-color: #efefef;
  }
`;

const DropdownButton = styled(RiArrowDropDownLine)`
  cursor: pointer;
`;

const Dropdown = (props) => {
  const handlePublishPost = async (postId) => {
    try {
      await axiosInstance.post(`/admin/${postId}/change-post-publicity`);
      props.fetchPostList();
    } catch (error) {
      console.error("Error publishing post:", error);
    }
  };

  const handleRemovePost = async (postId) => {
    try {
      await axiosInstance.post(`/admin/${postId}/delete-post`);
      props.fetchPostList();
    } catch (error) {
      console.error("Error removing post:", error);
    }
  };

  const toggleDropdown = (index) => {
    const newOpenStates = [...props.openStates];

    // Close all open dropdowns
    newOpenStates.forEach((dropdown, index) => (newOpenStates[index] = false));

    // Toggle the clicked dropdown
    newOpenStates[index] = !newOpenStates[index];

    props.setOpenStates(newOpenStates);
  };

  const closeAllDropdowns = () => {
    props.setOpenStates(new Array(props.postList.length).fill(false));
  };

  useEffect(() => {
    document.body.addEventListener("click", closeAllDropdowns);
    return () => {
      document.body.removeEventListener("click", closeAllDropdowns);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <DropdownButton
        size="30px"
        onClick={(e) => {
          e.stopPropagation();
          toggleDropdown(props.index);
        }}
      />
      {props.openStates[props.index] && (
        <StyledDropdown>
          <props.StyledLink to={`/admin/${props.post._id}/edit-post`}>
            <DropdownItem>Edit</DropdownItem>
          </props.StyledLink>
          <DropdownItem onClick={() => handlePublishPost(props.post._id)}>
            {props.post.published ? "Unpublish" : "Publish"}
          </DropdownItem>
          <DropdownItem onClick={() => handleRemovePost(props.post._id)}>
            Remove
          </DropdownItem>
        </StyledDropdown>
      )}
    </React.Fragment>
  );
};

export default Dropdown;
