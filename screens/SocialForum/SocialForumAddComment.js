import React, {useState, setState} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import firestore from '@react-native-firebase/firestore';


const SocialForumAddComment = ({navigation, route}) => {
    const threadId = route.params.threadId;
    const comments = route.params.commentList

    const [comment, setComment] = useState(null)
    const [author, setAuthor] = useState(null)

    const addComment = () => {
        console.log(threadId)
        firestore()
            .collection('Threads')
            .doc(threadId)
            .update({
                comments: [...comments, {"author": author, "text": comment}],
            })
            .then(() => {
                alert('Comment added!');
            });
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


export default SocialForumAddComment;