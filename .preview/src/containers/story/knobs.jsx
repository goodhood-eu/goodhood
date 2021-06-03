import clsx from 'clsx';
import { useKnobsContext } from '../../modules/knobs';
import KnobControl from '../../components/knob_control';
import styles from './knobs.module.scss';

const Knobs = ({ className }) => {
  const { knobs, entities } = useKnobsContext();

  const renderKnob = (id) => {
    const { type } = entities.knobs[id];

    return (
      <li key={id} className={styles.knob}>
        <KnobControl id={id} type={type} />
      </li>
    );
  };

  return (
    <article className={clsx(className, styles.root)}>
      <ul>{knobs.map(renderKnob)}</ul>
    </article>
  );
};

export default Knobs;
