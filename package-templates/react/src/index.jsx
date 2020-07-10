import React from 'react';
import PropTypes from 'prop-types';
import { addNumbers } from './utils';

const Index = ({ numberA = 0, numberB = 0 }) => (
  <h1>MyComponent {addNumbers(numberA, numberB)}</h1>
);

Index.propTypes = {
  numberA: PropTypes.number,
  numberB: PropTypes.number,
};

export default Index;
