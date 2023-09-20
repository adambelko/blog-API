import styled from "styled-components";
import { Wrapper, Title } from "../styles/CommonStyledComponents";

const PageWrapper = styled(Wrapper)`
  margin: 0 auto;
`;

const PageNotFound = () => {
  return (
    <PageWrapper>
      <Title>Page not found</Title>
    </PageWrapper>
  );
};

export default PageNotFound;
