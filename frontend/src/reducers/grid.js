const defaultState = {
    grid: [],
    playerPosition: { row: 7, col: 20 }
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
        default:
            return state;
    }
};

export default userAction;