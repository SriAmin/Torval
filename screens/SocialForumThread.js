import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { setState, useState} from 'react';

class SocialForumThread extends React.Component{
    
}

//const [title, question, name] = useState([
    //{title: "Need Help", question: "How do I turn on PC?", name=''},
//]);

const handleChange = (question) => {
    this.setState({value: question.target.value})
}

//const state = {
//    threadList: [], 
//    currentThread: null
//}

const onThreadAdded = (thread) => {
    setState(prevState => ({
        threadList: [...prevState.threadList, thread]
    }));
}

const onThreadReceived = (threadList) => {
    console.log(threadList);
    setState(prevState => ({
        threadList: prevState.threadList = threadList
    }));
}

const SocialForumThreadScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text} >Title: </Text>
            <TextInput style={styles.input} id="title" placeholder="Enter the title of your thread" type="text"></TextInput>

            <Text style={styles.text} >Question: </Text>
            <TextInput style={styles.input} id='question' placeholder='Enter a new thread question' type="text" ></TextInput>

            <Text style={styles.text} >Username: </Text>
            <TextInput style={styles.input} id='userName' placeholder='Enter your username (optional)' type="text"></TextInput>

            <Button style={styles.button} title="Submit" onPress={() => {
                
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


export default SocialForumThreadScreen;