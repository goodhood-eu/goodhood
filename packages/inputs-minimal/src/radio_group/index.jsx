import PropTypes from 'prop-types';
import { Children } from 'react';
import Meta from '../textfields_meta';
import Radio from '../radio';
import styles from './index.module.scss';

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
  error,
  Layout = RadioGroupHorizontalLayout,
}) => {
  const handleChange = (event, val) => {
    onChange(event, val);
  };

  return (
    <div>
      <Layout>
        {items.map((item) => (
          <Radio
            key={item.value}
            name={name}
            label={item.label}
            value={item.value}
            onChange={handleChange}
            disabled={item.disabled}
            checked={value === item.value}
          />
        ))}
      </Layout>

      <Meta
        className={styles.meta}
        error={error}
      />
    </div>
  );
};

RadioGroup.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
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
