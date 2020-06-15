import React, { useRef, useState } from 'react';
import MicroHelmet from './index';
import Provider from "./provider";

export default { title: 'MicroHelmet', component: MicroHelmet };

const helmetContext = {};

export const Default = () => {
  const [title, setTitle] = useState(null);

  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  let lastNode;
  if (title) {
    lastNode = <MicroHelmet title={title} />;
  }

  return (
    <Provider context={helmetContext}>
      <p>Open canvas in new tab to see window title changes.</p>

      <p>
        Try to change window title:
        <input className="ui-input" value={title} onChange={handleInputChange} />
      </p>

      <MicroHelmet title="Parent title" />
      <div>
        <MicroHelmet title="Children title" />
        {lastNode}
      </div>
    </Provider>
  );
}
