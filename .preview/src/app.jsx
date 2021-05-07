import { useState } from 'react';

const App = () => {
  const [yes, setYes] = useState(false);

  const handleClick = () => setYes((bool) => !bool);

  return (
    <button type="button" onClick={handleClick}>
      {yes ? 'yes' : 'no'}
    </button>
  );
};

export default App;
