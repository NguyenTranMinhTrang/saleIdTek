import types from '../types';

const initialState = {
    products: [],
    inputs: [],
    outputs: [],
    users: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_PRODUCT:
            const data = action.payload;
            return {
                ...data,
            };

        default:
            return { ...state };
    }
};