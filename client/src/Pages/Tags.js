import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { unprotectedAxios } from "../utils/Axios";

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
    unprotectedAxios
      .get("/tags/")
      .then((res) => setTagList(res.data.tagList))
      .catch((err) => console.log(err));
  }, []);

  const formattedTag = (tag) => tag.replace(/\s+/g, "-").toLowerCase();

  return (
    <Wrapper>
      {tagList &&
        tagList.map((tag) => (
          <Link key={tag} to={`tags/${formattedTag(tag)}`} state={{ tag: tag }}>
            <StyledButton>{tag}</StyledButton>
          </Link>
        ))}
    </Wrapper>
  );
};

export default Tags;
