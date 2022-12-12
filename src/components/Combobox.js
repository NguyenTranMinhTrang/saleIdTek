import React from 'react';
import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import SelectDropdown from 'react-native-select-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ItemPicker from './ItemPicker';
import { useSelector } from 'react-redux';

const Combobox = ({ setItem }) => {

    const products = useSelector((state) => state.product.products);

    return (
        <SelectDropdown
            data={products}
            onSelect={(selectedItem, index) => {
                setItem(selectedItem);
            }}
            renderCustomizedRowChild={(item, index) => {
                return (
                    <ItemPicker name={item.name} />
                );

            }}
            rowStyle={styles.rowStyle}

            buttonStyle={styles.buttonStyle}

            buttonTextStyle={styles.buttonText}

            renderDropdownIcon={isOpened => {
                return <MaterialIcons name={isOpened ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} color={COLORS.white} size={30} />;
            }}

            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
            }}
        />
    );
};

const styles = StyleSheet.create({
    rowStyle: {
        height: 70,
        width: '100%',
        backgroundColor: COLORS.black,

    },
    buttonStyle: {
        flex: 1,
        backgroundColor: COLORS.lightGray,
        height: 70,
        borderRadius: SIZES.radius,
    },
    buttonText: {
        ...FONTS.h3,
        color: COLORS.white,
    },
});

export default Combobox;
