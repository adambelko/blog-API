import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

import Tag from "./Tag";
import Home from "../pages/Home";
import Story from "../pages/Story";
import Login from "../pages/Login";
import Search from "../pages/Search";
import NewPost from "../pages/NewPost";
import PostDetail from "../pages/PostDetail";
import AdminDashboard from "../pages/AdminDashboard";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 685px;
  margin: auto;
`;

const Main = () => {
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);

    const shortMonth = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${shortMonth} ${day} ${year}`;
  };

  return (
    <StyledMain>
      <Routes>
        <Route path="/" element={<Home formatDate={formatDate} />} />
        <Route path="/story" element={<Story />} />
        <Route path="/search" element={<Search formatDate={formatDate} />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/:postTitle"
          element={<PostDetail formatDate={formatDate} />}
        />
        <Route path="/tags/:tag" element={<Tag formatDate={formatDate} />} />

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard formatDate={formatDate} />}
        />
        <Route path="/admin/new-post" element={<NewPost />} />
      </Routes>
    </StyledMain>
  );
};

export default Main;
