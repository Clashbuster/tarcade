import React from 'react';
import SPosition from  '../SubmarineMen/SPosition.js'
import SPlayer from  '../SubmarineMen/SPlayer.js'
import SBoat from  '../SubmarineMen/SBoat.js'





export default class SubmarineMen extends React.Component {


constructor(){
    super()
    this.playercycle = null
    this.gameBoard = null
    this.state = {
        air: 25,
        round: 1,
        playerStats: [],
        positions: [
            <SPosition key={1} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={2} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={3} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={4} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={5} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={6} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={7} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={8} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={9} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={10} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={11} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={12} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={13} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={14} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={15} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={16} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={17} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={18} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={19} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={20} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={21} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={22} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={23} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={24} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={25} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={26} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={27} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={28} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={29} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={30} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={31} player={""} emptyPosition={""} ></SPosition>,
            <SPosition key={32} player={""} emptyPosition={""} ></SPosition>
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

componentDidUpdate(){
    console.log(this.state)
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
            <img alt="oopsie" src={require("../player1.png")}></img>,
            <img alt="oopsie" src={require("../player2.png")}></img>,
            <img alt="oopsie" src={require("../player3.png")}></img>,
            <img alt="oopsie" src={require("../player4.png")}></img>,
            <img alt="oopsie" src={require("../player5.png")}></img>,
            <img alt="oopsie" src={require("../player6.png")}></img>,
        ]
        let selectedPlayers = []

        for(let i = 0; i < number; i ++){
            selectedPlayers.push(allPlayers[i])
        }
        
        this.playercycle = new PlayerPool(number, this.gameBoard.head.left, selectedPlayers)

        this.setState({
            playerStats: this.playercycle.renderArray()
        })

        this.askDirection(this.playercycle.head)
     }


     hardCopyArray(array){
         let newArray = []
         for(let i= 0; i < array.length; i ++){
             newArray.push(array[i])
         }
         return newArray
     }

     changeDirection(player){
            player.direction = "left"
            return this.executeTurn(player)
     }

     askDirection(player){
         
        if(player.position.index !== 99){
            if(player.direction === "right"){
                this.setState({
                    inputSnippet: <>
                                    <div className="pick up disk?">{player.index + 1} : Turn Around?</div>
                                        <div onClick={() => this.changeDirection(player)} className="new-game">
                                            <div className="new-game-text">yes</div>
                                        </div>
                                        <div onClick={() => this.executeTurn(player)} className="new-game">
                                            <div className="new-game-text">no</div>
                                        </div>
                                    </>
                }) 
            } else {
                return this.executeTurn(player)
            }
        } else {
            return this.executeTurn(player)
        }
     }

     makeMove(player){
        if(player.direction === "right"){
            if(player.position.right === null){
                player.direction = "left"
                return this.makeMove(player)
            } else {
                player.position = player.position.right
                return player.position
            }
        } else {
            if(player.position.left === null){
                //This is the point where the player escapes and logic needs to be written to remove them from the playercycle.
                
                return player.position
            } else {
                player.position = player.position.left
                return player.position
            }
        }
     }

     executeWinnerStatement(){
        this.playercycle.resetPlayers(this.gameBoard.head.left)
        this.playercycle.updateAllStatsRenderWithScore()
         let winner = this.playercycle.identifyWinner()
         this.setState({
             inputSnippet: winner.statRender,
             playerStats: this.playercycle.renderArray()
         })
     }

     executeRoundCleanup(player){
         this.playercycle.resetPlayers(this.gameBoard.head.left)
         this.gameBoard.removeEmptyPositions()
         this.playercycle.updateAllStatsRenderWithScore()

         if(this.state.round > 2){
            return this.executeWinnerStatement()
        }
         this.setState(prev => {
            let newpositions = this.gameBoard.generateRenderArray()
            let newRound = prev.round += 1
             return {
                playerStats: this.playercycle.renderArray(),
                 positions : newpositions,
                    round: newRound
                }
         })
         return this.askDirection(player.nextPlayer)
     }


     executeTurn(player){

        if(player.escaped === true){
            console.log(`player ${player.index} has escaped`)
            return this.askDirection(player.nextPlayer)
        }

        this.setState(prev => {
            let newAir = prev.air
            newAir -= player.tokens
            if(newAir < 0){
                newAir = 0
            }

            return {
                air: newAir
            }
        })

        let moveAmount = rollDice()
        moveAmount -= player.tokens

        console.log(`${player.index} moving ${moveAmount} spaces`)

        let current = player.position

            current.player = null
     
            this.playercycle.dissassembleAllOtherPlayers(player)
          
            if(moveAmount > 0){
                for(let i=0; i < moveAmount; i++){
                    current = this.makeMove(player)
                }
            }

            current.player = player
            
            if(current.index === 99){
                if(player.direction === "left"){
                    player.escaped = true
                    player.updateStatRender()
                    this.setState({
                        playerStats: this.playercycle.renderArray()
                    })
                }
            }

            this.playercycle.reassembleAllOtherPlayers()

            if(this.playercycle.checkAllEscaped() === true){
                this.setState({
                    air: 25
                }, ()=> {
                   return this.executeRoundCleanup(player)
                })
            }


            this.setState(prev => {
 
                let newpositions = this.gameBoard.generateRenderArray()
   
                
               return {
                   positions: newpositions,
                   inputSnippet: <>
                                   <div className="pick up disk?"> Player {player.index + 1} : Pick up disk?</div>
                                       <div onClick={() => this.handlePickup(player, "yes")} className="new-game">
                                           <div className="new-game-text">yes</div>
                                       </div>
                                       <div onClick={() => this.handlePickup(player, "no")} className="new-game">
                                           <div className="new-game-text">no</div>
                                       </div>
                                       <div onClick={() => this.handleDrop(player)} className="new-game">
                                           <div className="new-game-text">drop</div>
                                       </div>
                                   </>
               }
            })
       

        
         if(this.state.air <= 0){
             this.setState({
                 air: 25
             }, ()=> {
                return this.executeRoundCleanup(player)
             })
         }
     }

     handleDrop(player){
         if(player.position.index !== 99){
            if(player.position.empty === true){
                let current = player.position
                current.value = player.score
                player.tokens = 0
                player.score = 0
                current.empty = false
                this.setState({
                    positions: this.gameBoard.generateRenderArray()
                })
                return this.askDirection(player.nextPlayer)
            }
         } else {
            return this.askDirection(player.nextPlayer)
         }
     }

     handlePickup(player, selection){
            if(selection === "no"){
                this.askDirection(player.nextPlayer)
            } else if(player.position.index !== 99){
                if(player.position.empty === false){
                    player.tokens += 1
                    player.score += player.position.value
                    player.position.empty = true
                    player.updateStatRender()
                    this.setState({
                        playerStats: this.playercycle.renderArray(),
                        positions: this.gameBoard.generateRenderArray()
                    })
                    
                    this.askDirection(player.nextPlayer)
                } else {
                    this.askDirection(player.nextPlayer) 
                }
            } else {
                this.askDirection(player.nextPlayer)
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
                <div className="s-air-countdown"> Round : {this.state.round} Air : {this.state.air}</div>
            {this.state.inputSnippet}
            </div>
            <div className="s-player-statistics">
                {this.state.playerStats}
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

    generateRenderArray(){
        let output = []
        let current = this.head
        while(current !== null){
            if(current.player !== null){
                if(current.empty === true){
                    output.push(<SPosition player={current.player.image} emptyPosition={true}></SPosition>)
                } else {
                    output.push(<SPosition player={current.player.image} emptyPosition={false}></SPosition>)
                }
            } else {
                if(current.empty === true){
                    output.push(<SPosition player={""} emptyPosition={true}></SPosition>)
                } else {
                    output.push(<SPosition player={""} emptyPosition={false}></SPosition>)
                }
            }
            current = current.right
        }
        return output
    }

    removeEmptyPositions(){
        let submarine = this.head.left
      
        let current = this.head
        while(current !== null){
            if(current.empty === true){
                let prev = current.left
                let next = current.right
                prev.right = next
                next.left = prev
            }
            current.player = null
            current = current.right
        }
        this.head = submarine.right
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
        this.assemblyStack = []
        this.head = null
        this.tail = null
        for(let i = 0; i < count; i++){
            this.assemble(new Player(position, imageArray[i], i))
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
            this.tail = node
        }
    }

    identifyWinner(){
        let current = this.head.nextPlayer
        let output = this.head.nextPlayer

            while(current !== this.head){
                if(current.totalScore > output.totalScore){
                    output = current
                }
                current = current.nextPlayer
            }
            if(current.totalScore > output.totalScore){
                output = current
            }
        return output
    }

    dissassembleAllOtherPlayers(player){
        console.log('hello from dissassembler')
        this.assemblyStack = []
        let current = player.nextPlayer
        while(current !== player){
            console.log('hello from dissassembler loop')
            if(current.position.index !== 99){
                if(current.position.right !== null){
                    let prev = current.position.left
                    let next = current.position.right
                    prev.right = next
                    next.left = prev
                    this.assemblyStack.unshift(current.position)
                    current = current.nextPlayer

                } else {
                    let prev = current.position.left
                    prev.right = null
                    this.assemblyStack.unshift(current.position)
                    current = current.nextPlayer
                }
            } else {
                current = current.nextPlayer
            }
        }
    }

    reassembleAllOtherPlayers(){
        console.log('hello from reassembler')
        for(let i = 0; i < this.assemblyStack.length; i ++){
            let current = this.assemblyStack[i]
            let prev = current.left
            let next = current.right
            prev.right = current
            next.left = current
        }
    }


    checkAllEscaped(){
        let answer = true
        let current = this.head.nextPlayer
       
        while(current !== this.head){
            if(current.escaped === false){
                answer = false
            }
            current = current.nextPlayer
        }
        if(this.head.escaped === false){
            answer = false
        }
        return answer
    }

    updateAllStatsRenderWithScore(){
        let current = this.head.nextPlayer
        while(current !== this.head){
            current.updateStatsWithScoreRender()
            current = current.nextPlayer
        }
        this.head.updateStatsWithScoreRender()
    }

    resetPlayers(submarine){
        let current = this.head.nextPlayer

        while(current !== this.head){
            if(current.escaped === true){
                current.totalScore += current.score
            }
            current.score = 0
            current.escaped = false
            current.tokens = 0
            current.position = submarine
            current.direction = "right"
            current = current.nextPlayer
        }
            if(current.escaped === true){
                current.totalScore += current.score
            }
            current.score = 0
            current = this.head
            current.escaped = false
            current.tokens = 0
            current.position = submarine
            current.direction = "right"
    }

    renderArray(){
        let outputArray = []
        let current = this.head.nextPlayer
        while(current !== this.head){
            outputArray.push(current.statRender)
            current = current.nextPlayer
        }
        outputArray.unshift(this.head.statRender)
        return outputArray
    }
  
}

class Player {
    constructor(position, image, index){
        this.index = index
        this.nextPlayer = null
        this.tokens = 0
        this.score = 0
        this.totalScore = 0
        this.position = position
        this.escaped = false
        this.direction = "right"
        this.image = image
        this.statRender = <SPlayer playerNumber={this.index + 1} tokens={this.tokens} escaped={this.escaped} ></SPlayer>
    }

    updateStatRender(){
        this.statRender = <SPlayer playerNumber={this.index + 1} score={this.totalScore} tokens={this.tokens} escaped={this.escaped} ></SPlayer>
    }

    updateStatsWithScoreRender(){
        this.statRender = <SPlayer playerNumber={this.index + 1} score={this.totalScore} tokens={this.tokens} escaped={this.escaped} ></SPlayer>

    }

}

function rollDice(){
    let dice1 = Math.ceil(Math.random() * 3)
    let dice2 = Math.ceil(Math.random() * 3)
    return dice1 + dice2
}
