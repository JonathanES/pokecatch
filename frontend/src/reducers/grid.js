const defaultState = {
    width: 50,
    height: 15,
    numPokemon: 10,
    targetsPositions: [],
    grid: [],
    playerPosition: { row: 7, col: 20 },
};

const userAction = (state = defaultState, action) => {
    switch (action.type) {
        case 'GRID_ACTION':
            return {
                ...state,
                grid: action.grid
            };
        case "NEW_PLAYER_POSITION":
            return {
                ...state,
                playerPosition: action.playerPosition
            }
        case "NEW_TARGETS_POSITIONS":{
            return {
                ...state,
                targetsPositions: action.targetsPositions
            }
        }
        default:
            return state;
    }
};

export default userAction;