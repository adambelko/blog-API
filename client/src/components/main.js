import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Index from "./index";
import Story from "./story";
import PostDetail from "./postDetail";

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
        <Route path="/" element={<Index formatDate={formatDate} />} />
        <Route path="/story" element={<Story />} />
        <Route
          path="/:postTitle"
          element={<PostDetail formatDate={formatDate} />}
        />
      </Routes>
    </StyledMain>
  );
};

export default Main;
