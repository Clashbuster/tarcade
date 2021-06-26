import React, { useState, useEffect } from 'react';
import Connect4Column from  '../Connect4/Connect4Column.js'
import Connect4Slot from  '../Connect4/Connect4Slot.js'

const clone = (board) => {
  const newBoard = [];
  for (let x = 0; x < board.length; x++) {
    const newY = [...board[x]];
    newBoard.push(newY);
  }
  return newBoard;
};

const applyNewCoordinatesToBoardModel = (boardModel, turn, coordinates) => {
  const landingcoordinates = []
  const newBoardModel = clone(boardModel);
  for(let y = 0; y < newBoardModel[coordinates[0]].length; y++){
    if(!newBoardModel[coordinates[0]][y]){
        newBoardModel[coordinates[0]][y] = turn? 1: 2;
        landingcoordinates.push(coordinates[0]);
        landingcoordinates.push(y);
        break;
    }
  }
  return {boardModel: newBoardModel, coordinates: landingcoordinates};
};

const applyNewCoordinatesToBoard = (boardModel, turn, cb) => {
  const board = [];
  for(let x = 0; x < boardModel.length; x++){
    const newColumn = [];
    for(let y = 0; y < boardModel[x].length; y++){
      let id = 0;
      if(boardModel[x][y] === 1 || boardModel[x][y] === 2){
        id = boardModel[x][y];
      }
      newColumn.push(<Connect4Slot key={y} identifier={id} turn={turn} boardModel={boardModel} onClick={cb} coordinate={[x,y]} />);
    }
    board.push(<Connect4Column key={x} column={newColumn} />);
  }
  return board;
};

const checkForWinningBoard = (boardModel, landingcoordinates, turn) => (
  checkpositiveDiagonal(boardModel, landingcoordinates, turn? 1: 2) ||
    checkhorizontal(boardModel, landingcoordinates, turn? 1: 2) ||
    checkvertical(boardModel, landingcoordinates, turn? 1: 2) ||
    checknegativeDiagonal(boardModel, landingcoordinates, turn? 1: 2)
);

const generateBoard = (boardModel, turn, onClickBoard) => {
   boardModel.splice(0, boardModel.length);
   for(let x = 0; x < 7; x++){
     let newColumn = [];
     for(let y = 0; y < 6; y++){
       newColumn.push(0);
     }
     boardModel.push(newColumn);
   }

   const board = [];
   for(let i = 0; i < 7; i++){
     let newColumn = []
     for(let k = 0; k < 6; k++){
        newColumn.push(<Connect4Slot key={k} identifier={0} onClick={onClickBoard} turn={turn} boardModel={boardModel} coordinate={[i,k]} />);
     }
     board.push(<Connect4Column key={i} column={newColumn} />);
   }

   return {boardModel, board};
};

const checkpositiveDiagonal = (boardModel, coordinates, identifier) => {
  let counter = 0

  while(true){
      if(coordinates[0] + counter +1 ===7){
          break;
      } else if(coordinates[1] + counter +1 ===6) {
          break;
      }
      counter += 1
  }

  let backwardsCounter = 0
  let wintracker = 0

  while(true){
      if(boardModel[coordinates[0] + counter - backwardsCounter][coordinates[1] + counter - backwardsCounter] === identifier){
          wintracker += 1
          if(wintracker === 4){
              return true
          }
      } else {
          wintracker = 0
      }

      if(coordinates[0] + counter - (backwardsCounter +1) === -1){
          break;
      } else if(coordinates[1] + counter - (backwardsCounter +1) === -1){
          break;
      }
     
      backwardsCounter += 1
  }
  
  return false
};

