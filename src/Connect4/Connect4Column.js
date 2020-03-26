import React from 'react';





export default class Connect4Column extends React.Component {
   


    render(){
        return(
            <div className="connect4-column">
                {this.props.column}
            </div> 
        )
    }
}
