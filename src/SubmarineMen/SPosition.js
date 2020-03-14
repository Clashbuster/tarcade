import React from 'react';




export default class SPosition extends React.Component {

    constructor(props){
        super(props)
        console.log(this.props.player)
    }


    render(){
        return(
            <div className="sposition">
                {this.props.player}
                {/* <img className="splayer" alt="oopsie" src={require("../player1.png")}></img> */}
            </div>
        )
    }
}
