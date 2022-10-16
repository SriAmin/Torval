import React, { useState, useRef } from 'react'
import { Text, View, StyleSheet, Animated, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons, Entypo, Feather } from '@expo/vector-icons';

const InstructionSubMenu = ({ tutorial, opacityCoverFunction, jumpStepFunction }) => {
    console.log(jumpStepFunction);
    const [stepMenu, setStepMenu] = useState(false);
    const slideInAnim = useRef(new Animated.Value(-170.0)).current;
    let opacityCover;

    //Based on the stepMenu variable, show the Step Sub Menu
    if (stepMenu) {
        opacityCover = <View style={styles.opacityCover} />
    }


    const slideIn = () => {
        /*
        slideIn function is called when the submenu button is pressed on,
        based on the stepMenu boolean, it'll either display or hide
        the submenu
        */

        console.log("Step Menu Active: " + stepMenu);
        if (stepMenu) {
            Animated.timing(slideInAnim, {
                toValue: -170.0,
                duration: 250,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(slideInAnim, {
                toValue: 50,
                duration: 250,
                useNativeDriver: false,
            }).start();
        }
        opacityCoverFunction(!stepMenu);
        setStepMenu(!stepMenu);
    }

    const jumpStep = (stepIndex) => {
        jumpStepFunction(stepIndex);
        slideIn();
    }

    return (
        <Animated.View style={[styles.stepButton, { right: slideInAnim }]}>
            <TouchableOpacity onPress={() => { slideIn() }}>
                <Feather name="grid" size={40} color="white" />
            </TouchableOpacity>
            <View style={styles.stepMenu}>
                <FlatList
                    data={tutorial}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => { jumpStep(index + 1) }}>
                                <Text style={styles.stepText}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={item => item.key}
                />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    stepButton: {
        flex: 1,
        position: 'absolute',
        top: 40,
        padding: 5,
        flexDirection: "row",
        height: '100%',
    },
    opacityCover: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        position: "absolute",
        width: '100%',
        height: '100%',
        flex: 1,
    },
    stepMenu: {
        marginLeft: 25,
        backgroundColor: "white",
        width: '125%',
        marginRight: -350,
    },
    stepText: {
        color: "#7b42f5",
        fontSize: 16,
        padding: 8
    },
});

export default InstructionSubMenu;
