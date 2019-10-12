import { put, takeEvery} from 'redux-saga/effects'

function *handleMouseDown(){
    yield put({type: "MOUSE_DOWN"});
}

function *handleMouseUp(){
    yield put({type: "MOUSE_UP"});
}

function *handleWallAction(){
    yield put({type: "WALL_ACTION"});
}

function *handleTargetAction(){
    yield put({type: "TARGET_ACTION"});
}

function *handlePlayerAction(){
    yield put({type: "PLAYER_ACTION"});
}

function *userActionSaga(){
    yield takeEvery('USER_MOUSE_DOWN', handleMouseDown);
    yield takeEvery('USER_MOUSE_UP', handleMouseUp);
    yield takeEvery('USER_WALL_ACTION', handleWallAction);
    yield takeEvery('USER_TARGET_ACTION', handleTargetAction);
    yield takeEvery('USER_PLAYER_ACTION', handlePlayerAction);
}

export default userActionSaga;