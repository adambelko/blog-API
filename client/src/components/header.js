import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import pepe from "../images/avatar.png";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin: auto;
  margin-top: 3em;
  max-width: 885px;
  margin-bottom: 3em;
`;

const BlogNameWrapper = styled.h1`
  font-size: 1em;
  font-weight: 600;
  a {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  img {
    width: 35px;
  }
`;

const NavigationWrapper = styled.nav`
  display: flex;
  align-items: center;
  font-weight: 800;

  ul {
    display: flex;
    gap: 1.3em;
  }
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const logout = (e) => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <StyledHeader>
      <BlogNameWrapper>
        <StyledLink to="/">
          <img src={pepe} alt="img" />
          <span>Adam Belko</span>
        </StyledLink>
      </BlogNameWrapper>
      <NavigationWrapper>
        <ul>
          <StyledLink to="/story">
            <li>STORY</li>
          </StyledLink>
          <StyledLink to="/search">
            <li>SEARCH</li>
          </StyledLink>
          {localStorage.getItem("token") && (
            <React.Fragment>
              <StyledLink to="/admin/dashboard">
                <li>DASHBOARD</li>
              </StyledLink>
              <StyledLink onClick={logout} to="/">
                <li>LOGOUT</li>
              </StyledLink>
            </React.Fragment>
          )}
        </ul>
      </NavigationWrapper>
    </StyledHeader>
  );
};

export default Header;
