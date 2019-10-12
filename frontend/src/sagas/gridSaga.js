import { put, takeEvery} from 'redux-saga/effects'

function *handleGrid(action){
    yield put({type: "GRID_ACTION", grid: action.grid});
}

function *handlePlayerPosition(action){
    yield put({type: "NEW_PLAYER_POSITION", playerPosition: action.playerPosition});
}

function *handleTargetsPositions(action){
    yield put({type: "NEW_TARGETS_POSITIONS", targetsPositions: action.targetsPositions});
}


function *gridSaga(){
    yield takeEvery('USER_GRID_ACTION', handleGrid);
    yield takeEvery('USER_NEW_PLAYER_POSITION',handlePlayerPosition);
    yield takeEvery('USER_NEW_TARGETS_POSITIONS',handleTargetsPositions);
}

export default gridSaga;