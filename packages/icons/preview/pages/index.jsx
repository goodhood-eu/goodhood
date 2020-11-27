import styled from 'styled-components';
import Layout from '../components/layout';
import Link from '../components/link';
import icons from '../icons';

const StyledList = styled.ul`
  padding-left: 0;
  list-style-type: none;
`;

const StyledListItem = styled.li`
  margin-top: 5px;
`;

export default () => (
  <Layout>
    <h2>Sizing options:</h2>
    <StyledList>
      {Object.keys(icons).map((size) => (
        <StyledListItem key={size}>
          <Link to={`/${size}`}>{size}</Link>
        </StyledListItem>
      ))}
    </StyledList>
  </Layout>
);
