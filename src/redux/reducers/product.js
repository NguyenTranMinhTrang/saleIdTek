import types from '../types';

const initialState = {
    products: [],
    inputs: [],
    outputs: [],
    users: [],
    inputDetail: [],
    filter: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_PRODUCT:
            const data = action.payload;
            return {
                ...data,
            };

        case types.EDIT_PRODUCT:
            const dateUpdate = action.payload;
            return {
                ...state,
                ...dateUpdate,
            };

        case types.FILTER:
            const newFilter = action.payload;
            return {
                ...state,
                ...newFilter,
            };

        case types.DELETE_PRODUCT:
            const deleteProduct = action.payload;
            return {
                ...state,
                ...deleteProduct,
            };

        default:
            return { ...state };
    }
};