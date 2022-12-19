import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import { Detail, AddProduct, ChartDay } from '../screens';
import { navigationRef } from '../RootNavigation';

const Stack = createNativeStackNavigator();

const Route = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                initialRouteName="Tabs"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="Tabs"
                    component={Tabs}
                />

                <Stack.Screen
                    name="Detail"
                    component={Detail}
                />

                <Stack.Screen
                    name="AddProduct"
                    component={AddProduct}
                />

                <Stack.Screen
                    name="ChartDay"
                    component={ChartDay}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Route;
