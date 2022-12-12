import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import { Detail, AddProduct } from '../screens';

const Stack = createNativeStackNavigator();

const Route = () => {
    return (
        <NavigationContainer>
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
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Route;
