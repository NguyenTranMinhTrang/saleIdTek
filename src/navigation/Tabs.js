import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Store, Chart, Input } from '../screens';
import { COLORS } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: COLORS.primary,
                    height: 100,
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    borderLeftWidth: 0.2,
                    borderRightWidth: 0.2,
                    position: 'absolute',
                    bottom: 0,
                },
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
            }}

            initialRouteName="Home"
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="home"
                            color={focused ? COLORS.white : COLORS.lightGray}
                            size={25}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Store"
                component={Store}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5
                            name="store"
                            color={focused ? COLORS.white : COLORS.lightGray}
                            size={25}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Chart"
                component={Chart}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="bar-chart"
                            color={focused ? COLORS.white : COLORS.lightGray}
                            size={25}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Input"
                component={Input}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="form"
                            color={focused ? COLORS.white : COLORS.lightGray}
                            size={25}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default Tabs;
