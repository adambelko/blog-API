import styled from "styled-components";
import Cookies from "js-cookie";
import {
  Wrapper,
  Title,
  StyledInput,
  StyledButton,
} from "../styles/CommonStyledComponents";
import { useState } from "react";
import { unprotectedAxios } from "../utils/Axios";

const FormSection = styled.div`
  display: flex;
  label {
    min-width: 6em;
  }
`;

const LoginStyledInput = styled(StyledInput)`
  font-size: 0.8em;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    unprotectedAxios
      .post("/login", {
        username,
        password,
      })
      .then((res) => {
        Cookies.set("access_token", res.data.token, { expires: 1 });
        window.location.href =
          "http://blog-api-production-0dd0.up.railway.app/admin/dashboard";
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Wrapper>
      <Title>Login</Title>
      <form onSubmit={handleSubmit}>
        <FormSection>
          <label htmlFor="username">Username</label>
          <LoginStyledInput
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormSection>
        <FormSection>
          <label htmlFor="password">Password</label>
          <LoginStyledInput
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormSection>
        <StyledButton type="submit">Log in</StyledButton>
      </form>
    </Wrapper>
  );
};

export default Login;
