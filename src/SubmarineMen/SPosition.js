import React from 'react';




export default class SPosition extends React.Component {
    constructor(){
        super()
        this.state = {
            image: this.props.player
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.player !== this.props.player) {
          this.setState({image: this.props.player});
        }
      }


    render(){
        return(
            <div className="sposition">
                {this.state.image}
            </div>
        )
    }
}
