import * as React from "react";
import * as ReactDOM from "react-dom";

export class Timer extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }
    render() {
        return <div onClick={(event) => { this.setState({count: this.state.count + 1 }); }}>Click {this.state.count}</div>;
    }
}
    