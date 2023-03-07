import PropTypes from 'prop-types';
import { Children } from 'react';
import Meta from '../textfields_meta';
import Radio from '../radio';
import styles from './index.module.scss';
import { pickDataAttributes } from '../utils';

export const RadioGroupHorizontalLayout = ({ meta, children }) => (
  <div>
    <div className={styles.horizontalLayout}>
      {Children.map(children, (child) => (
        <div className={styles.item}>{child}</div>
      ))}
    </div>
    {meta}
  </div>
);

export const RadioGroupVerticalLayout = ({ meta, children }) => (
  <div>
    <div className={styles.verticalLayout}>
      {Children.map(children, (child) => (
        <div className={styles.item}>{child}</div>
      ))}
    </div>
    {meta}
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
      <Layout
        meta={(
          <Meta
            className={styles.meta}
            error={error}
          />
        )}
      >
        {items.map((item) => (
          <Radio
            key={item.value}
            name={name}
            label={item.label}
            value={item.value}
            onChange={handleChange}
            disabled={item.disabled}
            checked={value === item.value}
            {...pickDataAttributes(item)}
          />
        ))}
      </Layout>
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
