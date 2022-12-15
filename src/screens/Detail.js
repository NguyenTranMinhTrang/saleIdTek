import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants';
import images from '../constants/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik, FastField } from 'formik';
import debounce from 'lodash.debounce';
import * as yup from 'yup';
import { InputField } from '../components';
import actions from '../redux/actions';
import MainLayout from './MainLayout';

const Detail = ({ navigation, route }) => {

    const [loading, setLoading] = React.useState(false);

    const formik = React.useRef();

    React.useEffect(() => {
        debouncedValidate(formik.current?.values);
    }, [formik.current?.values, debouncedValidate]);

    const debouncedValidate = React.useMemo(
        () => debounce(() => formik.current?.validateForm, 500),
        [formik]
    );

    const validate = yup.object().shape({
        name: yup.string().required('Name is required !'),
        description: yup.string().required('Description is required !'),
        profit: yup.number().typeError('You must specify a number').min(0, 'Min value 0'),
    });

    const handleCancel = () => {
        navigation.goBack();
        route.params.reFresh();
    };

    const renderHeader = () => {
        return (
            <View
                style={styles.containerHeader}
            >
                <Image
                    source={images.productImage}
                    resizeMode="cover"
                    style={styles.image}
                />

                <TouchableOpacity
                    style={styles.buttonBack}
                    onPress={() => navigation.goBack()}
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



    const renderForm = () => {
        return (
            <ScrollView style={styles.containerForm}>
                <KeyboardAwareScrollView
                    style={{
                        padding: SIZES.padding,
                    }}
                >
                    <Formik
                        innerRef={formik}
                        enableReinitialize={true}
                        validationSchema={validate}
                        validateOnChange={false}
                        initialValues={{
                            ...route.params.item,
                        }}
                        onSubmit={async (values) => {
                            setLoading(true);
                            const result = await actions.updateProduct(values);
                            setLoading(false);
                            if (result && result.code === 1) {
                                Alert.alert('Sucess', 'Do you want to continue ?',
                                    [
                                        { text: 'Cancel', onPress: handleCancel },
                                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                                    ],
                                    { cancelable: false }
                                );
                            }
                        }}
                    >
                        {({ handleSubmit }) => {
                            return (
                                <>
                                    {/* name */}
                                    <FastField
                                        name="name"
                                    >
                                        {(props) => (
                                            <InputField title="Name: " {...props} />
                                        )}
                                    </FastField>

                                    {/* description */}
                                    <FastField
                                        name="description"
                                    >
                                        {(props) => (
                                            <InputField title="Description: " {...props} />
                                        )}
                                    </FastField>

                                    {/* price */}
                                    <FastField
                                        name="profit"
                                    >
                                        {(props) => (
                                            <InputField title="Profit: " {...props} keyBoard="number-pad" />
                                        )}
                                    </FastField>

                                    <View
                                        style={styles.containerButtonUpdate}
                                    >
                                        {
                                            loading ?
                                                <ActivityIndicator size="large" color={COLORS.white} />
                                                :
                                                <TouchableOpacity
                                                    style={styles.buttonUpdate}
                                                    onPress={handleSubmit}
                                                >
                                                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>Update</Text>
                                                </TouchableOpacity>
                                        }
                                    </View>
                                </>
                            );
                        }}
                    </Formik>
                </KeyboardAwareScrollView>
            </ScrollView >
        );
    };

    return (
        <MainLayout>
            <View style={styles.container}>
                {renderHeader()}
                {renderForm()}
            </View>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerHeader: {
        height: SIZES.height * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerForm: {
        marginTop: -40,
        backgroundColor: COLORS.black,
        width: SIZES.width,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    buttonBack: {
        position: 'absolute',
        left: SIZES.padding,
        top: 30,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    containerButtonUpdate: {
        alignItems: 'center',
        marginTop: SIZES.padding,
    },
    buttonUpdate: {
        width: '100%',
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.radius,
        paddingVertical: SIZES.base * 2,
    },

});

export default Detail;
