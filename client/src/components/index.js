import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";

import Tags from "./tags";

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

const StyledPostList = styled.ul`
  display: flex;
  flex-direction: column;
  li {
    display: flex;
    justify-content: space-between;
    padding: 0.8em 0em 0.8em 0;
  }
`;

const Separator = styled.hr`
  border-bottom: none;
  height: 1px;
`;

const StyledLink = styled(Link)`
  color: #1e2020;
  font-weight: bold;
`;

const StyledDate = styled.div`
  color: #707170;
  font-weight: 400;
  margin-left: 2em;
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

  console.log(tagList);
  console.log(postList);
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
        <Tags tagList={tagList} />
      </StyledSection>

      <StyledSection>
        <SectionTitle>Sorted by date</SectionTitle>
        <StyledPostList>
          <Separator />
          {postList &&
            postList.map((post) => (
              <div key={post._id}>
                <li>
                  <StyledLink to={post.formattedTitle}>{post.title}</StyledLink>
                  <StyledLink to={post.formattedTitle}>
                    <StyledDate>{formatDate(post.timestamp)}</StyledDate>
                  </StyledLink>
                </li>
                <Separator />
              </div>
            ))}
        </StyledPostList>
      </StyledSection>
    </IndexWrapper>
  );
};

export default Index;
