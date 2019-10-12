import React from 'react';
import { connect } from 'react-redux';
import dresser from '../images/pokemon-red-sprite.svg';


const mapStateToProps = state => ({
    mouseDown: state.userAction.mouseDown,
    targetAction: state.userAction.targetAction,
    playerAction: state.userAction.playerAction,
    wallAction: state.userAction.wallAction,
    grid: state.grid.grid,
    playerPosition: state.grid.playerPosition,
    targetsPositions: state.grid.targetsPositions
});

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: '',
            imageType: ''
        }
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    displayTarget() {
        const pos = this.props.position;
        let targetsPositions = this.props.targetsPositions;
        for (let target of targetsPositions) {
            if (target.pos.row === pos.row && pos.col === target.pos.col) {
                console.log(`${target.img} ${JSON.stringify(target.pos)}`);
                this.setState({ img: target.img, imageType: 'pokemon' })
                break;
            }
            else if (pos.row === this.props.playerPosition.row && pos.col === this.props.playerPosition.col) {
                this.setState({ img: dresser, imageType: 'dresser' });
                break;
            } else {
                console.log(`${JSON.stringify(target.pos)}`);
                this.setState({ img: '' });
            }
        }
    }

    componentDidMount() {
        this.displayTarget();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(`${prevProps.targetsPositions.length} ${this.props.targetsPositions.length}`)
        if (prevProps.targetsPositions.length !== this.props.targetsPositions.length) {
            this.displayTarget();
        }
        if (JSON.stringify(prevProps.playerPosition) !== JSON.stringify(this.props.playerPosition)) {
            this.displayTarget();
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
                <img className={"image" + this.state.imageType} alt={this.state.img} src={this.state.img} />
            </div>
        )
    }
}
export default connect(mapStateToProps)(Cell);