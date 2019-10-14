const defaultState = {
    width: 50,
    height: 15,
    numPokemon: 10,
    targetsPositions: [],
    grid: [],
    playerPosition: { row: 7, col: 20 },
    path: [],
    visitedNodes: [],
    visitedNode: {}
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
        case "NEW_TARGETS_POSITIONS":
            return {
                ...state,
                targetsPositions: action.targetsPositions
            }
        case "DJIKSTRA_RESULT":
            return {
                ...state,
                path: action.path,
                visitedNodes: action.visitedNodes
            }
            case 'VISITED_CELL':
                return {
                    ...state,
                    visitedNode: action.pos
                }
        default:
            return state;
    }
};

export default userAction;