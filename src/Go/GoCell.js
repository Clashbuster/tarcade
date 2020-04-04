import React from 'react';





export default class GoCell extends React.Component {
   
    renderDiv(){
        switch(this.props.indentifier){
            case 1:
                return <div className="go-player1"></div>
            case 2:
                return <div className="go-player2"></div>
            default:
                return <div onClick={() => this.props.dropper(this.props.coordinates)} className="go-cell"></div> 
        }
    }




    render(){
        return this.renderDiv()
    }
}
