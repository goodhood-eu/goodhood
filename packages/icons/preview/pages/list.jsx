import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import icons from '../icons';
import iconsList from '../icon_list';

const StyledH3 = styled.h3`
  margin-top: 30px;
`;

const StyledList = styled.ul`
  padding-left: 0;
  list-style-type: none;
`;

const StyledInlineListItem = styled.li`
  margin-left: 5px;
  display: inline;
`;

const StyledListItem = styled.li`
  margin-top: 15px;
`;

const StyledH4 = styled.h4`
  margin-bottom: 0;
`;

const StyledDl = styled.dl`
  margin: 5px 0 0;
  display: flex;
  flex-wrap: wrap;
  > dt,
  > dd {
    padding: 3px 0;
  }

  > dt {
    width: 230px;
  }
  > dd {
    width: calc(100% - 230px);
    margin-left: auto;
  }

  pre {
    margin: 0;
  }
`;

export default ({ size }) => (
  <Layout>
    <h2>Icons in {size}:</h2>

    <StyledH3>At a glance:</StyledH3>
    <StyledList>
      {icons[size].map(({ default: url }) => (
        <StyledInlineListItem key={url}>
          <img src={url} alt={url} />
        </StyledInlineListItem>
      ))}
    </StyledList>

    <StyledH3>Detailed:</StyledH3>
    <StyledList>
      {icons[size].map(({ default: url, ReactComponent: Icon }, index) => {
        const name = iconsList[size][index];
        return (
          <StyledListItem key={url}>
            <StyledH4>{size}/{name}</StyledH4>
            <StyledDl>
              <dt><pre>&lt;img /&gt;:</pre></dt>
              <dd><img src={url} alt={url} /></dd>

              <dt><pre>&lt;ReactComponent /&gt;:</pre></dt>
              <dd><Icon /></dd>
            </StyledDl>
          </StyledListItem>
        );
      })}
    </StyledList>
  </Layout>
);
