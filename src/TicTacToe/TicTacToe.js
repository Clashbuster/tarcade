import React from 'react';
import TicTacToeSquare from  '../TicTacToe/TicTacToeSquare.js'



export default class TicTacToe extends React.Component {
    constructor(){
        super()
        this.state = {
            turn: true,
            xs: [],
            os: []
        }
    }


    checkWin(){
        console.log("hello")
    }
   
    generateSquares(){
        let boxes = []
        for(let i = 0; i < 9; i ++){
            boxes.push(<TicTacToeSquare checkWin={this.checkWin} key={i}></TicTacToeSquare>)
        }

        return boxes
    }


    render(){
        return(
            <div className="tictactoe">
              {this.generateSquares()}
            </div>
        )
    }
}
