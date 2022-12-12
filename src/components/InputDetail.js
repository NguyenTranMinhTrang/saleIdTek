import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SIZES, COLORS, FONTS } from '../constants';

const InputDetail = ({ index, remove, insert, detail, setShow, setIndex }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                setShow(true);
                setIndex(index);
            }}

        >
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>{index + 1}.</Text>
            <View
                style={styles.containerText}
            >
                {
                    detail.item.name &&
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>{detail.item.name} - {detail.amount} - {detail.priceInput}</Text>
                }
            </View>

            <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => {
                    setShow(true);
                    setIndex(index + 1);
                    insert(index + 1, { item: '', amount: 0, priceInput: 0 });
                }}
            >
                <Text style={{ ...FONTS.h3, color: COLORS.white }}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonRemove}
                onPress={() => remove(index)}
            >
                <Text style={{ ...FONTS.h3, color: COLORS.white }}>-</Text>
            </TouchableOpacity>


        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    containerText: {
        marginLeft: SIZES.base,
        flex: 0.9,
        borderRadius: SIZES.radius,
        height: 55,
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonAdd: {
        borderRadius: SIZES.radius,
        padding: SIZES.base * 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.green,
        marginHorizontal: SIZES.base,
        width: 55,
    },
    buttonRemove: {
        borderRadius: SIZES.radius,
        padding: SIZES.base * 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.red,
        width: 55,
    },
});

export default InputDetail;
