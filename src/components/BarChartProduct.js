import React from 'react';
import { StyleSheet, processColor } from 'react-native';
import { BarChart } from 'react-native-charts-wrapper';
import { useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';
import update from 'immutability-helper';
import { useSelector } from 'react-redux';
import { COLORS } from '../constants';

const BarChartProduct = () => {
    const filterOriginal = useSelector((state) => state.product.filterOriginal);

    const [legend, setLegend] = React.useState({
        enabled: true,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 5,
        yEntrySpace: 10,
        formToTextSpace: 5,
        wordWrapEnabled: false,
        maxSizePercent: 0.5,
        textColor: processColor(COLORS.white),
    });

    const [data, setData] = React.useState({
        dataSets: [
            {
                values: [],
                label: 'Số Lượng',
                config: {
                    color: processColor(COLORS.lightGreen),
                    barShadowColor: processColor('lightgrey'),
                    highlightAlpha: 90,
                    highlightColor: processColor('red'),
                },
            },
        ],
        config: {
            barWidth: 0.7,
        },
    });

    const [highlights, setHighlights] = React.useState([]);

    const [xAxis, setXAxis] = React.useState({
        valueFormatter: [],
        granularityEnabled: true,
        granularity: 1,
        textColor: processColor('white'),
        textSize: 14,
        position: 'BOTTOM',
        labelRotationAngle: 90,
    });

    useFocusEffect(
        React.useCallback(() => {
            const xLable = [];
            const yLable = _.map(filterOriginal, (product) => {
                xLable.push(product.name);
                return { y: product.amount };
            });

            setData(
                update(data, {
                    $set: {
                        dataSets: [{
                            ...data.dataSets[0],
                            values: yLable,
                        }],
                    },
                })
            );

            setXAxis(
                update(xAxis, {
                    $set: {
                        valueFormatter: xLable,
                    },
                })
            );

        }, [filterOriginal])
    );

    return (
        <BarChart
            style={styles.chart}
            data={data}
            xAxis={xAxis}
            animation={{ durationX: 2000 }}
            legend={legend}
            gridBackgroundColor={processColor('#ffffff')}
            visibleRange={{ x: { min: 5, max: 5 } }}
            drawBarShadow={false}
            drawValueAboveBar={true}
            drawHighlightArrow={false}
            highlights={highlights}
            marker={{
                enabled: true,
                markerColor: processColor(COLORS.primary),
                textColor: processColor('white'),
                markerFontSize: 16,
            }}
            yAxis={{
                left: {
                    textColor: processColor('white'),
                    textSize: 14,
                    granularityEnabled: true,
                    granularity: 1,
                },
                right: {
                    enabled: false,
                },
            }}
        />
    );
};

const styles = StyleSheet.create({
    chart: {
        flex: 1,
    },
});

export default BarChartProduct;
