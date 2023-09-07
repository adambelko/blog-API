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
        <Tags />
      </StyledSection>

      <StyledSection>
        <SectionTitle>Sorted by date</SectionTitle>
        <PostList formatDate={formatDate} />
      </StyledSection>
    </IndexWrapper>
  );
};

export default Index;
