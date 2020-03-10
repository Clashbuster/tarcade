import React from 'react';




export default class TicTacToe extends React.Component {
    constructor(){
        super()
        this.state = {
            clicked: false,
            img: null
        }
    }
   
 handleClick(){
     if(this.state.clicked === false){
        if(this.props.turn === true){
            this.setState({
                img : <img alt="oopsie" src={require("../X.png")}></img>,
                clicked : true
            }, ()=> {
                this.props.updateTurn()
            })
        } else {
            this.setState({
                img : <img alt="oopsie" src={require("../O.png")}></img>,
                clicked : true
            }, ()=> {
                this.props.updateTurn()
            })
        }
     }
 }


    render(){
        return(
            <div onClick={() => this.handleClick()} className="tictactoe-square">
                {this.state.clicked? this.state.img : null}
            </div>
        )
    }
}
