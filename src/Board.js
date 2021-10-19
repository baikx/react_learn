import React from "react";
import Square from "./Square";
// 棋盘类
export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           squares: Array(3).fill(Array(3).fill(null))
        }
    }
    renderSquare(i) {
        const winnerClass = this.props.winnerRow
            && (this.props.winnerRow[0] === i
                || this.props.winnerRow[1] === i
                || this.props.winnerRow[2] === i)
                ? 'suqare-winner'
                : ''
      return(
        <Square
          key={i}
          winnerClass={winnerClass}
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
    render() {
      return (
        <div key="board">
            {
                this.state.squares.map((item, index) => {
                    return (
                        <div key={index} className="board-row" >
                            {item.map((sbuItem, step) => {
                                return this.renderSquare(index * 3 + step)
                            })}
                        </div>
                    )
                })
            }
        </div>
      );
    }
}
