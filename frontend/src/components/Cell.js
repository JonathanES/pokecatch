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
    targetsPositions: state.grid.targetsPositions,
    path: state.grid.path,
    visitedNode: state.grid.visitedNode
});

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: '',
            imageType: '',
            divType: ''
        }
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    displayTarget() {
        const pos = this.props.position;
        let targetsPositions = this.props.targetsPositions;
        for (let target of targetsPositions) {
            if (target.pos.row === pos.row && pos.col === target.pos.col) {
                this.setState({ img: target.img, imageType: 'pokemon' })
                break;
            }
            else if (pos.row === this.props.playerPosition.row && pos.col === this.props.playerPosition.col) {
                this.setState({ img: dresser, imageType: 'dresser' });
                break;
            }
            else if (pos.row === this.props.visitedNode.row && pos.col === this.props.visitedNode.col) {
                console.log('visited')
                this.setState({ divType: ' visited' });
                break;
            }
            else {
                this.setState({ img: '' });
            }
        }
    }

    componentDidMount() {
        this.displayTarget();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.path.length !== this.props.path.length){
            const pos = this.props.position;
            console.log(pos);
            for (let cell of this.props.path){
                if (pos.row === cell.row && pos.col === cell.col){
                    this.setState({divType: ' path'});
                    break;
                }
            }
        }
        if (prevProps.targetsPositions.length !== this.props.targetsPositions.length) {
            this.displayTarget();
        }
        if (JSON.stringify(prevProps.playerPosition) !== JSON.stringify(this.props.playerPosition)) {
            this.displayTarget();
        }
        if (prevProps.visitedNode !== this.props.visitedNode) {
            console.log(`${JSON.stringify(prevProps.visitedNode)} ${JSON.stringify(this.props.visitedNode)}`)
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
            <div className={"cell" + this.state.divType} id={this.props.position} onClick={e => this.handleClick(e)} onMouseOver={e => this.handleMouseOver(e)}>
                <img className={"image" + this.state.imageType} alt={this.state.img} src={this.state.img} />
            </div>
        )
    }
}
export default connect(mapStateToProps)(Cell);