import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Item } from '../components';
import actions from '../redux/actions';
import { useSelector } from 'react-redux';

const Home = () => {

    const list = useSelector((state) => state.product.products);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const getListData = async () => {
            await actions.getDataFromLocalStorage();
            setLoading(false);
        };

        getListData();
    }, []);

    console.log('Data from reducers: ', list);


    const renderHeader = () => {
        return (
            <View
                style={{
                    flex: 0.2,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: SIZES.padding
                }}
            >
                <TouchableOpacity
                    style={{
                        height: 50,
                        width: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS.lightGray,
                        borderRadius: SIZES.radius
                    }}
                >
                    <Ionicons name='refresh' color={COLORS.white} size={35} />
                </TouchableOpacity>

                <Text style={{ ...FONTS.h2, color: COLORS.white }}>List Product</Text>
                <TouchableOpacity
                    style={{
                        height: 50,
                        width: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS.lightGray,
                        borderRadius: SIZES.radius
                    }}>
                    <AntDesign name='plus' color={COLORS.white} size={35} />
                </TouchableOpacity>
            </View>
        );
    };

    const renderListProduct = () => {

        const renderItem = ({ item }) => {
            return (
                <Item key={`${item.id}`} item={item} />
            );
        };

        return (
            <View style={{ flex: 0.8, paddingHorizontal: SIZES.padding }}>
                {
                    loading
                        ? <ActivityIndicator size="large" color={COLORS.white} />
                        : <FlatList
                            data={list}
                            keyExtractor={item => `${item.id}`}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderItem}
                            initialNumToRender={4}
                            windowSize={3}
                        />
                }
            </View>
        );
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.black
            }}
        >
            {renderHeader()}
            {renderListProduct()}
        </View>
    );
};

export default Home;
