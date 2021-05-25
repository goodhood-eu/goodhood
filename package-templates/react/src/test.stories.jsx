import { boolean, button, number, select, text } from '@root/.preview/src/modules/knobs';
import { useState } from 'react';

const Component = () => null;

export default { title: 'Preview Test', component: Component };

export const Default = () => {
  const numberValue = number('number', 3);
  const selectValue = select('selectValue', {
    OptionA: '123',
    OptionB: '666',
    None: null,
  }, '123');
  const textValue = text('textValue', 'bli bla blubb');
  const boolValue = boolean('boolValue', false);
  const [doSomething, setDoSomething] = useState(false);
  button('do something', () => {
    setDoSomething((v) => !v);
  });

  return (
    <article>
      <dl>
        <dt>number</dt>
        <dd>{numberValue}</dd>
        <dt>select</dt>
        <dd>{selectValue}</dd>
        <dt>text</dt>
        <dd>{textValue}</dd>
        <dt>bool</dt>
        <dd>{boolValue.toString()}</dd>
        <dt>doSomething</dt>
        <dd>{doSomething.toString()}</dd>
      </dl>
    </article>
  );
};
