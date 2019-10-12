import React from 'react';
import { connect } from 'react-redux';
import Cell from './Cell';

const mapStateToProps = state => ({
    grid: state.grid.grid,
    width: state.grid.width,
    height: state.grid.height,
    numPokemon: state.grid.numPokemon
});

const URL_POKEMON = 'http://pokedex-mti.twitchytv.live/species';
const URL_POKEMON_IMAGE = 'https://pokedex-mti.twitchytv.live/images/';


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

    getTargetsPositions() {
        return new Promise(resolve => {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            fetch(proxyurl + URL_POKEMON)
                .then(response => response.json())
                .then(pokemons => {
                    pokemons = pokemons.map(elt => elt.id);
                    const targets = [];
                    for (let i = 0; i < this.props.numPokemon; i++) {
                        const item = pokemons[Math.floor(Math.random() * pokemons.length)];
                        const col = Math.floor(Math.random() * this.props.width);
                        const row = Math.floor(Math.random() * this.props.height);
                        targets.push({ id: item, img: URL_POKEMON_IMAGE + item + '.png', pos: { row: row, col: col } });
                    }
                    this.props.dispatch({ type: 'USER_NEW_TARGETS_POSITIONS', targetsPositions: targets });
                    resolve(targets);
                });
        })
    }

    mouseDown() {
        this.props.dispatch({ type: 'USER_MOUSE_DOWN' });
    }

    mouseUp() {
        this.props.dispatch({ type: 'USER_MOUSE_UP' });
    }

    async componentDidMount() {
        await this.getTargetsPositions();
        const nodes = [];
        for (let row = 0; row < this.props.height; row++) {
            const currentRow = [];
            for (let col = 0; col < this.props.width; col++) {
                currentRow.push(<Cell key={JSON.stringify(col)} position={{ row: row, col: col }}></Cell>);
            }
            nodes.push(currentRow);
        }
        this.props.dispatch({ type: 'USER_GRID_ACTION', grid: nodes })
    }

    renderCells() {
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