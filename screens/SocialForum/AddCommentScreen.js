import React, {useState, setState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {auth, db} from "../../config/firebase";
import {arrayUnion, doc, getDoc} from "firebase/firestore";

const AddCommentScreen = ({navigation, route}) => {
    const threadId = route.params.threadId;
    const comments = route.params.commentList
    const [user, setUser] = useState({});
    const [date, setDate] = useState(null);

    const [comment, setComment] = useState(null)
    const [author, setAuthor] = useState(null)

    useEffect(() => {
        (async () => {
            await getUser();
        })();
    })

    const getUser = async () => {
        const docRef = doc(db, "Users", auth.currentUser.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            setUser(docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    const addComment = () => {
        if (author == null || comment == null) {
            alert("Please fill out the required forms")
        } else {
            let threadRef = db.collection('Threads').doc(threadId)
            let today = new Date();
            let date = +today.getDate()+' '+(today.getMonth()+1)+' '+today.getFullYear();
            setDate(date);

            threadRef.update({
                comments: arrayUnion(({
                    author: user.username,
                    createdAt: date,
                    karma: 0,
                    text: comment,
                })),
            })
                .then(() => {
                    console.log('Comment Created!');
                    alert(comment)
                });
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text} >Comment: </Text>
            <TextInput 
                style={styles.input} 
                value={comment}
                onChangeText={setComment}
                placeholder="Enter the comment of your thread" 
                type="text"
                maxLength={10000} 
            />
            <Text style={styles.text} >Author: </Text>
            <TextInput 
                style={styles.input} 
                value={author}
                onChangeText={setAuthor} 
                placeholder='Enter your username (optional)' 
                type="text" />

            <Button style={styles.button} title="Submit" onPress={() => {
                addComment();
                navigation.goBack();
            }}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     backgroundColor: '#fff',
    },
    itemContainer: {
        padding: 15,
    },
    itemImg: {
        height: 50,
        width: 50,
    },
    button: {
        marginTop: 8, 
        padding: 20,
    },
    text: {
      padding: 10,
      fontSize: 18,
      height: 44,
      textAlign: 'center',
    },
    input: {
        padding: 10,
        margin:8,
        fontSize: 18,
        height: 44,
        textAlign: 'center',
        borderWidth: 1,
    },
    desc: {
        fontSize: 10,
        padding: 10,
    }
  });


export default AddCommentScreen;