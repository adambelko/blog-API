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
  return (
    <StyledMain>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/story" element={<Story />} />
        <Route path="/:postTitle" element={<PostDetail />} />
      </Routes>
    </StyledMain>
  );
};

export default Main;
