import React from 'react';
import ReactDOM from 'react-dom';

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', selectValue: 'coconut'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleSelect(event) {
        this.setState({
            selectValue: event.target.value
        });
    }

    handleSubmit(event) {
        alert('提交的名字', event.target.value);
        event.preventDefault();
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    名字：
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <label>
                    {/* 多选 multiple={true} value={['coconut', 'grapefurit']}*/}
                    <select value={this.state.selectValue} onChange={this.handleSelect}>
                        <option value="grapefurit">葡萄柚</option>
                        <option value="lime">酸橙</option>
                        <option value="coconut">椰子</option>
                        <option value="mango">芒果</option>
                    </select>
                </label>
                <input type="submit" value="提交"/>
            </form>
        );
    }
}

class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        alert(
            `Select file - ${this.fileInput.current.files[0].name}`
        )
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Upload file:
                    <input type="file" ref={this.fileInput} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

ReactDOM.render(
    <FileInput />,
    document.getElementById('root')
);

class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form>
                <label>
                    参与：
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.setState.isGoing}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    来宾人数：
                    <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange} />
                </label>
            </form>
        );
    }
}