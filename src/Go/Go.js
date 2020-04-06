import React from 'react';
import GoColumn from  '../Go/GoColumn.js'
import GoCell from  '../Go/GoCell.js'



export default class Go extends React.Component {
constructor(){
    super()
    this.boardModel = []
    this.openVerticies = 0
    this.emptyVerticiesToReset = new Stack()
    this.positionsToCapture = new Stack()
    this.visitedPositions = new Stack()
    this.koStack = new Stack()
    this.koCounter = 0
    this.capturesOnTurn = 0
    this.player1 = 0
    this.player2 = 0
    this.state = {
        turn: true,
        boardRender : this.generateFirstRender()
    }
}

generateFirstModel(){
    let newboardmodel = []
    for(let x = 0; x < 19; x++){
        let newColumn = []
        for(let y = 0; y < 19; y++){
            newColumn.push([0,0,0])
        }
        newboardmodel.push(newColumn)
    }
    return newboardmodel
}

resetVisited(){
    while(this.visitedPositions.head !== null){
        this.boardModel[this.visitedPositions.head.value[0]][this.visitedPositions.head.value[1]][1] = 0
        this.visitedPositions.skim()
    }
}

resetemptyVisited(){
 
    while(this.emptyVerticiesToReset.head !== null){
        this.boardModel[this.emptyVerticiesToReset.head.value[0]][this.emptyVerticiesToReset.head.value[1]][1] = 0
        this.emptyVerticiesToReset.skim()
    }
}

generateFirstRender(){
    this.boardModel = this.generateFirstModel()
    let newboardrender = []
    for(let x = 0; x < this.boardModel.length; x++){
        let newColumn = []
    //    console.log(this.boardModel[x])
        for(let y = 0; y < this.boardModel[x].length; y++){
             if(this.boardModel[x][y][0] === 1){
                newColumn.push(<GoCell indentifier={1} dropper={this.dropper} coordinates={[x,y]}></GoCell>)
            } else if(this.boardModel[x][y][0] === 2){
                newColumn.push(<GoCell indentifier={2} dropper={this.dropper} coordinates={[x,y]}></GoCell>)
            } else {
                newColumn.push(<GoCell indentifier={0} dropper={this.dropper} coordinates={[x,y]}></GoCell>)
            }
        
        }
        newboardrender.push(<GoColumn column={newColumn}></GoColumn>)
    }
    return newboardrender
}

updateRender(){
    let newboardrender = []
    for(let x = 0; x < this.boardModel.length; x++){
        let newColumn = []
    //    console.log(this.boardModel[x])
        for(let y = 0; y < this.boardModel[x].length; y++){
             if(this.boardModel[x][y][0] === 1){
                newColumn.push(<GoCell indentifier={1} dropper={this.dropper} coordinates={[x,y]}></GoCell>)
            } else if(this.boardModel[x][y][0] === 2){
                newColumn.push(<GoCell indentifier={2} dropper={this.dropper} coordinates={[x,y]}></GoCell>)
            } else if(this.boardModel[x][y][0] === 0){
                newColumn.push(<GoCell indentifier={0} dropper={this.dropper} coordinates={[x,y]}></GoCell>)
            }
        
        }
        newboardrender.push(<GoColumn column={newColumn}></GoColumn>)
    }
    return newboardrender
}

removeCaptured(){
  
    while(this.positionsToCapture.head !== null){
        this.boardModel[this.positionsToCapture.head.value[0]][this.positionsToCapture.head.value[1]][0] = 0
        this.positionsToCapture.skim()
    }
}

determineCapture(coordinates, groupid){
    this.openVerticies = 0
    let groupPopulation = 0
    
        if(this.determineoutofbounds(coordinates)){
            groupPopulation =  this.identifyGroup(coordinates, groupid)
        // if(this.determineoutofbounds([coordinates[0], coordinates[1] - 1])) console.log("verticies",this.determineOpenVerticies([coordinates[0], coordinates[1] -1], opponent))
            if(this.openVerticies === 0){
                if(groupPopulation > 0){
                    this.positionsToCapture.empty()
                    this.resetemptyVisited()
                    return true
                } else {
                    this.resetemptyVisited()
                    this.positionsToCapture.empty()
                    return false
                }
            } else {
                this.resetemptyVisited()
                this.positionsToCapture.empty()
                return false
            }
        }
}

identifyKo(coordinates, groupid){
    this.openVerticies = 0
    let groupPopulation = 0
    
        if(this.determineoutofbounds(coordinates)){
            groupPopulation =  this.identifyGroup(coordinates, groupid)
        // if(this.determineoutofbounds([coordinates[0], coordinates[1] - 1])) console.log("verticies",this.determineOpenVerticies([coordinates[0], coordinates[1] -1], opponent))
            if(this.openVerticies === 0){
                if(groupPopulation > 0){
                    let capture = false
                    this.determineCapture([coordinates[0] + 1, coordinates[1]], this.state.turn? 2 : 1)? capture = true : capture = capture
                    this.determineCapture([coordinates[0] - 1, coordinates[1]], this.state.turn? 2 : 1)? capture = true : capture = capture
                    this.determineCapture([coordinates[0], coordinates[1] + 1], this.state.turn? 2 : 1)? capture = true : capture = capture
                    this.determineCapture([coordinates[0], coordinates[1] - 1], this.state.turn? 2 : 1)? capture = true : capture = capture
                    if(capture === false){
                        //this code block executes if it is a suicide move that does not result in a capture

                        return false
                    } else {
                        //this code block only executes if the move is suicidal, but results in a capture therefore is marked ko.
                        //at this point we need to see if the captured groups are marked ko.
                        this.boardModel[coordinates[0]][coordinates[1]][2] = 1
                        this.koStack.insert(new Position(coordinates))
                        this.koCounter = 1
                        return true
                    }
                } else {
                    this.resetemptyVisited()
                    this.positionsToCapture.empty()
                    return true
                }
            } else {
                this.resetemptyVisited()
                this.positionsToCapture.empty()
                return true
            }
        }
}

findKoMark(coordinates, groupid){
    if(this.determineoutofbounds(coordinates) === true){
        if(this.boardModel[coordinates[0]][coordinates[1]][1] === 0){
            if(this.boardModel[coordinates[0]][coordinates[1]][0] === groupid){
                if(this.boardModel[coordinates[0]][coordinates[1]][2]=== 1){
                    return 1
                } else {
                    this.boardModel[coordinates[0]][coordinates[1]][1] = 1
                    this.visitedPositions.insert(new Position(coordinates))
                    return ( 0 +  this.findKoMark([coordinates[0] + 1, coordinates[1]], groupid) + this.findKoMark([coordinates[0] - 1, coordinates[1]], groupid) + this.findKoMark([coordinates[0], coordinates[1] + 1], groupid) + this.findKoMark([coordinates[0], coordinates[1] - 1], groupid))
                }
            } else {
                return 0
            }
        } else {
            return 0
        }
    } else {
        return 0
    }
}

identifyKoCapture(coordinates, groupid){
    this.openVerticies = 0
    let groupPopulation = 0
    
        if(this.determineoutofbounds(coordinates)){
            groupPopulation = this.identifyGroup(coordinates, groupid)
        // if(this.determineoutofbounds([coordinates[0], coordinates[1] - 1])) console.log("verticies",this.determineOpenVerticies([coordinates[0], coordinates[1] -1], opponent))
            if(this.openVerticies === 0){
                if(groupPopulation > 0){
                    //this block executes when a capture is taking place during a suicidal move.
                    //we need to return false if the capture is going to capture a ko marked group
                    //and return true if the capture is suicide, and not captureing a ko marked group
                    this.resetVisited()
                    let koMark = false
                    this.findKoMark(coordinates, this.state.turn? 2 : 1) > 0? koMark = true : koMark = false
                    if(koMark === true){
                        this.positionsToCapture.empty()
                        this.resetemptyVisited()
                        return true
                    } else {
                        this.positionsToCapture.empty()
                        this.resetemptyVisited()
                        return false
                    }
                } else {
                    this.resetemptyVisited()
                    this.positionsToCapture.empty()
                    return false
                }
            } else {
                this.resetemptyVisited()
                this.positionsToCapture.empty()
                return false
            }
        }
}

resetKo(){
    while(this.koStack.head !== null){
        this.boardModel[this.koStack.head.value[0]][this.koStack.head.value[1]][2] = 0
        this.koStack.skim()
    }
    this.koCounter = 0
}

dropper = (coordinates) => {
    this.boardModel[coordinates[0]][coordinates[1]][0] = this.state.turn? 1 : 2
    console.log(this.boardModel)
    let currentplayer = this.state.turn? 1 : 2
    let opponent = this.state.turn? 2 : 1

    if(this.koCounter >= 2){
        this.resetKo()
        this.koCounter = 0
    } else if(this.koCounter === 1){
        this.koCounter += 1
    }

    this.resetVisited()

    if(this.identifyKo(coordinates, currentplayer) === true){
        //this executes when it is a suicidal move that results in a capture we need to check if the adjacent groups contain a ko mark

        this.resetVisited()
        let ko = false

        this.identifyKoCapture([coordinates[0] + 1, coordinates[1]], opponent)? ko = true: ko = ko
        this.identifyKoCapture([coordinates[0] - 1, coordinates[1]], opponent)? ko = true: ko = ko
        this.identifyKoCapture([coordinates[0], coordinates[1] + 1], opponent)? ko = true: ko = ko
        this.identifyKoCapture([coordinates[0], coordinates[1] - 1], opponent)? ko = true: ko = ko


        if(ko === true){
            console.log("an invalid move")
            this.boardModel[coordinates[0]][coordinates[1]][0] = 0
            return this.setState({
                    boardRender: this.updateRender()
                })
        } else {

            console.log("a valid move") 
        }
    } else {
        //this has checked and confirmed that it is a sucicidal move
        console.log("an invalid move")
        this.boardModel[coordinates[0]][coordinates[1]][0] = 0
        return this.setState({
                boardRender: this.updateRender()
            })
    }

    this.resetVisited()

    this.processOrthagonalLogic([coordinates[0] + 1, coordinates[1]], opponent)
    this.processOrthagonalLogic([coordinates[0] - 1, coordinates[1]], opponent)
    this.processOrthagonalLogic([coordinates[0], coordinates[1] + 1], opponent)
    this.processOrthagonalLogic([coordinates[0], coordinates[1] - 1], opponent)

    
    console.log("player 1's score", this.player1)
    console.log("player 2's score", this.player2)

    this.setState(prev => {
        return {
            boardRender: this.updateRender(),
            turn: !prev.turn
        }
    })
}

processOrthagonalLogic(coordinates, groupid){
this.openVerticies = 0
let groupPopulation = 0

    if(this.determineoutofbounds(coordinates)){
        groupPopulation =  this.identifyGroup(coordinates, groupid)
    // if(this.determineoutofbounds([coordinates[0], coordinates[1] - 1])) console.log("verticies",this.determineOpenVerticies([coordinates[0], coordinates[1] -1], opponent))
        if(this.openVerticies === 0){
            if(groupPopulation > 0){
                this.removeCaptured()
                this.resetemptyVisited()
                this.state.turn? this.player1 += groupPopulation : this.player2 += groupPopulation
            } else {
                this.resetemptyVisited()
                this.positionsToCapture.empty()
                
            }
        } else {
            this.resetemptyVisited()
            this.positionsToCapture.empty()
        }
    }
}

identifyGroup(coordinates, groupid){
    //this should give me the total number of connected soldiers in an orthogonal pattern

    //check if the position is in bounds
        if(this.determineoutofbounds(coordinates) === true){

            // this.boardModel[coordinates[0]][coordinates[1]][1] = 1
            // check the position has not been visited
            if(this.boardModel[coordinates[0]][coordinates[1]][1] === 0){
                //mark it as visited
                //check if the position belongs to the group id
                if(this.boardModel[coordinates[0]][coordinates[1]][0] === groupid){

                    this.boardModel[coordinates[0]][coordinates[1]][1] = 1
                    this.visitedPositions.insert(new Position(coordinates))
                    this.positionsToCapture.insert(new Position(coordinates))

                    this.openVerticies += this.addAndMarkeOpenAdjacentVerticies(coordinates)
                    //if the current position belongs to the group id, add one to the total count
                    return ( 1 +  this.identifyGroup([coordinates[0] + 1, coordinates[1]], groupid) + this.identifyGroup([coordinates[0] - 1, coordinates[1]], groupid) + this.identifyGroup([coordinates[0], coordinates[1] + 1], groupid) + this.identifyGroup([coordinates[0], coordinates[1] - 1], groupid))
                } else {
                    //if the current position belongs to anything other than the group id add nothing
                    return 0
                }
            } else {
                //if the position is empty add nothing
                return 0
            }
        } else {
            //if the current position is out of bounds, add nothing.
            return 0
        }
    }

