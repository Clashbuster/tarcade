import React from 'react';




export default class TicTacToe extends React.Component {
    constructor(){
        super()
        this.state = {
            clicked: false
        }
    }
   
 handleClick(){
    this.setState({
        clicked: true
    }, () => {
        this.props.checkWin()
    })
 }


    render(){
        return(
            <div onClick={() => this.handleClick()} className="tictactoe-square">
                {this.state.clicked? "I'm clicked": "I'm not clicked"}
            </div>
        )
    }
}
