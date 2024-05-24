import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Create this file for styling

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Tic Tac Toe</h1>
      <div className="options">
        <Link to="/game/1v1" className="option">1 v 1</Link>
        <Link to="/game/bot" className="option">Play Against Bot</Link>
      </div>
    </div>
  );
};

export default Home;
