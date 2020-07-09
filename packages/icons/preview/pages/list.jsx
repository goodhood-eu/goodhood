import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import icons from '../icons';
import iconsList from '../icon_list';
import {
  importAliasForReactComponent,
  importStatementForImg,
  importStatementForReactComponent,
} from '../import_statements';

const StyledH3 = styled.h3`
  margin-top: 30px;
`;

const StyledList = styled.ul`
  padding-left: 0;
  list-style-type: none;
`;

const StyledInlineListItem = styled.li`
  margin-left: 5px;
  padding: 10px;
  display: inline;
`;

const StyledListItem = styled.li`
  margin-top: 15px;
  
  &:target {
    border-left: 5px solid #93a70a;
    padding-left: 15px;
    transition: all 0.5s ease-in;
  }
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

const StyledCode = styled.pre`
  user-select: all;
`;


export default ({ size }) => (
  <Layout>
    <h2>Icons in {size}:</h2>

    <StyledH3>At a glance:</StyledH3>
    <StyledList>
      {icons[size].map(({ default: url }, index) => {
        const name = iconsList[size][index];

        return (
          <StyledInlineListItem key={url}>
            <a href={`#${name}`}>
              <img src={url} alt={url} />
            </a>
          </StyledInlineListItem>
        );
      })}
    </StyledList>

    <StyledH3>Detailed:</StyledH3>
    <StyledList>
      {icons[size].map(({ default: url, ReactComponent: Icon }, index) => {
        const name = iconsList[size][index];
        return (
          <StyledListItem key={url} id={name}>
            <StyledH4>src/{size}/{name}</StyledH4>
            <StyledDl>
              <dt><pre>&lt;img /&gt;:</pre></dt>
              <dd><img src={url} alt={url} /></dd>

              <dt><pre>&lt;{importAliasForReactComponent(name)} /&gt;:</pre></dt>
              <dd><Icon /></dd>
              <StyledCode>{importStatementForReactComponent(size, name)}</StyledCode>
              <StyledCode>{importStatementForImg(size, name)}</StyledCode>
            </StyledDl>
          </StyledListItem>
        );
      })}
    </StyledList>
  </Layout>
);
