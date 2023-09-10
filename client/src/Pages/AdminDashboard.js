import styled from "styled-components";
import {
  Wrapper,
  Title,
  SectionTitle,
  StyledButton,
} from "../styles/CommonStyledComponents";
import { Link } from "react-router-dom";

import PostList from "../components/PostList";
// import useProtectedRoute from "../hooks/useProtectedRoute";

const StyledLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

const AdminDashboard = ({ formatDate }) => {
  const managePosts = true;

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
          <PostList formatDate={formatDate} managePosts={managePosts} />
        </Wrapper>
      )}
    </div>
  );
};

export default AdminDashboard;
