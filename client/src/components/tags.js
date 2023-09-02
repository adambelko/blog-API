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
  cursor: pointer;
`;

const StyledLink = styled(Link)``;

const Tags = ({ tagList }) => {
  const { reguralTags, formattedTags } = tagList;
  return (
    <Wrapper>
      {reguralTags &&
        formattedTags &&
        reguralTags.map((tag, index) => (
          <StyledLink
            key={index}
            to={`tags/${formattedTags[index]}`}
            state={{ tag: tag }}
          >
            <StyledButton>{tag}</StyledButton>
          </StyledLink>
        ))}
    </Wrapper>
  );
};

export default Tags;
