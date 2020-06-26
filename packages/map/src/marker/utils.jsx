import { render, unmountComponentAtNode } from 'react-dom';
import { Popup } from 'mapbox-gl';


export const createPopup = (win, content, options) => {
  const element = win.document.createElement('div');
  render(content, element);

  const layer = new Popup(options).setDOMContent(element);

  return {
    layer,
    destroy() {
      unmountComponentAtNode(element);
      layer.remove();
    },
  };
};
