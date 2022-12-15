import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { COLORS } from '../constants';
import NetInfo from '@react-native-community/netinfo';

const MainLayout = ({ children }) => {
    const [network, setNetwork] = React.useState();

    React.useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setNetwork(state);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={network?.isConnected ? COLORS.lightGray : COLORS.red} />
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
});

export default MainLayout;

