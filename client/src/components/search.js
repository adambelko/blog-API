import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

import PostList from "./postList";

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3em;
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
  margin-bottom: 3em;
`;

const SubTitle = styled.h3`
  font-size: 1.2em;
  font-weight: 800;
  margin-bottom: 0.7em;
`;

const Search = ({ formatDate }) => {
  const [query, setQuery] = useState("");
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/search?query=${query}`)
      .then((res) => setPostList(res.data.results))
      .catch((err) => console.log(err));
  }, [query]);

  return (
    <SearchWrapper>
      <Title>Search</Title>
      <StyledInput
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query.length >= 2 && query !== "" && (
        <div>
          <SubTitle>Search results</SubTitle>
          <PostList postList={postList} formatDate={formatDate} />
        </div>
      )}
    </SearchWrapper>
  );
};

export default Search;
