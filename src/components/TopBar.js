import React from 'react';



export default class TopBar extends React.Component {
   

    render(){
        return(
            <div id="top-bar">
              <div className="spacer1">
              </div>
              <div className="logo">
                  <img alt="oopsie" src={require('../topbarlogo.png')}></img>
              </div>
              <div className="spacer2">
              </div>
            </div>
        )
    }
}
