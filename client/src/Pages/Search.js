import styled from "styled-components";
import { useState } from "react";
import React from "react";
import axios from "axios";

import PostList from "../components/PostList";

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3em;
  form {
    display: flex;
    flex-direction: column;
  }
`;

const Title = styled.h2`
  font-size: 2em;
  color: #000000;
  font-weight: bold;
  margin: 0.4em 0 1.2em 0;
`;

const StyledInput = styled.input`
  font-size: 1em;
  padding: 0.2em;
  border-radius: 7px;
  margin-bottom: 0.5em;
`;

const SubTitle = styled.h3`
  font-size: 1.2em;
  font-weight: 800;
  margin-bottom: 0.7em;
`;

const StyledSubmitButton = styled.button`
  font-size: 0.9em;
  width: fit-content;
  padding: 0.2em 0.7em;
  border-radius: 7px;
  margin-bottom: 3em; ;
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
    <SearchWrapper>
      <Title>Search</Title>
      <form onSubmit={handleSubmit}>
        <StyledInput
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <StyledSubmitButton type="submit">Submit</StyledSubmitButton>
      </form>
      <React.Fragment>
        {postList.length > 0 ? (
          <React.Fragment>
            <SubTitle>Search results</SubTitle>
            <PostList postList={postList} formatDate={formatDate} />
          </React.Fragment>
        ) : (
          noResults && <SubTitle>No results found</SubTitle>
        )}
      </React.Fragment>
    </SearchWrapper>
  );
};

export default Search;
