import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  flex-wrap: wrap;
  display: flex;
  gap: 0.3em;
`;

const StyledButton = styled.button`
  background-color: #000000;
  color: #ffffff;
  font-size: 1em;
  padding: 0.5em;
  border: none;
  border-radius: 3px;
`;

const Tags = () => {
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/tags/")
      .then((res) => setTagList(res.data))
      .catch((err) => console.log(err));
  }, []);

  const { reguralTags, formattedTags } = tagList;
  return (
    <Wrapper>
      {reguralTags &&
        formattedTags &&
        reguralTags.map((tag, index) => (
          <Link
            key={index}
            to={`tags/${formattedTags[index]}`}
            state={{ tag: tag }}
          >
            <StyledButton>{tag}</StyledButton>
          </Link>
        ))}
    </Wrapper>
  );
};

export default Tags;
