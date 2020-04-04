import React from 'react';





export default class GoColumn extends React.Component {
   


    render(){
        return(
            <div className="go-column">
                {this.props.column}
            </div> 
        )
    }
}
