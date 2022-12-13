import React from "react";
import { View, StyleSheet, processColor, Text } from "react-native";
import { LineChart } from 'react-native-charts-wrapper';
import { useSelector } from "react-redux";
import { COLORS, FONTS } from "../constants";

const Chart = () => {
    const values = useSelector((state) => state.chart);
    console.log(values);
    return (
        <>
            {
                values.data.dataSets[0].values.length !== 0 ?
                    <LineChart
                        style={styles.chart}
                        data={values?.data}
                        chartDescription={{ text: '' }}
                        xAxis={values?.xAxis}
                        yAxis={values?.yAxis}
                        legend={{ enabled: false }}
                        onChange={(event) => console.log(event.nativeEvent)}
                    />

                    :
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>No data available for chart</Text>
            }
        </>
    );
};

const styles = StyleSheet.create({
    chart: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
});

export default Chart;