    addAndMarkeOpenAdjacentVerticies(coordinates){
        let number = 0
        //if it is imbounds
        if(this.determineoutofbounds([coordinates[0] + 1, coordinates[1]]) === true){
                //if it is empty
                if(this.boardModel[coordinates[0] + 1][coordinates[1]][0] === 0){
                    //add to the total
                    //check to see if it has been visited
                    if(this.boardModel[coordinates[0] + 1][coordinates[1]][1] === 0){
                        this.boardModel[coordinates[0] + 1][coordinates[1]][1] = 1
                        this.emptyVerticiesToReset.insert(new Position([coordinates[0] + 1, coordinates[1]]))
                        number += 1
                    }
                }
        }

        if(this.determineoutofbounds([coordinates[0] - 1, coordinates[1]]) === true){

                //if it is empty
                if(this.boardModel[coordinates[0] - 1][coordinates[1]][0] === 0){
                    //add to the total
                    if(this.boardModel[coordinates[0] - 1][coordinates[1]][1] === 0){
                        this.boardModel[coordinates[0] - 1][coordinates[1]][1] = 1
                        this.emptyVerticiesToReset.insert(new Position([coordinates[0] -1, coordinates[1]]))
                        number += 1
                    }
                }
        }

        if(this.determineoutofbounds([coordinates[0], coordinates[1] + 1]) === true){
                //if it is empty
                if(this.boardModel[coordinates[0]][coordinates[1] + 1][0] === 0){
                    //add to the total
                    if(this.boardModel[coordinates[0]][coordinates[1] + 1][1] === 0){
                        this.boardModel[coordinates[0]][coordinates[1] + 1][1] = 1
                        this.emptyVerticiesToReset.insert(new Position([coordinates[0], coordinates[1]+ 1])) 
                        number += 1
                    }
                }
        }

        if(this.determineoutofbounds([coordinates[0], coordinates[1] - 1]) === true){
                //if it is empty
                if(this.boardModel[coordinates[0]][coordinates[1] - 1][0] === 0){
                    //add to the total
                    if(this.boardModel[coordinates[0]][coordinates[1] - 1][1] === 0){
                        this.boardModel[coordinates[0]][coordinates[1] - 1][1] = 1
                        this.emptyVerticiesToReset.insert(new Position([coordinates[0], coordinates[1]- 1])) 
                        number += 1
                    }
                }
        }

        return number

    }



determineoutofbounds(coordinates){
    let output = true
    if(coordinates[0] <= -1){
        output = false
    } else if(coordinates[1] <= -1){
        output = false
    } else if(coordinates[0] >= 19){
        output = false
    } else if(coordinates[1] >= 19){
        output = false
    }  
    return output   
}

componentDidUpdate(){
    console.log(this.state)
}



    render(){
        return (
            <div className="go">
                {this.state.boardRender}
            </div>
        )
    }
}

class Stack {
    constructor(){
        this.head = null
    }

    insert(position){
        if(this.head === null){
            this.head = position
        } else {
            position.next = this.head
            this.head = position
        }
    }

    skim(){
        if(this.head === null){
            return 0
        } else {
            let output = this.head
            this.head = this.head.next
            return output
        }
    }

    empty(){
        this.head = null
    }

}

class Position {
    constructor(value){
        this.next = null
        this.value = value
    }
}
