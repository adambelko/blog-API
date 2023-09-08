import styled from "styled-components";
import { Wrapper, SectionTitle } from "../styles/CommonStyledComponents";

import Tags from "../components/Tags";
import PostList from "../components/PostList";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 3.2em;
`;

const Index = ({ formatDate }) => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default Index;
