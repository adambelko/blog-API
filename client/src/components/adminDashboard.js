import styled from "styled-components";
import { Link } from "react-router-dom";

import PostList from "./postList";
// import useProtectedRoute from "../hooks/useProtectedRoute";

const AdminDashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 2em;
  color: #000000;
  font-weight: bold;
  margin: 0.4em 0 1.2em 0;
`;

const SubTitle = styled.h3`
  font-size: 1.2em;
  font-weight: 800;
  margin-bottom: 0.7em;
`;

const StyledButton = styled.button`
  font-size: 0.9em;
  width: fit-content;
  padding: 0.2em 0.7em;
  border-radius: 7px;
  margin-bottom: 3em; ;
`;

const StyledLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

const AdminDashboard = ({ formatDate }) => {
  return (
    <div>
      {localStorage.getItem("token") && (
        <AdminDashboardWrapper>
          <Title>Admin Dashboard</Title>
          <SubTitle>New Post</SubTitle>
          <StyledButton>
            <StyledLink to="/admin/new-post">New Post</StyledLink>
          </StyledButton>
          <SubTitle>Manage Posts</SubTitle>
          <PostList formatDate={formatDate} />
        </AdminDashboardWrapper>
      )}
    </div>
  );
};

export default AdminDashboard;
