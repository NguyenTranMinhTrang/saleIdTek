import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants';
import { BarChartProduct } from '../components';

const Store = () => {
    return (
        <View style={styles.container}>
            <View style={styles.containHeader}>
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>Số Lượng Hàng Tồn Kho</Text>
            </View>

            <View style={styles.containerMainView}>
                <BarChartProduct />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        paddingVertical: SIZES.padding,
    },
    containHeader: {
        alignItems: 'center',
        marginBottom: SIZES.padding
    },
    containerMainView: {
        height: 500,
        justifyContent: 'center',
    },

});

export default Store;
