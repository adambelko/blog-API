import styled from "styled-components";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Tag from "./Tag";
import Home from "../pages/Home";
import Story from "../pages/Story";
import Login from "../pages/Login";
import Search from "../pages/Search";
import PostForm from "../pages/PostForm";
import PostDetail from "../pages/PostDetail";
import AdminDashboard from "../pages/AdminDashboard";
import PageNotFound from "../pages/PageNotFound";
import Transition from "./Transition";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
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

  const location = useLocation();

  return (
    <StyledMain>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Transition>
                <Home formatDate={formatDate} />
              </Transition>
            }
          />
          <Route
            path="/story"
            element={
              <Transition>
                <Story />
              </Transition>
            }
          />
          <Route
            path="/search"
            element={
              <Transition>
                <Search formatDate={formatDate} />
              </Transition>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/:postTitle"
            element={
              <Transition>
                <PostDetail formatDate={formatDate} />
              </Transition>
            }
          />
          <Route
            path="/tags/:tag"
            element={
              <Transition>
                <Tag formatDate={formatDate} />
              </Transition>
            }
          />
          <Route
            path="*"
            element={
              <Transition>
                <PageNotFound />
              </Transition>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              <Transition>
                <AdminDashboard formatDate={formatDate} />
              </Transition>
            }
          />
          <Route
            path="/admin/new-post"
            element={
              <Transition>
                <PostForm />
              </Transition>
            }
          />
          <Route
            path="/admin/:postId/edit-post"
            element={
              <Transition>
                <PostForm />
              </Transition>
            }
          />
        </Routes>
      </AnimatePresence>
    </StyledMain>
  );
};

export default Main;
