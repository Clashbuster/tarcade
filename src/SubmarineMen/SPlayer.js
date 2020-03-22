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
                <div>
                    Player {this.props.playerNumber}
                </div>
                <div>
                    Tokens : {this.props.tokens}
                </div>
                <div>
                    Score : {this.props.score}
                </div>
                <div>
                    Escaped : {this.props.escaped? "yes" : "no"}
                </div>
            </div>
        )
    }
}
