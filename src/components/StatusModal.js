import React from 'react';
import Modal from 'react-modal';

const StatusModal = ({ isOpen, winner, tie, onClose, onReset }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Winner Announcement"
    className="modal"
    overlayClassName="overlay"
  >
    <h2>{winner ? 'Congratulations!' : tie ? 'It\'s a Tie!' : ''}</h2>
    {winner && <p>{`Winner: ${winner}`}</p>}
    <div style={{display: "flex"}}>
      <button className="reset-button" onClick={onReset}>Reset Game</button>
      <button onClick={onClose}>Close</button>
    </div>
  </Modal>
);

export default StatusModal;