import React from 'react';





export default class Connect4Slot extends React.Component {
   
    renderDiv(){
        switch(this.props.identifier){
            case 1:
                return <div className="connect4-player1"></div>
            case 2:
                return <div className="connect4-player2"></div>
            default:
                return <div onClick={() => this.props.dropper(this.props.coordinate)} className="connect4-slot"></div> 
        }
    }




    render(){
        return this.renderDiv()
    }
}
