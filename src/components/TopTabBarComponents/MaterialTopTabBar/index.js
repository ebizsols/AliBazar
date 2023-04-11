/* MaterialTopTabBar.js */
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView
} from 'react-native';
// import { SafeAreaView } from "react-navigation";
import CustomTopTabBar from "./../CustomTopTabBar";

export default class MaterialTopTabBarWrapper extends React.Component {
    render() {
        return (
            <SafeAreaView
                style={{ backgroundColor: "#fff" }}
                forceInset={{ top: "always", horizontal: "never", bottom: "never" }}
            >
                <CustomTopTabBar
                    {...this.props}
                    style={{ backgroundColor: "#fff" }}
                    activeTintColor={'#fff'}
                    inactiveTintColor={'#fff'}
                />
            </SafeAreaView>
        );
    }
}