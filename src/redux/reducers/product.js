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

        case types.ADD_PRODUCT:
            const addProduct = action.payload;
            return {
                ...state,
                ...addProduct,
            };

        case types.ADD_INPUT:
            const inputList = action.payload;
            return {
                ...state,
                ...inputList,
            };

        case types.UPDATE_INPUT_DETAILS:
            const newDetail = action.payload;
            return {
                ...state,
                ...newDetail,
            };

        default:
            return { ...state };
    }
};