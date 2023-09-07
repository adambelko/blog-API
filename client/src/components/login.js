import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 2em;
  color: #000000;
  font-weight: bold;
  margin: 0.4em 0 1.2em 0;
`;

const FormSection = styled.div`
  display: flex;
  label {
    min-width: 6em;
  }
`;

const StyledInput = styled.input`
  font-size: 0.8em;
  padding: 0.2em;
  border-radius: 7px;
  margin-bottom: 0.5em;
`;

const StyledButton = styled.button`
  font-size: 0.9em;
  width: fit-content;
  padding: 0.2em 0.7em;
  border-radius: 7px;
  margin-bottom: 3em;
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
    <LoginWrapper>
      <Title>Login</Title>
      <form onSubmit={handleSubmit}>
        <FormSection>
          <label htmlFor="username">Username</label>
          <StyledInput
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormSection>
        <FormSection>
          <label htmlFor="password">Password</label>
          <StyledInput
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormSection>
        <StyledButton type="submit">Log in</StyledButton>
      </form>
    </LoginWrapper>
  );
};

export default Login;
