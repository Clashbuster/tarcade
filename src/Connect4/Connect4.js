import React from 'react';
import Connect4Column from  '../Connect4/Connect4Column.js'
import Connect4Slot from  '../Connect4/Connect4Slot.js'




export default class Connect4 extends React.Component {
   constructor(){
       super()
       this.boardModel = []
       this.state = {
           turn: true,
           board: [],
           gamestarted: false
       }
   }  

   componentDidUpdate(){
       console.log(this.state.board)
   }

   generateModel(){
    let newboardmodel = []
    for(let x = 0; x < 7; x ++){
        let newColumn = []
        for(let y = 0; y < 6; y++){
            newColumn.push(0)
        }
        newboardmodel.push(newColumn)
    }
    this.boardModel = newboardmodel
    // console.log(this.boardModel)
   }
   
   
   generateBoard(){
       this.generateModel()
    let gameboard = []

       for(let i = 0; i < 7; i++){
        let newColumn = []
        for(let k = 0; k < 6; k++){
            newColumn.push(<Connect4Slot indentifier={0} dropper={this.dropper} coordinate={[i,k]}></Connect4Slot>)
        }
        // console.log(newColumn)
        gameboard.push(<Connect4Column column={newColumn} ></Connect4Column>)
       }

       this.setState({
        board: gameboard,
        gamestarted: true
    })
   }

   updateRenderFromModel(){
       let newBoardRender = []

       for(let x = 0; x < this.boardModel.length; x ++){

        let newColumn = []

           for(let y = 0; y < this.boardModel[x].length; y ++){
               if(this.boardModel[x][y] === 1){
                        newColumn.push(<Connect4Slot identifier={1} dropper={this.dropper} coordinate={[x,y]}></Connect4Slot>)
               }else if(this.boardModel[x][y] === 2){
                        newColumn.push(<Connect4Slot identifier={2} dropper={this.dropper} coordinate={[x,y]}></Connect4Slot>)
               } else {
                        newColumn.push(<Connect4Slot identifier={0} dropper={this.dropper} coordinate={[x,y]}></Connect4Slot>)
               }
           }
        //    console.log(newColumn)
           newBoardRender.push(<Connect4Column column={newColumn} ></Connect4Column>)
       }
       return newBoardRender
   }

   dropper = (coordinates) => {
       let landingcoordinates = []
            for(let y = 0; y < this.boardModel[coordinates[0]].length; y ++){
                if(this.boardModel[coordinates[0]][y] === 0){
                    this.boardModel[coordinates[0]][y] = this.state.turn? 1: 2
                    landingcoordinates.push(coordinates[0])
                    landingcoordinates.push(y)
                    break;
                }
            }
            // console.log(this.boardModel[8,8])
            if(this.checkpositiveDiagonal(landingcoordinates, this.state.turn? 1: 2) === true){
                return this.executeWinnder(this.state.turn? 1: 2)
            } else if( this.checkhorizontal(landingcoordinates, this.state.turn? 1: 2) === true){
                return this.executeWinnder(this.state.turn? 1: 2)
            } else if(this.checkvertical(landingcoordinates, this.state.turn? 1: 2) === true){
                return this.executeWinnder(this.state.turn? 1: 2)
            } else if(this.checknegativeDiagonal(landingcoordinates, this.state.turn? 1: 2) === true){
                return this.executeWinnder(this.state.turn? 1: 2)
            } else {
                this.setState(prev => {

                    return {
                        board: this.updateRenderFromModel(),
                        turn: !prev.turn 
                    }
                    
                })
            }
   }

   checkpositiveDiagonal(coordinates, identifier){
    let counter = 0

    while(true){
        if(coordinates[0] + counter +1 ===7){
            break;
        } else if(coordinates[1] + counter +1 ===6) {
            break;
        }
        counter += 1
    }

    let backwardsCounter = 0
    let wintracker = 0

    while(true){
        if(this.boardModel[coordinates[0] + counter - backwardsCounter][coordinates[1] + counter - backwardsCounter] === identifier){
            wintracker += 1
            // console.log(wintracker)
            if(wintracker === 4){
                return true
            }
        } else {
            wintracker = 0
        }

        if(coordinates[0] + counter - (backwardsCounter +1) === -1){
            break;
        } else if(coordinates[1] + counter - (backwardsCounter +1) === -1){
            break;
        }
       
        backwardsCounter += 1
    }
    
    return false
   }

   checknegativeDiagonal(coordinates, identifier){
    let counter = 0

    while(true){
        if(coordinates[0] + counter +1 ===7){
            break;
        } else if(coordinates[1] - counter - 1 === - 1) {
            break;
        }
        counter += 1
    }

    let backwardsCounter = 0
    let wintracker = 0

    while(true){
        if(this.boardModel[coordinates[0] + counter - backwardsCounter][coordinates[1] - counter + backwardsCounter] === identifier){
            wintracker += 1
            // console.log(wintracker)
            if(wintracker === 4){
                return true
            }
        } else {
            wintracker = 0
        }

        if(coordinates[0] + counter - (backwardsCounter +1) === -1){
            break;
        } else if(coordinates[1] - counter + (backwardsCounter + 1) === 6){
            break;
        }
       
        backwardsCounter += 1
    }
    
    return false
   }

   checkhorizontal(coordinates, identifier){
    let counter = 0

    while(true){
        if(coordinates[0] + counter + 1 === 7){
            break;
        } 
        counter += 1
    }

    let backwardsCounter = 0
    let wintracker = 0

    while(true){
        if(this.boardModel[coordinates[0]   + counter - backwardsCounter][coordinates[1]] === identifier){
            wintracker += 1
            // console.log(wintracker)
            if(wintracker === 4){
                return true
            }
        } else {
            wintracker = 0
        }

        if(coordinates[0] + counter - (backwardsCounter +1) === -1){
            break;
        }
       
        backwardsCounter += 1
    }
    
    return false
   }

   checkvertical(coordinates, identifier){
    let counter = 0

    while(true){
        if(coordinates[1] + counter + 1 === 6){
            break;
        } 
        counter += 1
    }

    let backwardsCounter = 0
    let wintracker = 0

    while(true){
        if(this.boardModel[coordinates[0]][coordinates[1]  + counter - backwardsCounter] === identifier){
            wintracker += 1
            // console.log(wintracker)
            if(wintracker === 4){
                return true
            }
        } else {
            wintracker = 0
        }

        if(coordinates[1] + counter - (backwardsCounter +1) === -1){
            break;
        }
       
        backwardsCounter += 1
    }
    
    return false
   }


   executeWinnder(identifier){
       let player = ""
       if(identifier === 1){
           player = "Red"
       } else if(identifier === 2){
           player = "Blue"
       }

        this.setState({
        board: <div className="connect4-winner-statement">{`${player} Won the game!`}</div>
        })
   }





  


    render(){
        return(
            <div className="connect4">
                {this.state.gamestarted? this.state.board : <div onClick={()=> this.generateBoard()} className="start-game"> start</div> }
            </div> 
        )
    }
}



