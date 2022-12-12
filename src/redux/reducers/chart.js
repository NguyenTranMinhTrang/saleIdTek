import types from '../types';

const initialState = {
    values: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.CHART_DATE:
            const dataDate = action.payload;
            return { ...dataDate };

        case types.CHART_WEEK:
            const dataWeek = action.payload;
            return { ...dataWeek };

        case types.CHART_MONTH:
            const dataMonth = action.payload;
            return { ...dataMonth };
        default:
            return state;
    }
}
