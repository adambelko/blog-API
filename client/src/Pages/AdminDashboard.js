import styled from "styled-components";
import {
  Wrapper,
  Title,
  SectionTitle,
  StyledButton,
} from "../styles/CommonStyledComponents";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import PostList from "../components/PostList";
import axiosInstance from "../utils/Axios";

const StyledLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

const AdminDashboard = ({ formatDate }) => {
  const [postList, setPostList] = useState([]);
  const [openStates, setOpenStates] = useState([]);

  const dashboard = true;

  const fetchPostList = () => {
    axiosInstance
      .get("http://localhost:8000/")
      .then((res) => {
        setPostList(res.data.postList);
        setOpenStates(new Array(res.data.postList.length).fill(false));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPostList();
  }, []);

  return (
    <div>
      {localStorage.getItem("token") && (
        <Wrapper>
          <Title>Admin Dashboard</Title>
          <SectionTitle>New Post</SectionTitle>
          <StyledButton>
            <StyledLink to="/admin/new-post">New Post</StyledLink>
          </StyledButton>
          <SectionTitle>Manage Posts</SectionTitle>
          <PostList
            postList={postList}
            formatDate={formatDate}
            dashboard={dashboard}
            fetchPostList={fetchPostList}
            openStates={openStates}
            setOpenStates={setOpenStates}
          />
        </Wrapper>
      )}
    </div>
  );
};

export default AdminDashboard;
