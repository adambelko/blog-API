import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";

import Tags from "./tags";
import PostList from "./postList";

const IndexWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 3.2em;
`;

const SectionTitle = styled.h3`
  font-size: 1.2em;
  font-weight: 800;
  margin-bottom: 0.7em;
`;

const Index = ({ formatDate }) => {
  const [postList, setPostList] = useState([]);
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((res) => setPostList(res.data.postList))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/tags/")
      .then((res) => setTagList(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <IndexWrapper>
      <StyledSection>
        <SectionTitle>Hey</SectionTitle>
        <span>
          Welcome to my blog! Please take a seat and get ready for some lines of
          code and personal thoughts!
        </span>
      </StyledSection>

      <StyledSection>
        <SectionTitle>Explore by topic</SectionTitle>
        {tagList && <Tags tagList={tagList} />}
      </StyledSection>

      <StyledSection>
        <SectionTitle>Sorted by date</SectionTitle>
        {postList && <PostList postList={postList} formatDate={formatDate} />}
      </StyledSection>
    </IndexWrapper>
  );
};

export default Index;
