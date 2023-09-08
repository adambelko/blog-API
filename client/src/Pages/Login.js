import styled from "styled-components";
import {
  Wrapper,
  Title,
  StyledInput,
  StyledButton,
} from "../styles/CommonStyledComponents";
import { useState } from "react";
import axios from "axios";

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

    axios
      .post("http://localhost:8000/login", {
        username,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        window.location.href = "http://localhost:3000/admin/dashboard";
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  return (
    <Wrapper>
      <Title>Login</Title>
      <form onSubmit={handleSubmit}>
        <FormSection>
          <label htmlFor="username">Username</label>
          <LoginStyledInput
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
