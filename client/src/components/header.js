import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import pepe from "../images/avatar.png";
import Cookies from "js-cookie";

const StyledHeader = styled.header`
  margin: auto;
  max-width: 885px;
  div {
    display: flex;
    margin: 3em 1.5em;
    justify-content: space-between;
  }
`;

const BlogNameWrapper = styled.h1`
  font-size: 1em;
  font-weight: 600;
  white-space: nowrap;
  margin-right: 1.5em;
  a {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  span {
    @media (max-width: 420px) {
      display: none;
    }
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
    Cookies.remove("access_token");
    navigate("/");
  };

  return (
    <StyledHeader>
      <div>
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
            {Cookies.get("access_token") && (
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
      </div>
    </StyledHeader>
  );
};

export default Header;
