import React from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

const MAX_IDX_POKEMON = 151;
const URL_POKEMON = 'https://pokedex-mti.twitchytv.live/images/';
const mapStateToProps = state => ({
});


class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemons: []
        }
        this.handleTarget = this.handleTarget.bind(this);
        this.handleWall = this.handleWall.bind(this);
        this.handlePlayer = this.handlePlayer.bind(this);
    }

    handlePlayer(){
        this.props.dispatch({type: 'USER_PLAYER_ACTION'});
    }

    handleTarget(){
        this.props.dispatch({type: 'USER_TARGET_ACTION'});
    }

    handleWall(){
        this.props.dispatch({type: 'USER_WALL_ACTION'});
    }

    componentDidMount() {
        const res = [];
        for (let i = 1; i <= MAX_IDX_POKEMON; i++) {
            res.push({id: i, img: URL_POKEMON + i + '.png'});
        }
        this.setState({ pokemons: res });
    }
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#" >Pokecatch</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Button variant="light" onClick={() => this.handlePlayer()}>Player</Button>
                    <Button variant="light" onClick={() => this.handleTarget()}>Target</Button>
                    <Button variant="light" onClick={() => this.handleWall()}>Wall</Button>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Dropdown Button
                                  </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {this.state.pokemons.map(pokemon => (
                                    <Dropdown.Item key={pokemon.id} href={"#/action-" + pokemon.img}> <img alt={pokemon.img} id="pokemon" src={pokemon.img} /></Dropdown.Item>

                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}


export default connect(mapStateToProps)(Menu);
