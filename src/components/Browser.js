import React from 'react';
import TicTacToe from '../TicTacToe/TicTacToe.js';
import SubmarineMen from '../SubmarineMen/SubmarineMen.js';



class Browser extends React.Component {
  constructor(){
    super()
    this.state = {
      selection: null,
      gameList: [
            ["tic-tac-toe", <TicTacToe></TicTacToe>],
          ["submarine-men", <SubmarineMen></SubmarineMen>]
      ]
    }
  }

  updateSelection(item){
    this.setState({
        selection: item
    })
  }



  makeGameListCards(){
      return this.state.gameList.map((item, index) => {
        return <div className="game-list-card" onClick={() => this.updateSelection(item[1])} key={index}>{item[0]}</div>
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
                </div>

                <div id="ad-margin">

                </div>

          </div>
    );
  }
}

export default Browser;
