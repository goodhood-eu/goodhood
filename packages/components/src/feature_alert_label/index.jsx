import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  TOOLTIP_POSITION_TOP,
  TOOLTIP_POSITION_BOTTOM,
  TOOLTIP_POSITION_LEFT,
  TOOLTIP_POSITION_RIGHT,
} from '../base_tooltip';
import styles from './index.module.scss';


const FeatureAlertLabel = ({ position, label, children, className, ...cleanProps }) => {
  const labelClassName = clsx(styles.label, styles[`is-position-${position}`], className);
  return (
    <aside {...cleanProps} className={labelClassName}>
      {children}
      <span className={`${styles.badge} ui-badge ui-badge-rect`}>{label}</span>
    </aside>
  );
};

FeatureAlertLabel.defaultProps = {
  position: TOOLTIP_POSITION_RIGHT,
};

FeatureAlertLabel.propTypes = {
  className: PropTypes.string,
  position: PropTypes.oneOf([
    TOOLTIP_POSITION_TOP,
    TOOLTIP_POSITION_BOTTOM,
    TOOLTIP_POSITION_LEFT,
    TOOLTIP_POSITION_RIGHT,
  ]),
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default FeatureAlertLabel;
