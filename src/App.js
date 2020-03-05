import React, { Component } from "react"
import "./index.css"


function Square(props) {
  return (
    <button className="square hover-button r-back" onClick={props.onClick}>
        {!props.winner ?
        <React.Fragment>
          {props.value?
          props.value
          :
          <React.Fragment>
          <span className='hover-button--off'>{""}</span>
          <span>{props.xIsNext ? <div className='hover-button--on'>X</div> : <div className='hover-button--on2'>O</div>}</span>
          </React.Fragment>}
        </React.Fragment>
        :
         <div>{props.value}</div>}
    </button>
   
  );
}
 
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        xIsNext={this.props.xIsNext}
        onClick={() => this.props.onClick(i)}
        winner={this.props.winner}
        backClick={this.props.backClick}
       
      />
    );
  }
 

  render() {
    return (
      <div className="r-back">
        <div className="board-row r-back">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
        </div>
        <div className="board-row r-back">
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
        </div>
        <div className="board-row r-back">
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
        </div>
        <div className="board-row r-back">
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
        </div>
        <div className="board-row r-back">
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
        </div>
      </div>
    );
  }
}
 
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(24).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      backClick: 0
    };
  }
 
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    {this.state.backClick=1? this.state.backClick=0 : <div></div>};
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
 
    squares[i] =this.state.xIsNext ? <div className="red r-back">X</div> : <div className="purple r-back">O</div>;
    
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }
 
  jumpTo(stepNumber) {
   let prevStep = stepNumber - 1;
    if (prevStep < 0) { return; }
 
    this.setState({
      stepNumber: prevStep,
      xIsNext: (prevStep % 2) === 0
    });
  }
 
  addBackClick(){
    this.state.backClick++
  }
  subBackClick(){
    this.state.backClick--
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const { xIsNext, stepNumber, backClick} = this.state;
 
    let back;
   if(stepNumber === 0) {
     back=<button className="clearButton r-back"></button>;
   }else {
   back = <button className='button r-back' onClick={() =>{this.jumpTo(stepNumber);this.addBackClick();}}>Back</button>;
    }

    let forward;
    if(backClick>0) {
      forward =
      <button className='button r-back' onClick={() => {this.jumpTo(stepNumber+2);this.subBackClick();}}>
      Forward
      </button>;
    
    }else {
       forward=<button className="clearButton r-back"></button>;
    }
 
    let status;
    if (winner) {
      var restart= 
      <React.Fragment>
      <button className='button r-back' onClick={() =>this.jumpTo(stepNumber-stepNumber+1)}>Restart</button>
      <div className='text r-back'>
        <span className="r-back">Y</span>
        <span className="r-back">E</span>
        <span className="r-back">E</span>
        <span className="r-back">E</span>
        <span className="r-back">E</span>
        <span className="r-back">E</span>
        <span className="r-back">E</span>
        <span className="r-back">T</span>
        <span className="r-back">!</span>
      </div>
      </React.Fragment>;
      status = "Winner: " + winner;
    } else {
      status = "Next player:  " + (xIsNext ? "X" : "O");
      var restart= <button className="clearButton r-back"></button>;
    }
 
    return (
      <div className="game r-back">
        <div className="game-board r-back">
          <Board
            squares={current.squares}
            xIsNext={xIsNext}
            onClick={i => this.handleClick(i)}
            winner={winner}
            backClick={backClick}
          />
        </div>
        <div className="game-info r-back">
          <div>{status}</div>
          <div>{back}</div>
          <div>{forward}</div>
          <div>{restart}</div>
        </div>
      </div>
    );
  }
}
 
function calculateWinner(squares) {
  const lines = [
    [0,1,2,3],
    [1,2,3,4],
    [5,6,7,8],
    [6,7,8,9],
    [1,7,13,19],
    [0,6,12,18],
    [0,5,10,15],
    [2,7,12,17],
    [1,6,11,16],
    [3,8,13,18],
    [4,9,14,19],
    [3,7,11,15],
    [4,8,12,16],
    [8,12,16,20],
    [5,10,15,20],
    [6,12,18,24],
    [5,11,17,23],
    [6,11,16,21],
    [7,12,17,22],
    [8,13,18,23],
    [9,14,19,24],
    [9,13,17,21],
    [10,11,12,13],
    [11,12,13,14],
    [15,16,17,18],
    [16,17,18,19],
    [20,21,22,23],
    [21,22,23,24],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (squares[a]
    && JSON.stringify(squares[a]) === JSON.stringify(squares[b])
    && JSON.stringify(squares[a]) === JSON.stringify(squares[c])
    && JSON.stringify(squares[a]) === JSON.stringify(squares[d])) {
      return squares[a].props.children;
    }
  }
  return null;
}







var go = false;

document.body.className = "r-back";

function test() {
  if(go){
    var randomBackgrounds = document.getElementsByClassName("r-back");
    for(var i = 0; i < randomBackgrounds.length; i++){
      var curr = randomBackgrounds[i];
      curr.style.backgroundColor = "rgb("+ getRand() + "," + getRand() + "," + getRand() + "," + 1 + ")";
      curr.style.color = "rgb("+ getRand() + "," + getRand() + "," + getRand() + ")";
      curr.style.borderColor = "rgb("+ getRand() + "," + getRand() + "," + getRand() + ")";
    }
  }
  setTimeout(callIt, 20);
}

function getRand(){
	return Math.floor(Math.random() * 256);
}

function callIt(){
 requestAnimationFrame(test)
}

test();

document.onkeypress = (e) => {
  if(e.code === "Space"){
    go = !go;
  }
}

export default Game
