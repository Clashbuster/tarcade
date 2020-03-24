import React from 'react';
import Connect4Column from  '../Connect4/Connect4Column.js'
import Connect4Slot from  '../Connect4/Connect4Slot.js'




export default class Connect4 extends React.Component {
   constructor(){
       super()
       this.state = {
           turn: true,
           column1: <Connect4Column></Connect4Column>,
           column2: <Connect4Column></Connect4Column>,
           column3: <Connect4Column></Connect4Column>,
           column4: <Connect4Column></Connect4Column>,
           column5: <Connect4Column></Connect4Column>,
           column6: <Connect4Column></Connect4Column>,
           column7: <Connect4Column></Connect4Column>
       }
   }


   clickHandler = () => {
    
   }


    render(){
        return(
            <div className="connect4">hello</div> 
        )
    }
}




class Position {
    constructor(){
        this.up = null
        this.down = null
        this.right = null
        this.left = null
        this.upright = null
        this.downright = null
        this.downleft = null
        this.upleft = null
        this.empty = false
        this.index = null
        this.reactComponent = null
    }
}

class BoardModel{

}
