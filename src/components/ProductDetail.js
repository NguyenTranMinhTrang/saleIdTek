import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SIZES, COLORS, FONTS } from '../constants';
import { FastField, FieldArray, useFormikContext } from 'formik';
import InputField from './InputField';
import InputDetail from './InputDetail';
import ModalAdd from './ModalAdd';

const ProductDetail = () => {
    const [show, setShow] = React.useState(false);
    const { errors, setErrors, values, setFieldValue } = useFormikContext();
    const arrayHelpersRef = React.useRef(null);
    const [index, setIndex] = React.useState(0);

    return (
        <View>
            <View
                style={styles.container}
            >
                <FastField
                    name="delete"
                >
                    {(props) => (
                        <InputField
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={{ flex: 1 }}
                            title="Remove :"
                            {...props}
                        />
                    )}
                </FastField>

                <TouchableOpacity
                    style={styles.buttonRemove}
                    onPress={() => {
                        if (values.delete <= 0) {
                            setErrors({
                                ...errors,
                                delete: 'Min number is 1!',
                            });
                        }
                        else if (values.delete > values.itemDetail.length) {
                            setErrors({
                                ...errors,
                                delete: 'Number is invalid!',
                            });
                        }
                        else {
                            arrayHelpersRef.current.remove(values.delete - 1);
                        }
                    }}
                >
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>-</Text>
                </TouchableOpacity>
            </View>

            <ModalAdd show={show} setShow={setShow} setFieldValue={setFieldValue} index={index} />

            <FieldArray
                name="itemDetail"
                render={({ push, remove, insert }) => {
                    arrayHelpersRef.current = { remove };
                    return (
                        <View
                            style={styles.arrayContain}
                        >
                            {
                                values.itemDetail && values.itemDetail.length > 0 ? (
                                    <ScrollView
                                        style={{
                                            height: SIZES.height * 0.2,
                                        }}
                                    >
                                        {
                                            values.itemDetail.map((detail, index) => {
                                                return (
                                                    <InputDetail
                                                        detail={detail}
                                                        key={index}
                                                        index={index}
                                                        insert={insert}
                                                        remove={remove}
                                                        setShow={setShow}
                                                        setIndex={setIndex}
                                                    />
                                                );
                                            })
                                        }
                                    </ScrollView>
                                ) :
                                    (
                                        <TouchableOpacity
                                            style={styles.buttonAdd}

                                            onPress={() => {
                                                setShow(true);
                                                push({ item: '', amount: 0, priceInput: 0 });
                                            }}
                                        >
                                            <Text style={{ ...FONTS.h3, color: COLORS.white }}>Add item details</Text>
                                        </TouchableOpacity>
                                    )

                            }
                        </View>
                    );

                }
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrayContain: {
        marginVertical: SIZES.padding,
    },
    buttonRemove: {
        borderRadius: SIZES.radius,
        padding: SIZES.base * 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.red,
        width: 55,
        marginLeft: SIZES.base,
    },
    error: {
        ...FONTS.h3_light,
        color: 'red',
        marginTop: SIZES.base,
    },
    buttonAdd: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
        padding: SIZES.base * 2,
        height: 70,
    },
});

export default ProductDetail;
