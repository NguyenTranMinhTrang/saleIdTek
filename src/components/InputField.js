import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { SIZES, COLORS, FONTS } from '../constants';

const InputField = ({ field, title, meta, style, textColor }) => {
    const { error, touched } = meta;
    return (
        <View
            style={[{
                marginVertical: SIZES.base,
            }, style]}
        >
            <View
                style={styles.container}
            >
                <Text style={[{ ...FONTS.h3, color: COLORS.white }, textColor]}>{title}</Text>
                <TextInput
                    numberOfLines={4}
                    style={styles.textInput}
                    value={`${field.value}`}
                    onChangeText={(text) => field.onChange(field.name)(text)}
                    onBlur={field.onBlur(field.name)}
                />
            </View>
            {
                error && touched &&
                <Text style={styles.error}>{error}</Text>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        marginLeft: SIZES.base,
        flex: 1,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray,
        color: COLORS.white,
        height: 70,
        textAlignVertical: 'center',
        padding: SIZES.base * 2,
        ...FONTS.h3,
    },
    error: {
        ...FONTS.h3_light,
        color: 'red',
        marginTop: SIZES.base,
    },
});

export default InputField;
