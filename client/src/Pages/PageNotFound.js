import styled from "styled-components";
import { Wrapper, Title } from "../styles/CommonStyledComponents";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PageWrapper = styled(Wrapper)`
  margin: 0 auto;
`;

const PageNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  });

  return (
    <PageWrapper>
      <Title>Page not found</Title>
    </PageWrapper>
  );
};

export default PageNotFound;
