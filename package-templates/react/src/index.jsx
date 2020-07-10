import React from 'react';
import PropTypes from 'prop-types';
import { addNumbers, getImages } from './utils';

const { Fragment } = React;

const images = getImages();

const renderImage = ([sourcePath, Image], index) => (
  <Fragment key={index}>
    <dt>{sourcePath}</dt>
    <dd><Image /></dd>
  </Fragment>
);

const Index = ({ numberA = 0, numberB = 0 }) => (
  <div>
    <h1>MyComponent {addNumbers(numberA, numberB)}</h1>
    <dl>{images.map(renderImage)}</dl>
  </div>
);

Index.propTypes = {
  numberA: PropTypes.number,
  numberB: PropTypes.number,
};

export default Index;
