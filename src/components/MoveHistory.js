import React from 'react';

const MoveHistory = ({ history, jumpTo, showMoveHistory, toggleMoveHistory }) => (
  <div>
    <button onClick={toggleMoveHistory}>
      {showMoveHistory ? 'Hide' : 'Show'} Move History
    </button>
    {showMoveHistory && (
      <ol>
        {history.map((step, move) => (
          <li key={move}>
            <button className='button-move' onClick={() => jumpTo(move)}>
              {move ? `Go to move #${move}` : 'Go to game start'}
            </button>
          </li>
        ))}
      </ol>
    )}
  </div>
);

export default MoveHistory;
