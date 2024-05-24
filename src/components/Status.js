import React from 'react';

const Status = ({ winner, xIsNext }) => {
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;
  return <div>{status}</div>;
};

export default Status;
