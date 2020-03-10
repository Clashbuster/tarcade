import React from 'react';
import TicTacToeSquare from  '../TicTacToe/TicTacToeSquare.js'



export default class TicTacToe extends React.Component {
    constructor(){
        super()
        this.state = {
            turn: true,
        }
    }


    updateTurn = () => {
        this.setState(prev => {
            let newTurn = !prev.turn
            return {
                turn: newTurn
            }
        })
    }
   
    generateSquares(){

        return ( 
            <>
                <div className="tictactoerow">
                    <TicTacToeSquare className="tictactoesquare" turn={this.state.turn} updateTurn={this.updateTurn} key={1}></TicTacToeSquare>
                    <TicTacToeSquare className="tictactoesquare" turn={this.state.turn} updateTurn={this.updateTurn} key={2}></TicTacToeSquare>
                    <TicTacToeSquare className="tictactoesquare" turn={this.state.turn} updateTurn={this.updateTurn} key={3}></TicTacToeSquare>
                </div>
                <div className="tictactoerow">
                    <TicTacToeSquare className="tictactoesquare" turn={this.state.turn} updateTurn={this.updateTurn} key={4}></TicTacToeSquare>
                    <TicTacToeSquare className="tictactoesquare" turn={this.state.turn} updateTurn={this.updateTurn} key={5}></TicTacToeSquare>
                    <TicTacToeSquare className="tictactoesquare" turn={this.state.turn} updateTurn={this.updateTurn} key={6}></TicTacToeSquare>
                </div>
                <div className="tictactoerow">
                    <TicTacToeSquare className="tictactoesquare" turn={this.state.turn} updateTurn={this.updateTurn} key={7}></TicTacToeSquare>
                    <TicTacToeSquare className="tictactoesquare" turn={this.state.turn} updateTurn={this.updateTurn} key={8}></TicTacToeSquare>
                    <TicTacToeSquare className="tictactoesquare" turn={this.state.turn} updateTurn={this.updateTurn} key={9}></TicTacToeSquare>
                </div>
            </>
        )
    }


    render(){
        return(
            <div className="tictactoe">
              {this.generateSquares()}
            </div>
        )
    }
}
