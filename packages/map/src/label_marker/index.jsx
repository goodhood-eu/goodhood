import PropTypes from 'prop-types';
import Marker from '../marker';
import styles from './index.module.scss';


const LabelMarker = ({
  children,
  ...rest
}) => (
  <Marker {...rest}>
    <span className={styles.container}>{children}</span>
  </Marker>
);

LabelMarker.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LabelMarker;
