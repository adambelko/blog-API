import styled from "styled-components";
import { NavLink } from "react-router-dom";

const AdminDashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AdminDashboard = () => {
  return (
    <div>
      {localStorage.getItem("token") && (
        <AdminDashboardWrapper>
          <a href="/admin/new-post">new post</a>
        </AdminDashboardWrapper>
      )}
    </div>
  );
};

export default AdminDashboard;
