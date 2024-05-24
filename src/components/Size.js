import React, { useContext } from 'react';
import { EnlargeShrinkContext } from '../index'; 

const ButtonComponent = () => {
  const { scale, enlargeApp, shrinkApp } = useContext(EnlargeShrinkContext);

  return (
    <div>
      <button
        style={{ transform: `scale(${scale})` }}
        onClick={enlargeApp}
      >
        Enlarge
      </button>
      <button
        style={{ transform: `scale(${scale})` }}
        onClick={shrinkApp}
      >
        Shrink
      </button>
    </div>
  );
};

export default ButtonComponent;
