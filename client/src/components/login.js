import styled from "styled-components";

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
  margin-bottom: 3em; ;
`;

const Login = () => {
  return (
    <LoginWrapper>
      <Title>Login</Title>
      <form action="http://localhost:8000/login" method="POST">
        <FormSection>
          <label htmlFor="username">Username</label>
          <StyledInput name="username" type="text" />
        </FormSection>
        <FormSection>
          <label htmlFor="password">Password</label>
          <StyledInput name="password" type="password" />
        </FormSection>
        <StyledButton type="submit">Log in</StyledButton>
      </form>
    </LoginWrapper>
  );
};

export default Login;
