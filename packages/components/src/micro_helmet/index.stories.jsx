import { useEffect, useMemo, useState } from 'react';
import MicroHelmet from './index';
import MicroHelmetProvider from './provider';

const usePageTitle = () => {
  const [title, setTitle] = useState(typeof document !== 'undefined' && document.title);

  useEffect(() => {
    const mutated = (mutations) => { setTitle(mutations[0].target.innerText); };
    const observer = new MutationObserver(mutated);
    observer.observe(document.querySelector('title'), { childList: true, characterData: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return title;
};

export default { title: 'MicroHelmet', component: MicroHelmet, subcomponents: { MicroHelmetProvider } };

export const Default = () => {
  const [title, setTitle] = useState('');
  const currentPageTitle = usePageTitle();
  const helmetContext = useMemo(() => {}, []);

  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  let lastNode;
  if (title) {
    lastNode = <MicroHelmet title={title} />;
  }

  return (
    <MicroHelmetProvider context={helmetContext}>
      <p>Open canvas in new tab to see window title changes.</p>

      <pre>Page title: {currentPageTitle}</pre>
      <p>
        Try to change window title:
        <input className="ui-input" value={title} onChange={handleInputChange} />
      </p>

      <MicroHelmet title="Parent title" />
      <div>
        <MicroHelmet title="Children title" />
        {lastNode}
      </div>
    </MicroHelmetProvider>
  );
};
