import React from 'react';



export default class PlayButton extends React.Component {
   

    render(){
        return(
            <div onClick={e => this.props.enterBrowser(e)} className="playbutton">
              
            </div>
        )
    }
}
