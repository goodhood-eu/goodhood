import PropTypes from 'prop-types';
import Radio from '../radio';
import styles from './index.module.scss';
import { Children } from 'react';

export const RadioGroupHorizontalLayout = ({ children }) => (
  <div className={styles.horizontalLayout}>
    {Children.map(children, (child) => (
      <div className={styles.item}>{child}</div>
    ))}
  </div>
);

export const RadioGroupVerticalLayout = ({ children }) => (
  <div className={styles.verticalLayout}>
    {Children.map(children, (child) => (
      <div className={styles.item}>{child}</div>
    ))}
  </div>
);

const RadioGroup = ({
  onChange,
  items,
  name,
  value,
  Layout = RadioGroupHorizontalLayout,
}) => {
  const handleChange = (event, val) => {
    onChange(event, val);
  };

  return (
    <Layout>
      {items.map((item) => (
        <Radio
          key={item.value}
          onChange={handleChange}
          name={name}
          label={item.label}
          value={item.value}
          disabled={item.disabled}
          checked={value === item.value}
        />
      ))}
    </Layout>
  );
};

RadioGroup.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  Layout: PropTypes.node,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any.isRequired,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
};

export default RadioGroup;
