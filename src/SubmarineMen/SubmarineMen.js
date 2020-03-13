import React from 'react';
import SPosition from  '../SubmarineMen/SPosition.js'
import SPlayer from  '../SubmarineMen/SPlayer.js'
import SBoat from  '../SubmarineMen/SBoat.js'





export default class SubmarineMen extends React.Component {

    componentDidUpdate(){
        console.log(this.state)
    }


constructor(){
    super()
    this.playercycle = null
    this.gameBoard = null
    this.state = {
        htmlplayers : [],
        positions: [
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
            <SPosition player={null}></SPosition>,
        ],
        inputSnippet: <>
                <div className="how-many-players">Number of Players</div>
                    <div onClick={() => this.populatePlayers(2)} className="new-game">
                        <div className="new-game-text">2</div>
                    </div>
                    <div onClick={() => this.populatePlayers(3)} className="new-game">
                        <div className="new-game-text">3</div>
                    </div>
                    <div onClick={() => this.populatePlayers(4)} className="new-game">
                        <div className="new-game-text">4</div>
                    </div>
                    <div onClick={() => this.populatePlayers(5)} className="new-game">
                        <div className="new-game-text">5</div>
                    </div>
                    <div onClick={() => this.populatePlayers(6)} className="new-game">
                        <div className="new-game-text">6</div>
                    </div>
                    </>
    }
    this.buildBoard()
}

buildBoard(){
    let a = shuffle([0,0,1,1,2,2,3,3])
    let b = shuffle([4,4,5,5,6,6,7,7])
    let c = shuffle([8,8,9,9,10,10,11,11])
    let d = shuffle([12,12,13,13,14,14,15,15])
    let board = a.concat(b,c,d)
    // console.log(board)
   
    board = board.map((item, index) => {
        return new Position(item, index)
    })

    this.gameBoard = new boardObj(board[0])
    
    for(let i = 1; i < board.length; i++){
        this.gameBoard.assemble(board[i], i)
    }
    this.gameBoard.attachSubmarine()
}

     populatePlayers(number){
        let allPlayers = [
            <img className="splayer" alt="oopsie" src={require("../player1.png")}></img>,
            <img className="splayer" alt="oopsie" src={require("../player2.png")}></img>,
            <img className="splayer" alt="oopsie" src={require("../player3.png")}></img>,
            <img className="splayer" alt="oopsie" src={require("../player4.png")}></img>,
            <img className="splayer" alt="oopsie" src={require("../player5.png")}></img>,
            <img className="splayer" alt="oopsie" src={require("../player6.png")}></img>,
        ]
        let selectedPlayers = []

        for(let i = 0; i < number; i ++){
            selectedPlayers.push(allPlayers[i])
        }
        
        this.playercycle = new PlayerPool(number, this.gameBoard.head.left, selectedPlayers)

        this.setState({
            htmlplayers: selectedPlayers
        })

        this.executeTurn(this.playercycle.head)
     }




     executeTurn(player){
        let moveAmount = rollDice()
        let current = player.position
        for(let i=0; i < moveAmount; i ++){
            current = current.right
        }
        console.log(current)
        console.log(player.position)
        console.log(player.image)
        player.position = current

        

         this.setState(prev => {
             let newpositions = prev.positions
             newpositions[current.index] = <SPosition player={player.image}></SPosition>
            
            return {
                positions: newpositions,
                inputSnippet: <>
                                <div className="pick up disk?">Pick up disk?</div>
                                    <div onClick={() => this.handlePickup(player, "yes")} className="new-game">
                                        <div className="new-game-text">yes</div>
                                    </div>
                                    <div onClick={() => this.handlePickup(player, "no")} className="new-game">
                                        <div className="new-game-text">no</div>
                                    </div>
                                </>
            }
         })
     }

     handlePickup(player, selection){
        if(selection === "no"){
            this.executeTurn(player.nextPlayer)
        } else {

        }
     }

     


   

    render(){
        return(
            <div className="submarine-men">
            <div className="s-graphics">
                <div className="s-start-escape-area">
                <div className="s-player-pen">
                    {this.state.htmlplayers}
                </div>
                <SBoat></SBoat>
                </div>
             {this.state.positions}
            </div>
            <div className="s-player-input">
            {this.state.inputSnippet}
            </div>
            </div>
        )
    }
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }


//   <SPosition player={<img className="splayer" alt="oopsie" src={require("../player6.png")}></img>}></SPosition>,

// 0,0,1,1,2,2,3,3
// 4,4,5,5,6,6,7,7
// 8,8,9,9,10,10,11,11
// 12,12,13,13,14,14,15,15


class boardObj {
    constructor(node){
        this.head = node
    }

    attachSubmarine(){
        let submarine = new Position(0, 99)
        submarine.right = this.head
        this.head.left = submarine
    }

    assemble = (node) => {
            let current = this.head
            while(current.right){
                current = current.right
            }
            current.right = node
            node.left = current
    }

    displayBoard = () => {
        let current = this.head
        while(current){
            console.log(current)
            current = current.right
        }
    }
}


class Position {

    constructor(value, index){
        this.index = index
        this.value = value
        this.right = null
        this.left = null
        this.player = null
        this.empty = false
    }
}

class PlayerPool {
    constructor(count, position, imageArray){
        this.head = null
        this.tail = null
        for(let i = 0; i < count; i ++){
            this.assemble(new Player(position, imageArray[i]))
        }
    }

    assemble(node){
        if(this.head === null){
            this.head = node
            this.tail = node
            this.tail.nextPlayer = this.head
        } else {
            this.tail.nextPlayer = node
            node.nextPlayer = this.head
        }
    }


}

class Player {
    constructor(position, image){
        this.nextPlayer = null
        this.tokens = 0
        this.score = 0
        this.position = position
        this.escaped = false
        this.direction = "right"
        this.image = image
    }

}

function rollDice(){
    let dice1 = Math.ceil(Math.random() * 3)
    let dice2 = Math.ceil(Math.random() * 3)
    return dice1 + dice2
}
