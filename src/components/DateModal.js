import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SIZES, COLORS, FONTS } from '../constants';

import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';

const DateModal = ({ show, setShow, date, setDate, title, textColor }) => {

    return (
        <View
        >
            <Text style={{ ...FONTS.h3, marginBottom: SIZES.base, color: textColor || COLORS.black }}>{title}</Text>
            <View
                style={styles.containerDate}
            >
                {
                    date &&
                    <View style={styles.textDate}>
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>{format(date, 'dd/MM/yyyy')}</Text>
                    </View>

                }
                <TouchableOpacity
                    style={styles.buttonDate}
                    onPress={() => setShow(true)}
                >
                    <AntDesign name="calendar" size={30} color={COLORS.white} />
                </TouchableOpacity>
            </View>

            {/* Modal get date */}
            {
                show &&
                <DatePicker
                    modal
                    open={show}
                    date={date}
                    mode={'date'}
                    onConfirm={(date) => {
                        setDate(date);
                        setShow(false);
                    }}
                    onCancel={() => {
                        setShow(false);
                    }}
                />

            }
        </View>
    );
};

const styles = StyleSheet.create({
    containerDate: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textDate: {
        flex: 1,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray,
        height: 60,
        padding: SIZES.base * 2,
        marginRight: SIZES.base,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDate: {
        height: 55,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: COLORS.lightGray,
    },
});

export default DateModal;
