import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { Formik, FastField } from 'formik';
import debounce from 'lodash.debounce';
import * as yup from 'yup';
import { SIZES, COLORS, FONTS } from '../constants';
import { InputField, ProductDetail, DateModal } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import actions from '../redux/actions';

const Input = () => {
    const [loading, setLoading] = React.useState(false);

    const formik = React.useRef();

    React.useEffect(() => {
        debouncedValidate(formik.current?.values);
    }, [formik.current?.values, debouncedValidate]);

    const debouncedValidate = React.useMemo(
        () => debounce(() => formik.current?.validateForm, 500),
        [formik],
    );

    const validate = yup.object().shape({
        status: yup.string().required('Status is required !'),
        itemDetail: yup.array()
            .of(
                yup.object().shape({
                    amount: yup.number().typeError('You must specify a number').min(0, 'Min value 0').required('Amount is required !'),
                    priceInput: yup.number().typeError('You must specify a number').min(0, 'Min value 0').required('Price is required !'),
                    item: yup.object().required('Product is required !'),
                })
            ).required('Must have product'),
    });

    const handleCancel = (newInput) => {
        actions.filterRefresh(newInput);
    };

    const handleAddInput = async (values) => {
        setLoading(true);
        const result = await actions.addInput(values);
        setLoading(false);
        if (result && result.code === 1) {
            Alert.alert('Sucess', 'Do you want to back to the Home screen or continue ?',
                [
                    { text: 'Home Screen', onPress: () => handleCancel(result.newInput) },
                    { text: 'Continue', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        }
    };


    const renderHeader = () => {
        return (
            <View
                style={styles.containerHeader}
            >
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>Form Input</Text>
                <TouchableOpacity
                    style={styles.buttonBack}
                >
                    <AntDesign
                        name="arrowleft"
                        size={30}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <ScrollView
            style={styles.container}
        >
            {renderHeader()}
            <KeyboardAwareScrollView>
                <Formik
                    innerRef={formik}
                    enableReinitialize={true}
                    validationSchema={validate}
                    validateOnChange={false}
                    initialValues={{
                        date: new Date(),
                        show: false,
                        itemDetail: [],
                        delete: 1,
                        status: '',
                    }}
                    onSubmit={handleAddInput}
                >
                    {({ setFieldValue, values, handleSubmit, errors, touched }) => {
                        return (
                            <ScrollView style={styles.containerForm}>
                                <View
                                    style={{
                                        padding: SIZES.padding,
                                    }}
                                >
                                    {/* date */}

                                    <DateModal
                                        show={values.show}
                                        date={values.date}
                                        setShow={(show) => setFieldValue('show', show)}
                                        setDate={(date) => setFieldValue('date', date)}
                                        title={'Date: '}
                                    />

                                    {/*  product list*/}

                                    <ProductDetail />

                                    {
                                        (errors.itemDetail && touched.itemDetail)
                                        &&
                                        <Text style={{ ...FONTS.h3, color: 'red' }}>{errors.itemDetail}</Text>
                                    }


                                    {/* status */}
                                    <FastField
                                        name="status"
                                    >
                                        {(props) => (
                                            <InputField title="Status: " {...props} />
                                        )}
                                    </FastField>

                                    <View
                                        style={styles.containerAdd}
                                    >
                                        <TouchableOpacity
                                            style={styles.addButton}
                                            onPress={handleSubmit}
                                        >
                                            {
                                                loading
                                                    ? <ActivityIndicator size="large" color={COLORS.white} />
                                                    : <Text style={{ ...FONTS.h3, color: COLORS.white }}>Add</Text>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        );
                    }}
                </Formik>
            </KeyboardAwareScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    containerHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: SIZES.base * 2,
    },
    containerForm: {
        flex: 1,
    },
    buttonBack: {
        position: 'absolute',
        left: SIZES.padding,
        top: 15,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: COLORS.lightGray,
    },
    containerDate: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    image: {
        height: 120,
        flex: 1,
        marginRight: SIZES.padding,
        borderRadius: SIZES.radius,
    },
    buttonDate: {
        height: 55,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: COLORS.lightGray,
    },
    containerAdd: {
        alignItems: 'center',
        marginTop: SIZES.padding,
    },
    addButton: {
        width: '90%',
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.radius,
        paddingVertical: SIZES.base * 2,
    },
    textDate: {
        flex: 1,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray,
        height: 70,
        padding: SIZES.base * 2,
        marginRight: SIZES.base,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default Input;
