import React from 'react';
import { View, Modal, StyleSheet, Text, Pressable, TouchableOpacity } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { COLORS, FONTS, SIZES } from '../constants';
import Combobox from './Combobox';
import InputField from './InputField';
import { FastField } from 'formik';

const ModalAdd = ({ show, setShow, index, setFieldValue, errors }) => {
    console.log("Modal add: ", errors);
    return (
        // eslint-disable-next-line react/self-closing-comp
        <Modal
            animationType="slide"
            transparent={true}
            visible={show}
            statusBarTranslucent={true}
        >
            <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
            />
            <Pressable
                style={styles.press}
                onPress={() => setShow(false)}
            >
                <View style={styles.container}>
                    <Text style={{ ...FONTS.h2, color: COLORS.black }}>Add Product</Text>
                    <View
                        style={styles.containerCombobox}
                    >
                        <Text style={{ ...FONTS.h3, color: COLORS.black, marginRight: SIZES.padding }}>Item: </Text>
                        <Combobox setItem={(item) => setFieldValue(`itemDetail[${index}].item`, item)} />

                    </View>
                    {
                        (errors.itemDetail && errors.itemDetail[index] && errors.itemDetail[index].item) &&
                        <Text style={{ ...FONTS.h3, color: COLORS.red, marginRight: 'auto' }}>You must select product</Text>
                    }
                    <FastField
                        name={`itemDetail[${index}].amount`}
                    >
                        {(props) => (
                            <InputField title="Amount: " {...props} keyBoard="number-pad" style={styles.containerFeild} textColor={styles.textColor} />
                        )}
                    </FastField>
                    <FastField
                        name={`itemDetail[${index}].priceInput`}
                    >
                        {(props) => (
                            <InputField title="Price: " {...props} keyBoard="number-pad" style={styles.containerFeild} textColor={styles.textColor} />
                        )}
                    </FastField>
                    <TouchableOpacity
                        style={styles.buttonAdd}

                        onPress={() => setShow(false)}
                    >
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>Add</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    container: {
        width: '95%',
        padding: SIZES.padding,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        borderRadius: SIZES.radius,
    },
    containerFeild: {
        width: '100%',
    },
    containerCombobox: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: SIZES.base,
    },
    textColor: {
        color: COLORS.black,
    },
    button: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    press: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonAdd: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radius,
        marginTop: SIZES.base,
    },
});

export default ModalAdd;
