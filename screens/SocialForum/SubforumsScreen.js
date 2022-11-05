import React, { useState } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function ThreadsScreen({ navigation }) {
    const initialElements = [
        { id: "gpu", text: "Graphics Card" },
        { id: "psu", text: "Power Supply" },
        { id: "mobo", text: "Motherboard" },
        { id: "watercooling", text: "Watercooling" },
        { id: "case", text: "Case" },
        { id: "cpu", text: "CPU" },
    ];

    const [exampleState, setExampleState] = useState(initialElements);

    return (
        <View style={styles.container}>
            <Button
                onPress={() => {
                    //addForumThread("test", "test", "test");
                    navigation.navigate("Create A Thread");
                }}
                title="Create Thread"
            />
            <FlatList
                keyExtractor={(item) => item.id}
                data={exampleState}
                renderItem={(item) => (
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => {
                            navigation.navigate("ThreadsScreen", {
                                subforumThreadId: item.item.id,
                            });
                        }}
                    >
                        <Text>{item.item.text}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F0F0",
    },
    itemContainer: {
        padding: 15,
        borderRadius: 25,
        margin: 8,
        shadowColor: "rgba(0,0,0,0)", // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 2, //IOS
        backgroundColor: "#fff",
        elevation: 3, // Android
        height: 100,
    },
    itemImg: {
        height: 50,
        width: 50,
    },
    itemTitle: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    desc: {
        fontSize: 8,
        padding: 10,
    },
    authorText: {
        paddingTop: 10,
        fontSize: 10,
        color: "grey",
    },
    tagList: {
        flexDirection: "row",
    },
    tagBubble: {
        backgroundColor: "#7b42f5",
        margin: 10,
        borderRadius: 10,
        padding: 5,
    },
    tagText: {
        color: "white",
        fontSize: 15,
    },
});
