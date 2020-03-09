import React from 'react';



class Browser extends React.Component {
  constructor(){
    super()
    this.state = {
      selection: null,
      gameList: [
          "tic-tac-toe",
          "connect-four",
          "checkers"
      ]
    }
  }

  makeGameListCards(){
      return this.state.gameList.map((item, index) => {
        return <div className="game-list-card" key={index}>{item}</div>
      })
  }




  render(){
    return (
      <div id="browser">
                <div id="game-list">
                    {this.makeGameListCards()}
                </div>

                <div id="game-window">

                </div>

                <div id="ad-margin">

                </div>

          </div>
    );
  }
}

export default Browser;
