import React from 'react';
import TicTacToe from '../TicTacToe/TicTacToe.js';
import SubmarineMen from '../SubmarineMen/SubmarineMen.js';
import Connect4 from '../Connect4/Connect4.js';
import Go from '../Go/Go.js';



class Browser extends React.Component {
  constructor(){
    super()
    this.state = {
      selection: null,
      gameList: [
            ["tic-tac-toe-sign", <TicTacToe></TicTacToe>],
          ["submarine-men-sign", <SubmarineMen></SubmarineMen>],
          ["connect-4-sign", <Connect4></Connect4>],
          ["go-sign", <Go></Go>]
      ]
    }
  }

  updateSelection(item){
    this.setState({
        selection: item
    })
  }

  newGameClick(){
      let holder = null
      this.setState(prev => {
        holder = prev.selection
        return {selection: null}
      }, () => {
          this.setState({
              selection: holder
          })
      })
  }



  makeGameListCards(){
      return this.state.gameList.map((item, index) => {
        return <div className={item[0]} onClick={() => this.updateSelection(item[1])} key={index}></div>
      })
  }




  render(){
    return (
      <div id="browser">
                <div id="game-list">
                    <div id="game-list-fixed">
                    {this.makeGameListCards()} 
                    </div>
                </div>

                <div id="game-window">
                    <div id="game-window-fixed">
                        {this.state.selection}
                    </div>
                    <div onClick={() => this.newGameClick()} className="new-game">
                        <div className="new-game-text">new</div>
                    </div>
                </div>

                <div id="ad-margin">
                    <div id="ad-fixed">

                    </div>
                </div>

          </div>
    );
  }
}

export default Browser;
