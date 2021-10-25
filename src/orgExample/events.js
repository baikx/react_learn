import React from "react";
import ReactDOM from "react-dom";

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true, id: 0}
        this.handleClick = this.handleClick.bind(this);
    }

    /**
        * 此语法确保 handleClick 内的 this 已被绑定
        * 注意这是 试验性 语法
        * -------------------------
        handleClick = () => {
            console.log('this is', this);
        }
        * -------------------------
    */
    handleClick() {
        this.setState((prevState) => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <div>
                {/* <button onClick={() => this.handleClick()} */}
                <button onClick={this.handleClick}>
                    {this.state.isToggleOn ? "ON" : "OFF"}
                </button>

                <button onClick={(e) => this.deleteRow(this.state.id, e)}></button>
                <button onClick={this.deleteRow.bind(this, this.state.id)}></button>
            </div>
        )
    }
}

ReactDOM.render(
    <Toggle />,
    document.getElementById('root')
)

