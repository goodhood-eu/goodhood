import React from 'react';
import PropTypes from 'prop-types';
import { addNumbers, getPackageName, getRootPackageName } from './utils';
import styles from './index.module.scss';

const Index = ({ numberA = 0, numberB = 0 }) => (
  <>
    <pre>addNumbers({numberA}, {numberB}) = {addNumbers(numberA, numberB)}</pre>
    <pre>Root package: {getRootPackageName()}</pre>
    <pre className={styles.highlight}>package: {getPackageName()}</pre>
  </>
);

Index.propTypes = {
  numberA: PropTypes.number,
  numberB: PropTypes.number,
};

export default Index;
