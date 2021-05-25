import { useKnob } from '../../modules/knobs/hooks';

const ButtonControl = ({ id }) => {
  const { label, handler } = useKnob(id);

  return (
    <span className="ui-button" onClick={handler}>
      {label}
    </span>
  );
};

export default ButtonControl;
