import React from 'react';

const Connect4Slot = ({ identifier, onClick, coordinate, turn, boardModel, apiMoves }) => {
  if (identifier === 1 || identifier === 2) {
    const className = `connect4-player${identifier}`;
    return <div className={className}></div>;
  }
  return <div onClick={() => onClick(coordinate, turn, boardModel, apiMoves)} className="connect4-slot"></div>;
};

export default Connect4Slot;
