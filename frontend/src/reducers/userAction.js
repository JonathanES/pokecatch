const defaultState = {
    mouseDown: false,
    wallAction: false,
    targetAction: false,
    playerAction: false
};

const userAction = (state = defaultState, action) => {
    switch (action.type) {
        case 'PLAYER_ACTION':
            return {
                ...state,
                playerAction: !state.playerAction,
                wallAction: false,
                targetAction: false
            };
        case 'WALL_ACTION':
            return {
                ...state,
                playerAction: false,
                wallAction: !state.wallAction,
                targetAction: false
            };
        case 'TARGET_ACTION':
            return {
                ...state,
                playerAction: false,
                wallAction: false,
                targetAction: !state.targetAction
            };
        case 'MOUSE_DOWN':
            return {
                ...state,
                mouseDown: true
            };
        case 'MOUSE_UP':
            return {
                ...state,
                mouseDown: false
            }
        default:
            return state;
    }
};

export default userAction;