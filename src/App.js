import React from 'react';
import { Link } from 'react-router-dom';

import './App.css';

const App = () => {
  return (
    <div className='container'>
      <div className='button-container'>
        <button><Link to='/play/bot'>vs Computer</Link></button>
        <button><Link to='/play/human'>1 vs 1</Link></button>
      </div>
    </div>
  );
};

export default App;
