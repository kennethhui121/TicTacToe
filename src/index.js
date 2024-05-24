import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Header from './components/Header';
import Game from './Pages/Game';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Header />
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="play/:mode" element={<Game />} />
        <Route path="play/:mode" element={<Game mode="bot" />} />
      </Routes>
    </Router>
  </>
);