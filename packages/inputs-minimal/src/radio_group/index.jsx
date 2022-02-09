import PropTypes from 'prop-types';
import clsx from 'clsx';
import Radio from '../radio';
import styles from './index.module.scss';

const RadioGroup = ({
  onChange,
  className,
  items,
  name,
  value,
  inputProps,
}) => {
  const handleChange = (event, val) => {
    onChange(event, val);
  };

  return (
    <div className={clsx(styles.root, className)}>
      {items.map((item) => (
        <Radio
          className={styles.item}
          key={item.value}
          onChange={handleChange}
          name={name}
          label={item.label}
          value={item.value}
          disabled={item.disabled}
          checked={value === item.value}
          {...inputProps}
        />
      ))}
    </div>
  );
};

RadioGroup.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any.isRequired,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
  className: PropTypes.string,
  inputProps: PropTypes.any,
};

export default RadioGroup;
