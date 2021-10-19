import React from "react";

import Board from "./Board";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {winner: squares[a], winnerRow: lines[i]};
    }
  }
  return {winner: null, winnerRow: null};
}

function getLocation(i) {

  const locationMap = {
    0: 'row: 1, col: 1',
    1: 'row: 1, col: 2',
    2: 'row: 1, col: 3',
    3: 'row: 2, col: 1',
    4: 'row: 2, col: 2',
    5: 'row: 2, col: 3',
    6: 'row: 3, col: 1',
    7: 'row: 3, col: 2',
    8: 'row: 3, col: 3'
  }
  return locationMap[i]
}

// 游戏类
export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initalGame()
  }

  initalGame() {
    return {
      history: [{
        squares: Array(9).fill(null),
        currentLoaction: 0
      }],
      xIsNext: true,
      stepNumber: 0
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{
        squares: squares,
        currentLoaction: getLocation(i),
        currentStep: history.length
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }
  restart() {
    this.setState(this.initalGame())
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  sortMoves() {
    this.setState(state => ({
      history: [...state.history.reverse()]
    }));
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const {winner, winnerRow} = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const classButton = move === this.state.stepNumber ? 'button--green' : '';
      const desc = step.currentStep
          ? 'Go to move #' + step.currentStep + ' ' + step.currentLoaction
          : 'Go to game start';
      return (
          <li key={move}>
            <button
              className={`${classButton} button`}
              onClick={() => this.jumpTo(move)}
            >
                {desc}
            </button>
          </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner
    } else if(history.length === 10){
      status = 'Draw. No one won.'
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            winnerRow={winnerRow}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.sortMoves()}>Sort moves</button>
          <button onClick={() => this.restart()}>New game</button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
  