const checknegativeDiagonal = (boardModel, coordinates, identifier) => {
  let counter = 0

  while(true){
      if(coordinates[0] + counter +1 ===7){
          break;
      } else if(coordinates[1] - counter - 1 === - 1) {
          break;
      }
      counter += 1
  }

  let backwardsCounter = 0
  let wintracker = 0

  while(true){
      if(boardModel[coordinates[0] + counter - backwardsCounter][coordinates[1] - counter + backwardsCounter] === identifier){
          wintracker += 1
          if(wintracker === 4){
              return true
          }
      } else {
          wintracker = 0
      }

      if(coordinates[0] + counter - (backwardsCounter +1) === -1){
          break;
      } else if(coordinates[1] - counter + (backwardsCounter + 1) === 6){
          break;
      }
     
      backwardsCounter += 1
  }
  
  return false
};

const checkhorizontal = (boardModel, coordinates, identifier) => {
  let counter = 0

  while(true){
      if(coordinates[0] + counter + 1 === 7){
          break;
      } 
      counter += 1
  }

  let backwardsCounter = 0
  let wintracker = 0

  while(true){
      if(boardModel[coordinates[0]   + counter - backwardsCounter][coordinates[1]] === identifier){
          wintracker += 1
          if(wintracker === 4){
              return true
          }
      } else {
          wintracker = 0
      }

      if(coordinates[0] + counter - (backwardsCounter +1) === -1){
          break;
      }
     
      backwardsCounter += 1
  }
  
  return false
};

const checkvertical = (boardModel, coordinates, identifier) => {
  let counter = 0

  while(true){
      if(coordinates[1] + counter + 1 === 6){
          break;
      } 
      counter += 1
  }

  let backwardsCounter = 0
  let wintracker = 0

  while(true){
      if(boardModel[coordinates[0]][coordinates[1]  + counter - backwardsCounter] === identifier){
          wintracker += 1
          if(wintracker === 4){
              return true
          }
      } else {
          wintracker = 0
      }

      if(coordinates[1] + counter - (backwardsCounter +1) === -1){
          break;
      }
     
      backwardsCounter += 1
  }
  
  return false
};


const updateRenderFromModel = (boardModel, cb) => {
  let newBoardRender = [];
  for(let x = 0; x < boardModel.length; x++){
    let newColumn = [];
    for(let y = 0; y < boardModel[x].length; y++){
      let id = 0;
      if(boardModel[x][y] === 1 || boardModel[x][y] === 2){
        id = boardModel[x][y];
      }
      newColumn.push(<Connect4Slot identifier={id} onClick={cb} coordinate={[x,y]} />);
    }
    newBoardRender.push(<Connect4Column column={newColumn} />);
  }
  return newBoardRender;
};

const Connect4 = () => {
  const [board, setBoard] = useState(null);
  const [boardModel, setBoardModel] = useState([]);
  const [turn, setTurn] = useState(false);
  const [gamestarted, setGamestarted] = useState(false);

  const onClickBoard = (coordinate, newTurn, newBoardModel) => {
    // figure out new board
    const updatedNewTurn = !newTurn;
    const { boardModel: newBoardModel2, coordinates: newCoordinates } = applyNewCoordinatesToBoardModel(newBoardModel, updatedNewTurn, coordinate);

    // check for win, if win update and end
    const winning = checkForWinningBoard(newBoardModel2, newCoordinates, updatedNewTurn);
    
    // if win update
    if (winning) {
      setBoard(<div className="connect4-winner-statement">{`${updatedNewTurn ? 'Red' : 'Blue'} won the game!`}</div>);
      return;
    }

    // if not win, calculate new board and update
    updateBoard(newBoardModel2, updatedNewTurn);
  };

  const updateBoard = (newBoardModel, newTurn) => {
    const newBoard = applyNewCoordinatesToBoard(newBoardModel, newTurn, onClickBoard);
    setBoardModel(newBoardModel);
    setBoard(newBoard);
    setTurn(newTurn);
  };
  
  const startGame = () => {
    const { boardModel: newBoardModel, board: newBoard } = generateBoard(boardModel, turn, onClickBoard);
    setBoardModel(newBoardModel);
    setBoard(newBoard);
    setGamestarted(true);
  };
  return (
    <div className="connect4">
      { gamestarted? board : <div onClick={startGame} className="start-game">start</div> }
    </div> 
  )
};

export default Connect4;
