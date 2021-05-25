import { useKnobsContext } from '../../modules/knobs';
import KnobControl from '../../components/knob_control';

const Knobs = ({ className }) => {
  const { knobs, entities } = useKnobsContext();

  const renderKnob = (id) => {
    const { type } = entities.knobs[id];

    return (
      <li key={id}>
        <KnobControl id={id} type={type} />
      </li>
    );
  };

  return (
    <article className={className}>
      <ul>{knobs.map(renderKnob)}</ul>
    </article>
  );
};

export default Knobs;
