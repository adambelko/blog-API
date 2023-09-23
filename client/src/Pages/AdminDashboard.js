import styled from "styled-components";
import Cookies from "js-cookie";
import {
  Wrapper,
  Title,
  SectionTitle,
  StyledButton,
} from "../styles/CommonStyledComponents";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import PostList from "../components/PostList";
import { protectedAxios } from "../utils/Axios";
import PageNotFound from "./PageNotFound";

const StyledLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

const AdminDashboard = ({ formatDate }) => {
  const [postList, setPostList] = useState([]);
  const [openStates, setOpenStates] = useState([]);

  const fetchPostList = () => {
    protectedAxios
      .get("/")
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
      {Cookies.get("access_token") ? (
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
            fetchPostList={fetchPostList}
            openStates={openStates}
            setOpenStates={setOpenStates}
          />
        </Wrapper>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
};

export default AdminDashboard;
