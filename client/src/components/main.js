import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

import Tag from "./Tag";
import Home from "../Pages/Home";
import Story from "../Pages/Story";
import Login from "../Pages/Login";
import Search from "../Pages/Search";
import NewPost from "../Pages/NewPost";
import PostDetail from "../Pages/PostDetail";
import AdminDashboard from "../Pages/AdminDashboard";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
