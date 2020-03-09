import React from 'react';



export default class Title extends React.Component {
    constructor(){
        super()
        this.state = {
            on: false
        }
        this.flash()
    }


    flash(){
        setInterval(() => {
            this.setState(prev => {
                let newflash = !prev.on
                return {
                    on: newflash
                }
            })
        }, 2000)
    }





    render(){
        return(
            <div id="title">
            <img  id="base-title" alt="oops" src={this.state.on? require("../flashlogo.png") : require("../logo.png")}></img>
            </div>
        )
    }
}
