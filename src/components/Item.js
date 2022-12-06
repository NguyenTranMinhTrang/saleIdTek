import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FONTS, SIZES, COLORS } from '../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import images from '../constants/images';


const Item = ({ item, onPress }) => {

    const { name, price, rate } = item;

    return (
        <TouchableOpacity
            style={{
                flex: 1,
                flexDirection: 'row',
                marginVertical: SIZES.base,
                alignItems: 'center',
                backgroundColor: COLORS.lightGray,
                paddingVertical: SIZES.base * 2,
                paddingLeft: SIZES.base,
                borderRadius: SIZES.radius
            }}

            onPress={() => { onPress(item); }}
        >
            <View style={{ flex: 0.35 }}>
                <Image
                    source={images.productImage}
                    style={{
                        height: 120,
                        width: '100%',
                        resizeMode: 'cover',
                        borderRadius: SIZES.radius
                    }}
                />
            </View>

            <View style={{ flex: 0.65, paddingHorizontal: SIZES.padding }}>
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>{name}</Text>
                <Text style={{ ...FONTS.h3, color: COLORS.white }}>{`Price : ${price}`}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...FONTS.h3, marginRight: SIZES.base }}>{`Rate : ${rate}`}</Text>
                    <AntDesign name="star" size={24} color={COLORS.star} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Item;