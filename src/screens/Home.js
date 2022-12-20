import React from 'react';
import { View, Text, BackHandler, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet, Alert } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Item, Search } from '../components';
import actions from '../redux/actions';
import { useSelector } from 'react-redux';
import { getData } from '../localStorage';
import MainLayout from './MainLayout';

const Home = ({ navigation, route }) => {

    const [loading, setLoading] = React.useState(true);
    const filter = useSelector((state) => state.product.filter);
    const text = React.useRef();

    React.useEffect(() => {
        if (route.params && route.params.screen) {
            const { id, screen } = route.params;
            navigation.navigate(screen, { id, reFresh });
        }
    }, [route.params]);

    React.useEffect(() => {
        const getListData = async () => {
            await actions.getDataFromLocalStorage();
            setLoading(false);
        };
        getListData();
    }, []);

    const reFresh = async () => {
        setLoading(true);
        text.current.clear();
        const result = await actions.filterRefresh();
        if (result) {
            setLoading(false);
        }
        else {
            Alert.alert("There's something wrong !");
        }
    };

    const handleScroll = async (e) => {
        if (e.nativeEvent.contentOffset.y < 0) {
            reFresh();
        }
    };

    const onPress = (item) => {
        navigation.navigate('Detail', { id: item.id, reFresh: reFresh });
    };

    const onPressAdd = () => {
        navigation.navigate('AddProduct', { reFresh });
    };

    const deleteProduct = (id) => {
        actions.deleteProduct(id);
        reFresh();
    };

    const handleDelete = (item) => {
        Alert.alert('Notice', 'Are you sure to delete this one ?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel') },
                { text: 'OK', onPress: () => deleteProduct(item.id) },
            ],
            { cancelable: false }
        );
    };

    const renderHeader = () => {
        return (

            <View
                style={styles.containerHeader}
            >
                <TouchableOpacity
                    style={styles.buttonRefresh}

                    onPress={() => getData()}
                >
                    <Ionicons name="refresh" color={COLORS.white} size={35} />
                </TouchableOpacity>

                <Text style={{ ...FONTS.h2, color: COLORS.white }}>List Product</Text>
                <TouchableOpacity
                    style={styles.buttonPlus}
                    onPress={onPressAdd}
                >
                    <AntDesign name="plus" color={COLORS.white} size={35} />
                </TouchableOpacity>
            </View>
        );
    };

    const renderListProduct = () => {

        const renderItem = ({ item }) => {
            return (
                <Item key={`${item.id}`} item={item} onPress={onPress} onLongPress={handleDelete} />
            );
        };

        return (
            <View style={styles.containerProductList}>
                <Search ref={text} />
                {
                    loading
                        ? <ActivityIndicator size="large" color={COLORS.white} />
                        :
                        <>
                            {
                                filter.length !== 0 ?
                                    <FlatList
                                        data={filter}
                                        keyExtractor={item => `${item.id}`}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={renderItem}
                                        initialNumToRender={3}
                                        windowSize={4}
                                        onScroll={handleScroll}
                                    />
                                    :
                                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>No product match</Text>
                            }
                        </>
                }
            </View>
        );
    };

    return (
        <MainLayout>
            <View
                style={styles.container}
            >
                {renderHeader()}
                {renderListProduct()}
            </View>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerProductList: {
        flex: 0.8,
        paddingHorizontal: SIZES.padding,
    },
    containerHeader: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.padding,
    },
    buttonRefresh: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
    },
    buttonPlus: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
    },
});

export default Home;
