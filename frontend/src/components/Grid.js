import React from 'react';
import { connect } from 'react-redux';
import Cell from './Cell';

const mapStateToProps = state => ({
    grid: state.grid.grid
});


class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            isMouseDown: false
        }
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.renderCells = this.renderCells.bind(this);
    }

    mouseDown(){
        this.props.dispatch({type: 'USER_MOUSE_DOWN'});
    }

    mouseUp(){
        this.props.dispatch({type: 'USER_MOUSE_UP'});
    }

    componentDidMount() {
        const nodes = [];
        for (let row = 0; row < 15; row++) {
            const currentRow = [];
            for (let col = 0; col < 50; col++) {
                currentRow.push(<Cell key={JSON.stringify(col)} position={{ row: row, col: col }}></Cell>);
            }
            nodes.push(currentRow);
        }
        this.props.dispatch({type: 'USER_GRID_ACTION', grid: nodes})
    }

    renderCells(){
        return <div>{this.props.grid}</div>
    }

    render() {
        return (
            <div id="grid" onMouseDownCapture={() => this.mouseDown()} onMouseUp={() => this.mouseUp()}>
                {this.renderCells()}
            </div>

        )
    }
}


export default connect(mapStateToProps)(Grid);