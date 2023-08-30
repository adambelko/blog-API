import styled from "styled-components";
import pepe from "../images/avatar.png";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin: auto;
  margin-top: 3em;
  max-width: 685px;
  border: 1px solid black;
`;

const BlogNameWrapper = styled.h1`
  font-size: 1em;
  font-weight: 600;
  a {
    display: flex;
    align-items: center;
    gap: 0.3em;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  img {
    width: 35px;
  }
`;

const NavigationWrapper = styled.nav`
  display: flex;
  align-items: center;
  font-weight: bold;

  ul {
    display: flex;
    list-style: none;
    gap: 1.3em;
    a {
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <BlogNameWrapper>
        <a href="/">
          <img src={pepe} alt="img" />
          <span>Adam Belko</span>
        </a>
      </BlogNameWrapper>
      <NavigationWrapper>
        <ul>
          <a href="/story">
            <li>STORY</li>
          </a>
          <a href="https://github.com/adambelko">
            <li>GITHUB</li>
          </a>
        </ul>
      </NavigationWrapper>
    </StyledHeader>
  );
};

export default Header;
