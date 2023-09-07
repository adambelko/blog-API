import styled from "styled-components";

import useProtectedRoute from "../hooks/useProtectedRoute";

const AdminDashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AdminDashboard = () => {
  const isAuthorized = useProtectedRoute("admin/dashboard");

  return (
    <div>
      {isAuthorized && <AdminDashboardWrapper>Test</AdminDashboardWrapper>}
    </div>
  );
};

export default AdminDashboard;
