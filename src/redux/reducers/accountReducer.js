import constants from '../constants';

var initialState = {
    user: {
    }
};

export default (state = initialState, action ) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case constants.USER_RECIEVED:
            // console.log(action);
            newState.user = action.data;
            return newState;
        default:
            return state;
    }
};
