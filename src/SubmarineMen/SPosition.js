import React from 'react';




export default class SPosition extends React.Component {

    // constructor(props){
    //     super(props)
    // }


    render(){
            if(this.props.emptyPosition === true){
                console.log('hello from position')
            return (
                <div className="sposition-empty">
                    {this.props.player}
                </div>
            )
        } else {
            return(
                <div className="sposition">
                    {this.props.player}
                </div>
            ) 
        }
    }
}
