import React, { useState, useEffect } from "react";
import {StyleSheet, Text, View, FlatList, Button, ActivityIndicator, TouchableOpacity,} from "react-native";
import { auth, db } from "../../config/firebase";
import { arrayRemove, doc, getDoc } from "firebase/firestore";
import Ionicons from '@expo/vector-icons/Ionicons';

const TutorialButton = ({ followedTutorial, navigation }) => {
    const tutorial = {
        image:
            "https://thumbs.dreamstime.com/b/amd-ryzen-cpu-technician-fingers-above-motherboard-part-custom-pc-build-los-angeles-ca-usa-december-169345127.jpg",
        title: "Building a Computer",
        description:
            "This tutorial will be an large guide on building your computer and getting it running",
        difficulty: 3,
    };

    if (followedTutorial)
        return (
            <Button
                onPress={() => {
                    navigation.navigate("Description", { tutorial: tutorial });
                }}
                title="Go to Tutorial"
            />
        );
    else return <View />;
};

const ThreadDetailScreen = ({ navigation, route, isFocused }) => {
    const [thread, setThread] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    const getUser = async () => {
        const docRef = doc(db, "Users", auth.currentUser.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            docSnap.data();
            setUser(docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    };

    //This is used to conditional render the list if there are comments for the thread or if none exist at the moment
    const CommentList = ({ data }) => {
        if (data === undefined) return <View />;
        else {
            if (data.length === 0)
                return (
                    <Text
                        style={[
                            {
                                marginTop: 50,
                                padding: 10,
                                textAlign: "center",
                                color: "grey",
                            },
                        ]}
                    >
                        Sorry, there are no comments for this thread yet, check back again
                        later.
                    </Text>
                );
            else
                return (
                    <FlatList
                        data={data}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.itemContainer}>
                                    <Text style={styles.itemTitle}>{item.text}</Text>
                                    <Text style={styles.itemAuthor}>{item.author}</Text>

                                    {!user.isMod ? (
                                        <TouchableOpacity
                                            style={{ marginTop: 8, left: 1}}
                                            title="Delete Comment"
                                            onPress={() => handleDelete("comment", item)}
                                        >
                                            <Ionicons name='trash-outline' size={24} color='red' />
                                        </TouchableOpacity>
                                    ) : (
                                        <View></View>
                                    )}
                                </View>
                            );
                        }}
                    />
                );
        }
    };

    async function handleDelete(type, comment = null) {
        if (type === "comment") {
            let docRef = db.collection("Threads").doc(route.params.threadId);
            //const query = query(docRef, where("comments", "array-contains", comment.id));

            docRef
                .update({
                    comments: arrayRemove(comment),
                })
                .then(() => {
                    alert("Comment Deleted!");
                });
        } else {
            await db.collection("Threads").doc(route.params.threadId).delete();
            alert("Thread deleted");
            navigation.goBack();
            navigation.refresh();
        }
    }

    useEffect(() => {
        (async () => {
            await getUser();
            const firestoreThread = await db
                .collection("Threads")
                .doc(route.params.threadId)
                .get();
            setThread(firestoreThread.data());
            setLoading(false);
        })();
    }, [isFocused]);

    // Show ActivityIndicator if loading
    if (loading) return <ActivityIndicator />;
    else {
        return (
            <View style={styles.container}>
                <View style={[{ marginBottom: 10, padding: 15 }]}>
                    <Text style={[{ fontSize: 18 }]}>{thread.title}</Text>

                    {/* If the user is a moderator, show the delete button */}
                    {!user.isMod ? (
                        <TouchableOpacity
                            style={{ marginTop: 8, left: 1}}
                            title="Delete thread"
                            onPress={() => handleDelete("thread")}
                        >
                            <Ionicons name='trash-outline' size={24} color='red' />
                        </TouchableOpacity>
                    ) : (
                        <View></View>
                    )}

                    <Text style={styles.threadAuthor}>{thread.author}</Text>
                    <Text style={styles.threadTitle}>{thread.description}</Text>
                    <TutorialButton
                        followedTutorial={thread.followedTutorial}
                        navigation={navigation}
                    />
                </View>
                <Button
                    onPress={() => {
                        navigation.navigate("Create Comment", {
                            threadId: route.params.threadId,
                            commentList: thread.comments,
                        });
                    }}
                    title="Create Comment"
                />
                <CommentList data={thread.comments} />
            </View>
        );
    }
};

// STYLING
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F0F0",
    },
    threadAuthor: {
        padding: 5,
        paddingBottom: 15,
        color: "grey",
        fontSize: 12,
    },
    threadTitle: {
        fontSize: 15,
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
    },
    itemTitle: {
        fontSize: 15,
    },
    itemAuthor: {
        fontSize: 10,
        padding: 10,
        color: "grey",
    },
});

export default ThreadDetailScreen;
