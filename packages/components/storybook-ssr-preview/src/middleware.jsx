import React from 'react';
import { renderToString } from 'react-dom/server';

const renderContent = () => {
  const Component = (
    <h1>I am SSR React</h1>
  );

  return renderToString(Component);
};

export default () => {
  return renderContent();
};
