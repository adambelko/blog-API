import styled from "styled-components";
import { useEffect } from "react";

import axiosInstance from "../utils/axios";

const AdminDashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AdminDashboard = () => {
  useEffect(() => {
    axiosInstance
      .get("admin/dashboard")
      .then(() => {
        console.log("Authenticated and authorized");
      })
      .catch((error) => {
        console.error("Not authenticated or authorized", error);
      });
  }, []);
  return <AdminDashboardWrapper>Test</AdminDashboardWrapper>;
};

export default AdminDashboard;
