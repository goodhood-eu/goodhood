import PropTypes from 'prop-types';
import Marker from '../marker';
import styles from './index.module.scss';


const CircleMarker = ({
  children,
  ...rest
}) => (
  <Marker {...rest}>
    <span className={styles.container}>
      <span className={styles.text}>{children}</span>
    </span>
  </Marker>
);

CircleMarker.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CircleMarker;
