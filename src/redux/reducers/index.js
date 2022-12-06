import { combineReducers } from 'redux';

import product from './product';

import types from '../types';

const appReducer = combineReducers({
    product,
});

const rootReducer = (state, action) => {
    if (action.type === types.CLEAR_REDUX_STATE) {
        state.product = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
