import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Board from '../components/Board';
import Status from '../components/Status';
import MoveHistory from '../components/MoveHistory';
import StatusModal from '../components/StatusModal';
import { calculateWinner, getBotMove } from './Bot';
import axios from 'axios';

const LOCAL_STORAGE_KEY = 'tic-tac-toe';

const Game = () => {
  const { mode } = useParams();
  const navigate = useNavigate();
  const [isBotMode] = useState(mode === 'bot');
  const [history, setHistory] = useState(loadGameFromLocalStorage() || [{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(false);
  const [showMoveHistory, setShowMoveHistory] = useState(true);
  const [isWinner, setIsWinner] = useState(null);
  const [isTie, setIsTie] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    //lets users return to where they left off
    saveGameToLocalStorage(history);
  }, [history]);

  useEffect(() => {
    //to get the bot. 
    if (isBotMode && !xIsNext) {
      const handleBotMove = async () => {
        const current = history[stepNumber];
        const botMove = await getBotMove(current.squares);
        console.log('Bot move:', botMove);
        handleClick(botMove, true);
      };
      handleBotMove();
    }
  }, [xIsNext, isBotMode, history, stepNumber]);

  useEffect(() => {
    //checks for tie.
    const currentSquares = history[stepNumber].squares;
    const filledSquares = currentSquares.filter(square => square !== null).length;
  
    if (!calculateWinner(currentSquares) && filledSquares === 9) {
      setIsTie(true);
      setIsModalOpen(true);
    }
  }, [history, stepNumber]);

  const handleClick = async (i, isBot = false) => {
    //player vs player handler
    if (!isBot && isBotMode && !xIsNext) {
      return;
    }
    const hist = history.slice(0, stepNumber + 1);
    const current = hist[hist.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(hist.concat([{ squares }]));
    setStepNumber(hist.length);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(squares);
    if (winner) {
      setIsWinner(winner);
      setIsModalOpen(true);
    }

    // If not playing against the bot, send the move to the server
    if (!isBot && !isBotMode) {
      try {
        const response = await axios.post('/api/make-move', {
          squares: squares,
          isPlayerX: xIsNext // Send current player turn to the server
        });
        console.log('Move sent to server:', response.data);
      } catch (error) {
        console.error('Error sending move to server:', error);
      }
    }
  };

  //allows us to reset to a certain move/play
  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    setIsWinner(null);
  };

  //resets the game
  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
    setIsWinner(null);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={history[stepNumber].squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className='button-ingamecontainer'>
        <button onClick={resetGame}>Reset Game</button>
        <button onClick={() => navigate('/')}>Return Home</button>
      </div>
      <div className="game-info">
        <Status winner={isWinner} xIsNext={xIsNext} />
        <MoveHistory
          history={history}
          jumpTo={jumpTo}
          showMoveHistory={showMoveHistory}
          toggleMoveHistory={() => setShowMoveHistory(!showMoveHistory)}
        />
      </div>
      <StatusModal
        isOpen={isModalOpen}
        winner={isWinner}
        tie={isTie}
        onClose={closeModal}
        onReset={resetGame}
      />
    </div>
  );
};

export default Game;

const loadGameFromLocalStorage = () => {
  const savedGame = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedGame ? JSON.parse(savedGame) : null;
};

const saveGameToLocalStorage = (history) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
};