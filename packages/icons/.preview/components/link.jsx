import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: #777;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default StyledLink;
