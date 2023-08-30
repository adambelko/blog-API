import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import styled from "styled-components";

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
  margin-bottom: 0.7em;
`;

const StyledPostList = styled.ul`
  display: flex;
  flex-direction: column;
  li {
    display: flex;
    justify-content: space-between;
    padding: 0.7em 0.7em 0.7em 0;
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
`;

const Index = () => {
  const [postList, setPostList] = useState([]);

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);

    const shortMonth = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${shortMonth} ${day} ${year}`;
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((res) => setPostList(res.data.postList))
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
        <SectionTitle>Sorted by date</SectionTitle>
        <StyledPostList>
          <Separator />
          {postList.map((post) => (
            <div>
              <li key={post._id}>
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
