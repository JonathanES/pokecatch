import React from 'react';
import { connect } from 'react-redux';
import dresser from '../images/pokemon-red-sprite.svg';
import pokeball from '../images/pokeball.svg';


const mapStateToProps = state => ({
    mouseDown: state.userAction.mouseDown,
    targetAction: state.userAction.targetAction,
    playerAction: state.userAction.playerAction,
    wallAction: state.userAction.wallAction,
    grid: state.grid.grid,
    playerPosition: state.grid.playerPosition
});

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: ''
        }
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const pos = this.props.position;
        if (pos.row === this.props.playerPosition.row && pos.col === this.props.playerPosition.col) {
            this.setState({ img: dresser });
        }
        else {
            this.setState({ img: '' });
        }
        console.log(this.props.position)
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.playerPosition) != JSON.stringify(this.props.playerPosition)) {
            const pos = this.props.position;
            if (pos.row === this.props.playerPosition.row && pos.col === this.props.playerPosition.col) {
                this.setState({ img: dresser });
            }
            else {
                this.setState({ img: '' });
            }
        }
    }

    handleClick(e) {
        if (this.props.targetAction) {

        }
        else if (this.props.wallAction) {
            if (e.target.className.includes('selected')) {
                e.target.className = e.target.className.replace('selected', '')
            }
            else
                e.target.className += ' selected';
        }
        else if (this.props.playerAction) {
            const pos = this.props.position;
            this.props.dispatch({ type: 'USER_NEW_PLAYER_POSITION', playerPosition: pos })
            this.setState({ img: dresser });
        }
    }

    handleMouseOver(e) {
        if (this.props.mouseDown && this.props.wallAction) {
            if (e.target.className.includes('selected')) {
                e.target.className = e.target.className.replace('selected', '')
            }
            else
                e.target.className += ' selected';
        }
    }
    render() {
        return (
            <div className="cell" id={this.props.position} onClick={e => this.handleClick(e)} onMouseOver={e => this.handleMouseOver(e)}>
                <img class="image" src={this.state.img} />
            </div>
        )
    }
}
export default connect(mapStateToProps)(Cell);