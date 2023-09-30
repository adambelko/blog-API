import styled from "styled-components";
import { Wrapper, SectionTitle } from "../styles/CommonStyledComponents";
import { useState, useEffect } from "react";

import { unprotectedAxios } from "../utils/Axios";
import Tags from "../pages/Tags";
import PostList from "../components/PostList";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 3.2em;
`;

const Index = ({ formatDate }) => {
  const [postList, setPostList] = useState();

  useEffect(() => {
    unprotectedAxios
      .get("/blog")
      .then((res) => {
        setPostList(res.data.postList);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Wrapper>
      <StyledSection>
        <SectionTitle>Hey</SectionTitle>
        <span>
          Thank you for coming and welcome to my blog! Feel free to look around
          or take a seat and read an article or two.
        </span>
      </StyledSection>

      <StyledSection>
        <SectionTitle>Explore by topic</SectionTitle>
        <Tags />
      </StyledSection>

      <StyledSection>
        <SectionTitle>Sorted by date</SectionTitle>
        <PostList
          onlyPublished={true}
          postList={postList}
          formatDate={formatDate}
        />
      </StyledSection>
    </Wrapper>
  );
};

export default Index;
