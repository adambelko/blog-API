import styled from "styled-components";
import {
  Title,
  StyledInput,
  SectionTitle,
  StyledButton,
} from "../styles/CommonStyledComponents";
import { useState } from "react";
import React from "react";
import axios from "axios";

import PostList from "../components/PostList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3em;
  form {
    display: flex;
    flex-direction: column;
  }
`;

const StyledSearchInput = styled(StyledInput)`
  font-size: 1em;
`;

const Search = ({ formatDate }) => {
  const [query, setQuery] = useState("");
  const [postList, setPostList] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      setPostList([]);
      setNoResults(true);
      return;
    }

    axios
      .get(`http://localhost:8000/search?query=${query}`)
      .then((res) => {
        setPostList(res.data.results);
        setNoResults(res.data.results.length === 0);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Wrapper>
      <Title>Search</Title>
      <form onSubmit={handleSubmit}>
        <StyledSearchInput
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <StyledButton type="submit">Submit</StyledButton>
      </form>
      <React.Fragment>
        {postList.length > 0 ? (
          <React.Fragment>
            <SectionTitle>Search results</SectionTitle>
            <PostList
              postList={postList}
              onlyPublished={true}
              formatDate={formatDate}
            />
          </React.Fragment>
        ) : (
          noResults && <SectionTitle>No results found</SectionTitle>
        )}
      </React.Fragment>
    </Wrapper>
  );
};

export default Search;
