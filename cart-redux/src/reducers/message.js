import * as types from '../constants/ActionType';
import * as Messages from '../constants/Message'

var initialState = Messages.MSG_WELCOME;

const message = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_MESSAGE:
            return action.message;
        default:
            return [...state];
    }
};

export default message;