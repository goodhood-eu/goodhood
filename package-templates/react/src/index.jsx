import React from 'react';
import PropTypes from 'prop-types';
import { addNumbers, getPackageName, getRootPackageName } from './utils';
import styles from './index.module.scss';
import downloadIcon, { ReactComponent as DownloadIcon } from './images/Download_1.svg';

const Index = ({ numberA = 0, numberB = 0, onClick }) => (
  <>
    <pre>addNumbers({numberA}, {numberB}) = {addNumbers(numberA, numberB)}</pre>
    <pre>Root package: {getRootPackageName()}</pre>
    <pre className={styles.highlight}>package: {getPackageName()}</pre>
    <strong onClick={onClick}>click me</strong>

    <h2>SVGR</h2>
    <DownloadIcon className={styles.svgIcon} />
    <h2>url</h2>
    <img src={downloadIcon} alt="" />
  </>
);

Index.propTypes = {
  numberA: PropTypes.number,
  numberB: PropTypes.number,
  onClick: PropTypes.func,
};

export default Index;
