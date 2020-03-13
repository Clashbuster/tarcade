import React from 'react';




export default class SPlayer extends React.Component {
    constructor(){
        super()
        this.state = {
            tokenCount: 0,
            score: 0,
            direction: true,
            position: null
        }
    }


    render(){
        return(
            <div className="splayer">
                I'm a player
            </div>
        )
    }
}
