import React from 'react';
import styled from 'styled-components';
import Link from './link';

const StyledTitle = styled.h1`
  color: #777;
`;

const StyledSection = styled.section`
  max-width: 960px;
  margin: 0 auto;
  padding: 10px;
`;

export default ({ children }) => (
  <StyledSection>
    <StyledTitle>
      <Link to="/">GoodHood Icon pack</Link>
    </StyledTitle>
    {children}
  </StyledSection>
);
