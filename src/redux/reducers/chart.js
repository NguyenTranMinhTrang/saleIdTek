import types from '../types';
import { processColor } from 'react-native';
const COLOR_PURPLE = processColor('#697dfb');

const initialState = {
    data: {
        dataSets: [
            {
                values: [],
                label: '',
                config: {
                    lineWidth: 1.5,
                    drawCircles: true,
                    drawCubicIntensity: 0.5,
                    drawCubic: false,
                    drawHighlightIndicators: false,
                    color: COLOR_PURPLE,
                    drawFilled: true,
                    fillColor: COLOR_PURPLE,
                    fillAlpha: 90,
                },
            },
        ],
    },
    xAis: {
        valueFormatter: [],
        textColor: processColor('red'),
        textSize: 16,
        gridColor: processColor('red'),
        gridLineWidth: 1,
        axisLineColor: processColor('darkgray'),
        axisLineWidth: 1.5,
        gridDashedLine: {
            lineLength: 5,
            spaceLength: 5,
        },
        avoidFirstLastClipping: false,
        position: 'BOTTOM',
    },
    yAxis: {
        left: {
            drawGridLines: true,
            limitLines: [{
                limit: 112.4,
                lineColor: processColor('red'),
                lineDashPhase: 2,
                lineDashLengths: [10, 20],
            }, {
                limit: 89.47,
                lineColor: processColor('red'),
                lineDashPhase: 2,
                lineDashLengths: [10, 20],
            }],
        },
        right: {
            drawGridLines: true,
        },
    },
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.CHART_DATE:
            const dataDate = action.payload;
            let newState = { ...state };
            console.log("reducer: ", dataDate.label);
            newState.data.dataSets[0].values = dataDate.values;
            newState.data.xAis.valueFormatter = [...dataDate.label];
            return { ...newState };

        case types.CHART_WEEK:
            const dataWeek = action.payload;
            state.data.dataSets[0].values = dataWeek.values;
            return { ...state };

        case types.CHART_MONTH:
            const dataMonth = action.payload;
            state.data.dataSets[0].values = dataMonth.values;
            return { ...state };
        default:
            return state;
    }
}
