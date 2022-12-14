import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { SIZES, COLORS, FONTS } from '../constants';

const InputField = ({ field, title, meta, style, textColor, keyBoard }) => {
    const { error, touched } = meta;
    return (
        <View
            style={[{
                marginVertical: SIZES.base,
            }, style]}
        >
            <Text style={[{ ...FONTS.h3, color: COLORS.white, marginBottom: SIZES.base }, textColor]}>{title}</Text>
            <TextInput
                numberOfLines={4}
                style={styles.textInput}
                value={`${field.value}`}
                onChangeText={(text) => field.onChange(field.name)(text)}
                onBlur={field.onBlur(field.name)}
                keyboardType={keyBoard ? keyBoard : 'default'}
            />
            {
                error && touched &&
                <Text style={styles.error}>{error}</Text>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        // flex: 1,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray,
        color: COLORS.white,
        height: 60,
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
